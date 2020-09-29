const Comment = require('../models/comment');

//CRÉATION D'UN NOUVEAU COMMENTAIRE

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).json({ message: 'Erreur !' })
    }
    const comment = new Comment({
        message: req.body.message,
        user_id: req.body.user_id,
        post_id: req.body.post_id,
    });
    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).json({ message: 'Commentaire non crée !' })
        else res.send(data);
    });
}

// RÉCUPÉRATION DE TOUS LES COMMENTAIRES

exports.findAll = (req, res) => {

    Comment.getAll((err, data) => {
        if (err)
            res.status(500).send({ message: "Commentaire non trouvé" + err });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Le champ ne peut pas être vide!"
        });
    }

    Comment.updateById(
        req.params.id,
        new Comment(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found commentaire with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating commentaire with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {

    Comment.remove(req.params.id, (err, data) => {
        console.log(req.params.id);
        if (err) {
            if (err.kind === "Non trouvé !") {
                res.status(404).json({ message: "commentaire introuvable avec l'id : " + req.params.id })
            } else {
                res.status(500).json({ message: "commentaire introuvable avec l'id : " + req.params.id })
            }
        } else res.json({ message: 'commentaire supprimé avec succès !' })
    })
}
