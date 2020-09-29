const sql = require("../connectDb");

const Post = function (e) {
    this.titre = e.titre
    this.content = e.content
    this.post_id = e.id
    this.comments = e.comments ? e.comments : []
    this.date = e.date
    this.user_id = e.user_id
};


// Création d'un post
Post.create = (newPost, result) => {
    sql.query(`INSERT INTO posts (titre, content, user_id, date) VALUES ("${newPost.titre}","${newPost.content}","${newPost.user_id}", Now())`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création du post : ", { id: res.insertId, ...newPost });
        result(null, { id: res.insertId, ...newPost });
    });
};

// Récupération des posts
Post.getAll = result => {
    sql.query(`SELECT p.id, p.titre, p.content, p.date, p.user_id AS "author_id", u.email, u.nom, u.prenom FROM posts p INNER JOIN users u ON p.user_id = u.id ORDER BY date DESC`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        let posts = [];
        posts = res.map(element => {
            let topic = new Post(element)
            topic.author = {
                nom: element.nom,
                prenom: element.prenom,
                email: element.email,
                id: element.id
            }
            return topic;
        })
        console.log("post : ", posts);
        result(null, posts);
    });
};

// Récupération post avec son ID

Post.findById = (postId, result) => {
    sql.query(`SELECT p.id, p.titre, p.content, p.date, p.user_id AS "author_id", u.email, u.nom, u.prenom FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ${postId} ORDER BY date DESC`,
        (err, res) => {
            if (err) {
                console.log("erreur: ", err);
                result(err, null);
                return;
            }
            if (res, postId) {
                let posts = [];
                posts = res.map(element => {
                    let topic = new Post(element)
                    topic.author = {
                        nom: element.nom,
                        prenom: element.prenom,
                        email: element.email,
                        id: element.id
                    }
                    return topic;
                })
                console.log("Post trouvé ! : ", posts);
                result(null, posts);
                return;
            }
            // not found Customer with the id
            result({ kind: "Non trouvé" }, null);
        })
};


Post.updateById = (id, post, result) => {
    sql.query(
        "UPDATE posts SET titre = ?, content = ? WHERE id = ?",
        [post.titre, post.content, id],
        (err, res) => {
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

            console.log("Post modifié: ", { id: id, ...post });
            result(null, { id: id, ...post });
        }
    );
};


// Suppression post via son ID
Post.remove = (id, result) => {
    sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "Non trouvé !" }, null);
            return;
        }
        console.log("Suppression du post avec l'id : ", id);
        result(null, res);
    });
};

module.exports = Post;