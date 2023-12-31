const express = require('express');
const router = express.Router();
const noticiasController = require('../../controllers/noticiasController/noticiasController');

router.post('/upload', noticiasController.uploadNoticia);
router.get('/getNoticias', noticiasController.getNoticias);
router.put('/interaction/like/:idNoticia', noticiasController.interactionNoticia);
module.exports = router;
