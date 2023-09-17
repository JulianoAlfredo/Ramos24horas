const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController/userController');

router.post('/createUser', userController.createUser);
router.get('/getUser/:usuario', userController.getUserByUsername);

module.exports = router;
