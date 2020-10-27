const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', auth, userCtrl.findOne);
router.get("/users", auth, userCtrl.findAll);
router.delete('/user/:id', auth, userCtrl.delete);

module.exports = router;