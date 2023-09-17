const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const fs = require('fs');
const cors = require('cors')
const { resolveObjectURL } = require('buffer');
const port = 3000;

app.use(express.json()); // For JSON data

const db = new sqlite3.Database('jornalismo-cidadao.db');

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS noticias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        descricao TEXT,
        localizacao TEXT,
        arquivo TEXT
      )
    `);
    db.run(`CREATE TABLE IF NOT EXISTS user(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      bio TEXT
      )
    `)
  });
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

app.post('/upload', upload.single('file'), (req, res) => {


  // Exemplo de como inserir dados no SQLite:
  const { title, description, location } = req.body;
  const filename = req.file.filename;

  const sql = `
    INSERT INTO noticias (titulo, descricao, localizacao, arquivo)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [title, description, location, filename], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro ao salvar no banco de dados.' });
      return;
    }

    res.json({ message: 'Arquivo enviado com sucesso.' });
  });
});
app.get("/getNoticias", (req, res) => {
    const sql = `
      SELECT * FROM noticias
    `;
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar notícias.' });
        return;
      }
  
      console.log(rows);
      res.json({ noticias: rows });
    });
});

app.post('/createUser', upload.any(), async (req, res) => {
  try {
      const { username, password, bio } = req.body; // Extrair username, password e bio do corpo da requisição

      const sql = `
          INSERT INTO user (username, password, bio)
          VALUES (?, ?, ?)
      `;

      db.run(sql, [username, password, bio], (err) => {
          if (err) {
              console.error(err.message);
              res.status(500).json({ error: "Algo deu errado" });
              return;
          }
          res.json({ message: "Usuário cadastrado com sucesso: " + username });
      });
  } catch (error) {
      console.error(error.message);
      res.status(400).json({ error: "Requisição inválida" });
  }
});
app.get('/getUser/:usuario', (req, res) =>{
  const sql = `
      SELECT * FROM user WHERE username="${req.params.usuario}"
    `;
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar usuarios.' });
        return;
      }
  
      console.log(rows);
      res.json({ usuarios: rows });
    });
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
