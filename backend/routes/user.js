const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // pour enregistrer un nouvel user
router.post('/login', userCtrl.login); // pour se connecter

module.exports = router;