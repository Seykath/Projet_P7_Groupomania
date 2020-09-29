const mysql = require("mysql");
const config = require("./config/config");

// Création de la connexion à MySQL
const connexion = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    port: config.PORT
});

// Connection à MySQL
connexion.connect(error => {
    if (error) throw error;
    console.log("Vous êtes connecté à la BDD !");
});

module.exports = connexion;