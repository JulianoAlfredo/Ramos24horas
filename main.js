const express = require('express');
const app = express();
const cors = require('cors');
const noticiasRoutes = require('./routes/noticiasRoutes/noticiasRoutes');
const userRoutes = require('./routes/userRoute/userRoutes');
const multer = require('multer');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/jornalismo-cidadao.db');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const port = 3000;

app.use(express.json());
app.use(cors());
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Bairro',
      version: '1.0.0',
      description: 'Documentação da API do Bairro',
    },
  },
  // Especifique os arquivos de rota que contêm as anotações Swagger
  apis: ['./routes/*.js', './swaggerDef.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS noticias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      descricao TEXT,
      localizacao TEXT,
      likes INTEGER,
      arquivo TEXT
    )
  `);

  db.run(`CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    bio TEXT
    )
  `);
  db.run(`
  CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    noticia_id INTEGER, 
    texto TEXT,
    autor TEXT,
    data_publicacao DATETIME,
    FOREIGN KEY (noticia_id) REFERENCES noticias (id)
  );
  `)
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.use('/noticias', upload.single('file'), noticiasRoutes);

app.use('/user', upload.any(), userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
