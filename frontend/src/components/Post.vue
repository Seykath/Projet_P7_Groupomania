<template>
<div>
    <div class="post" v-for="post in posts" :key="post.id">
        <div class="card gedf-card mr-auto ml-auto p-0 col-md-6">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45" src="../assets/icon-left-font-monochrome-black-mini.png" alt="">
                                </div>
                                <div class="ml-2">
                                    <div class="h5 m-0">{{post.author.username}}</div>
                                    <div class="text-muted h7 mb-2"> <font-awesome-icon icon="clock" /> {{ moment(post.date).fromNow() }}</div>
                                </div>
                            </div>
                            <div>
                                <button type="button" class="btn btn-danger btn-sm" v-if="post.user_id == userId || isAdmin == 'ADMIN'" @click="removePost(post)">supprimer</button>
                            </div>
                        </div>

                    </div>
                    <div class="card-body">
                            <h5 class="card-title">{{ post.titre }}</h5>
                        <p class="card-text">{{ post.content }}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-comment" v-if="post.comments.length >= 0" @click="showCommentsAction(post)">{{post.comments.length}} Commentaire<span v-if="post.comments.length > 1">s</span><font-awesome-icon icon="comment" class="ml-2" /></button>
                        
                        <div class="postComments" v-if="showComments[post.post_id]">
                            <div class=" d-flex mt-2" v-for="comment in comments" :key="comment.postId">
                                <div class="bloc-comments">
                                    <div v-if="post.post_id == comment.post_id" class="commentUser p-2 mr-2 ml-2">
                                        <p><strong>{{ comment.user_id }}</strong> {{ moment(comment.date).fromNow() }} à écrit</p>
                                        <p> {{ comment.message }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form @submit.prevent="sendComment">
                        <div class="form-group">
                             <div class="input-group mb-2 mt-2 pl-3 pr-3">
                                <input type="text" class="form-control" placeholder="Ecrire un commentaire" v-model="message">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="submit">Envoyer</button>
                                     </div>
                            </div>
                        </div>
                    </form>
        </div>
    </div>
</div>

</template>


<script>

import  ApiService from '../api/api-service.js';

let moment = require("moment");
moment.locale("fr"); //Appel du module moment.js pour affichage à quel moment le message a été écris

export default {
    name: "Post",
    data() {
        return {
        error: [],
        userId: localStorage.getItem('userId'),
        isAdmin: localStorage.getItem('isAdmin'),
        moment: moment,
        posts : [],
        comments : {},
        users: {},
        showComments : {},
        message: "",
        }
    },
    methods: {

        // Suppression d'un post
          removePost(post) {
             ApiService.removePost(post)
            location.reload()
        },

        // Affichage des commentaires liés au post
        showCommentsAction(post) {
            this.showComments[post.post_id] = !this.showComments[post.post_id]
            this.showComments = JSON.parse(JSON.stringify(this.showComments))
        },
        sendComment(e) {
        const message = this.message;
        console.log(message);

        if (this.message) {
            return true,
            ApiService.createComment(message)
        .then(() => {
            alert('Message envoyé avec succès !')
        document.location.reload();
        })
        }

        this.errors = [];

        if (!this.message) {
            this.errors.push('Message requis')
        }

        alert('Message requis !')
        e.preventDefault();
    },
    },

    mounted() {
        //Appel à API pour affichage de tous les messages

      ApiService.getAllPost() 
      .then(response => {
        this.posts = response.data;
        console.log(this.posts);
      })
      .catch(error => console.log(error));

      ApiService.getAllComment()
      .then(response => {
        this.comments = response.data;
        console.log(this.comments);
      })
      .catch(error => console.log(error));

      ApiService.getAllUsers()
      .then(response => {
        this.users = response.data;
        console.log(this.users);

      })
      .catch(error => console.log(error));

    },
    
}

</script>


<style>

.post-header {
    background-color:#343A40;
    color: white;
}

.modify:hover {
    background-color: rgb(73, 186, 221);
}

.delete:hover {
    background-color: rgb(253, 29, 29);
}

.ellipsis {
    color: #343A40;
}

.commentUser {
    width: 100%;
    border: 1px solid rgb(149, 149, 149, 0.6);
    border-radius: 15px;
    background-color: white;
}

.btn-comment {
    border: 1px solid rgba(0, 0, 0, 0.5)
}

body {
            background-color: #eeeeee;
        }

        .h7 {
            font-size: 0.8rem;
        }

        .gedf-wrapper {
            margin-top: 0.97rem;
        }

        a {
            color: #343A40;
        }

        @media (min-width: 992px) {
            .gedf-main {
                padding-left: 4rem;
                padding-right: 4rem;
            }
            .gedf-card {
                margin-bottom: 2.77rem;
            }
        }

        /**Reset Bootstrap*/
        .dropdown-toggle::after {
            content: none;
            display: none;
        }


</style>