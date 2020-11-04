<template>
<div class="main">
    <div class="post" v-for="post in posts" :key="post.id">
        <div class="card gedf-card mt-5 mr-auto ml-auto p-0 col-md-6">
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
                        <button type="button" class="btn btn-danger btn-sm btn-responsive" v-if="post.user_id == userId || isAdmin == 'ADMIN'" @click="removePost(post)">X</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ post.titre }}</h5>
                <p class="card-text">{{ post.content }}</p>
                <img class="center" :src="post.imageUrl" />
            </div>
            <div class="card-footer">
                <button class="btn btn-info btn-responsive" v-if="post.comments.length >= 0" @click="showCommentsAction(post)">{{post.comments.length}} Commentaire<span v-if="post.comments.length > 1">s</span>
                <font-awesome-icon icon="comment" class="ml-2" /></button>
                    <div class="postComments" v-if="showComments[post.post_id]">
                        <div class=" mt-2" v-for="comment in comments" :key="comment.postId">
                            <div class="bloc-comments">
                                <div v-if="post.post_id == comment.post_id" class="commentUser p-2 mr-2 ml-2">
                                    <p class="mb-1"><strong class="comment-user mr-2">{{ comment.username }},</strong><span class="text-muted">{{ moment(comment.date).fromNow() }} </span></p>
                                    <p class="mb-2"> {{ comment.message }}</p>   
                                    <button type="button" class="btn btn-dark btm-sm btn-responsive-comment " v-if="comment.user_id == userId || isAdmin == 'ADMIN'" @click="removeComment(comment)">supprimer</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
                <form @submit.prevent="sendComment(post.post_id)" >
                    <div class="form-group">
                        <div class="input-group mb-2 mt-2 pl-3 pr-3">
                            <input type="text" class="form-control"  placeholder="Ecrire un commentaire" v-model.lazy="message">
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
        showComments : {},
        message:  "",
        }
    },
    methods: {
        // Suppression d'un post
          removePost(post) {
              
            if ( confirm("Êtes vous sûr de vouloir supprimer le post ?") ) {
                ApiService.removePost(post)
                location.reload()
            } else {
               return;
            }
        },
        // Affichage des commentaires liés au post
        showCommentsAction(post) {
            this.showComments[post.post_id] = !this.showComments[post.post_id]
            this.showComments = JSON.parse(JSON.stringify(this.showComments))
        },
        sendComment(postId) {
            const message =  this.message;
            console.log(message);
            console.log(postId);
            ApiService.createComment(message, postId)
            this.message = "";
            location.reload()
        },
        removeComment(comment) {

            if ( confirm("Êtes vous sûr de vouloir supprimer le commentaire ?") ) {
                ApiService.removeComment(comment)
                location.reload()
            } else {
               return;
            }
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

img{
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
}

body {
            background-color: #eeee;
            text-align: left;
            font-size: 18px;
        }

        a {
            color: #343A40;
        }

        .btn-responsive-comment {
                padding:4px 9px;
                font-size:90%;
                line-height: 1.2;
            }

        @media screen and (max-width: 992px) {

            .gedf-card {
                margin-bottom: 20px;
            }
            .btn-responsive {
                padding:4px 9px;
                font-size:90%;
                line-height: 1.2;
            }
            .btn-responsive-comment {
                padding:4px 9px;
                font-size:80%;
                line-height: 1;
            }
        }

        /**Reset Bootstrap*/
        .dropdown-toggle::after {
            content: none;
            display: none;
        }


</style>