const bcrypt = require('bcrypt');
const User = require('../models/user');
const jsonWebToken = require('jsonwebtoken');


// CRÉATION D'UN UTILISATEUR 

exports.signup = (req, res) => {

    if (!req.body) {
        res.status(400).json({ message: "Erreur !" })
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let role = "USER"
            if (req.body.isAdmin) {
                role = req.body.isAdmin;
            }

            const user = {
                "email": req.body.email,
                "password": hash,
                "nom": req.body.nom,
                "prenom": req.body.prenom,
                "isAdmin": role
            }
            User.create(user, (err, data) => {
                if (err)
                    res.status(500).json({ message: "Utilisateur non crée !" + err })
                else res.send(data);
            })
        }).catch(err => res.status(500).json({ message: "Il y a une erreur :" + err }))
}

// CONNEXION AVEC UN UTILISATEUR DÉJÀ CRÉE

exports.login = (req, res) => {
    User.findOne(req.body.email, (err, user) => {
        if (err) {
            res.status(400).json({ message: err })
        }
        if (user) {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({ message: "Mot de passe incorrect !" })
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jsonWebToken.sign({ userId: user.id }, 'SECRET_TOKEN', {
                            expiresIn: '6h'
                        })
                    })
                })
        }
    }
    )
}


exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Customer with id ${req.params.id}.`
                });
            }
        } else res.send(data);
    });
};


// SUPPRESSION D'UN UTILISATEUR

exports.delete = (req, res) => {

    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "Non trouvé !") {
                res.status(404).json({ message: "Utilisateur introuvable avec l'id : " + req.params.id })
            } else {
                res.status(500).json({ message: "Utilisateur introuvable avec l'id : " + req.params.id })
            }
        } else res.json({ message: "Utilisateur supprimé avec succès !" })
    })
}