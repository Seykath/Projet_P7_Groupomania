const express = require('express'); // Importation de express
const bodyParser = require('body-parser'); // Importation de body-parser
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require("express-rate-limit");

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');

const app = express(); // Création d'une application express

// Ajout de headers, * tout le monde peut accéder à l'API, autorisation d'utiliser certains en-tête sur l'objet requête et certaines méthodes (get, post etc)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // Limite à 1000 requête !
});

app.use(bodyParser.json());// Va transformer le corps de la requête en objet JS utilisable

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(limiter);
app.use(xss());
app.use(helmet());
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


module.exports = app; // Exportation de la const app pour y accèder depuis les autres fichiers.
