const sql = require("../connectDb");

const User = (user) => {
    this.email = user.email,
        this.password = user.password,
        this.nom = user.nom,
        this.prenom = user.prenom,
        this.isAdmin = user.isAdmin,
        this.createAt = user.createAt
};

// CRÉATION D'UN NOUVEL UTILISATEUR

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création de l'utilisateur : ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
}


// RÉCUPÉRATION D'UN UTILISATEUR AVEC SON EMAIL
User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE id ='${userId}'`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Utilisateur trouvé : ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "Non trouvé !" }, null);
    });
};


// SUPPRESSION D'UN UTILISATEUR AVEC SON ID
User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "Non trouvé !" }, null);
            return;
        }
        console.log("Suppression de l'utilisateur avec l'id : ", id);
        result(null, res);
    });
};


module.exports = User;