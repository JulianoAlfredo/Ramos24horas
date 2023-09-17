const express = require('express');
const app = express();
const cors = require('cors');
const noticiasRoutes = require('./routes/noticias/noticiasRoutes');
const userRoutes = require('./routes/usuario/userRoutes');
const multer = require('multer');
const fs = require('fs')
const port = 3000;

app.use(express.json());
app.use(cors());

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

app.use('/noticias', upload.single('file'), noticiasRoutes);

app.use('/user', upload.any(), userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
