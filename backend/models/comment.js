const sql = require("../connectDb");

const Comment = function (commentaire) {
    this.message = commentaire.message;
    this.post_id = commentaire.post_id;
    this.user_id = commentaire.user_id;
    this.date = commentaire.date;
}

// Création d'un commentaire

Comment.create = (newComment, result) => {
    sql.query(`INSERT INTO comments (message, post_id, user_id, date) VALUES ("${newComment.message}","${newComment.post_id}","${newComment.user_id}", Now())`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création du comment : ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
}

// Récupération des commentaires

Comment.getAll = result => {
    sql.query(`SELECT comments.id, comments.post_id, comments.message, comments.date, comments.user_id, users.username FROM comments INNER JOIN users ON comments.user_id = users.id ORDER BY date DESC`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        let commentaires = [];
        commentaires = res.map(element => {
            let content = new Comment(element)
            content.author = {
                username: element.username,
            }
            return commentaires;
        })
        console.log("Comment : ", res);
        result(null, res);
    });
};


// Suppression commentaire via son ID
Comment.remove = (id, result) => {
    sql.query("DELETE FROM comments WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Suppression du commentaire avec l'id: ", id);
        result(null, res);
    });
};

module.exports = Comment;