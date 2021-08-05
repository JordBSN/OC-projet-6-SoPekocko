const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, saucesCtrl.createSauce); // pour créer une sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauce); // pour modifier une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce); // pour supprimer une sauce
router.get('/:id', auth, saucesCtrl.getOneSauce); // pour récupérer une sauce
router.get('/', auth, saucesCtrl.getAllSauces); // pour récupérer toutes les sauces
router.post('/:id/like', auth, saucesCtrl.likeSauce) // pour liker/disliker une sauce

module.exports = router;
