<template>
<div>
    <div class="post" v-for="post in posts.slice()" :key="post.id">
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
                        <a href="#" class="card-link"><font-awesome-icon icon="comment" /> Commenter</a>
                        <!-- <a href="#" class="card-link"><font-awesome-icon icon="share" /> Partager</a> -->
                    </div>
        </div>
    </div>
</div>




<!-- 
<div>
    <div class="post" v-for="post in posts.slice()" :key="post.id">
    <div class="container d-flex justify-content-center mt-5">
        <div class="card col-md-10">
            <div class="card-body d-flex post-header "><p><strong class="mr-3">{{post.author.username}}</strong>{{ moment(post.date).fromNow() }}</p>
                
            </div>
            <div class="card-body mt-1">
                <h5 class="card-title">{{ post.titre }}</h5>
                <p class="card-text mt-3">{{ post.content }}</p>
                <div class="card-footer mt-4">
                 <div class="postComments d-flex" v-for="comment in comments.slice()" :key="comment.id">
                <div v-if="post.post_id == comment.post_id">
                    <p><strong>{{ comment.user_id }}</strong> {{ moment(comment.date).fromNow() }}</p>
                    <p> {{ comment.message }}</p>
                    
                </div>
            </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</div> -->

</template>


<script>

import  ApiService from '../api/api-service.js';

let moment = require("moment");
moment.locale("fr"); //Appel du module moment.js pour affichage à quel moment le message a été écris

export default {
    name: "Post",
    data() {
        return {
        userId: localStorage.getItem('userId'),
        isAdmin: localStorage.getItem('isAdmin'),
        moment: moment,
        posts : [],
        comments : [],
        users: {},
        }
    },
    methods: {
          removePost(post) {
             ApiService.removePost(post)
            location.reload()
        },
    },

    mounted() {
        //Appel à API pour affichage de tous les messages
       
      ApiService.getAllPost()
      .then(response => {
        console.log(response.data);
        this.posts = response.data;
      })
      .catch(error => console.log(error));

      ApiService.getAllComment()
      .then(response => {
        // console.log(response.data);
        this.comments = response.data;
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