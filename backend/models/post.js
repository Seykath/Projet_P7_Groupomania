const sql = require("../connectDb");

const Post = function (e) {
    this.titre = e.titre
    this.content = e.content
    this.post_id = e.id
    this.imageUrl = e.imageUrl
    this.comments = e.comments ? e.comments : []
    this.date = e.date
    this.user_id = e.user_id
};


// Création d'un post
Post.create = (newPost, result) => {
    sql.query(`INSERT INTO posts (titre, content, imageUrl, user_id, date) VALUES ("${newPost.titre}","${newPost.content}","${newPost.imageUrl}","${newPost.user_id}", Now())`, (err, res) => {
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
    sql.query(`SELECT posts.id, posts.titre, posts.content, posts.imageUrl, posts.date, posts.user_id, users.username FROM posts INNER JOIN users ON posts.user_id = users.id ORDER BY date DESC`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        let posts = [];
        posts = res.map(element => {
            let topic = new Post(element)
            topic.author = {
                username: element.username,
            }
            return topic;
        })
        result(null, posts);
    });
};

// Récupération post avec son ID

Post.findById = (postId, result) => {
    sql.query(`SELECT * FROM posts WHERE id = ${postId} ORDER BY date DESC`,
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
                        username: element.username,
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