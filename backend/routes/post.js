// Fichier des routes disponible dans l'application

const express = require('express');
const router = express.Router(); // Création d'un router via express


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post'); // Importation du contrôleur


router.post('/create', auth, multer, postCtrl.create);
router.put('/:id', auth, multer, postCtrl.update);
router.get('/getAll', auth, postCtrl.findAll);
router.get('/:id', auth, postCtrl.findOne);
router.delete('/:id', auth, postCtrl.delete);



// Exportation du router de ce fichier
module.exports = router;