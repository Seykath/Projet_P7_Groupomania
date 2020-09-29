const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

//ROUTE POUR L'ÉCRITURE DE COMMENTAIRE

router.post('/create', auth, commentCtrl.create);
router.get('/getAll', auth, commentCtrl.findAll);
router.get('/getAll', auth, commentCtrl.findAll);
router.put('/:id', auth, commentCtrl.update);
router.delete('/:id', auth, commentCtrl.delete);

module.exports = router;