const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticiasController');

router.post('/upload', noticiasController.uploadNoticia);
router.get('/getNoticias', noticiasController.getNoticias);

module.exports = router;
