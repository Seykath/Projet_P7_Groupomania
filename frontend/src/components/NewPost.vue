<template>
<div>
    <div class="card gedf-card mt-3  mr-auto ml-auto p-0 col-md-6">    
        <div class="card-body">
            <form @submit.prevent="sendPost">
                <div class="form-group">
                    <input class="form-control" placeholder="Votre titre" id="postTitre" v-model="titre"/>
                    <br>
                    <textarea class="form-control" placeholder="Ecrivez-ici..." id="postContent" v-model="content" ></textarea>
                    <button type="submit" class="btn btn-info mt-3">Envoyer</button>
                </div>
            </form>
         </div>
    </div>
</div>


</template>

<script>

import ApiService from '../api/api-service.js';

export default {

name : "NewPost",
data() {
    return {
        errors: [],
     titre: null,
     content: null,
     
    }
},
methods: {
    sendPost(e) {
        console.log(this.titre);
        console.log(this.content);

        if (this.titre && this.content) {
            return true,
            ApiService.createPost(this.titre, this.content)
        .then(() => {
            alert('Post envoyé avec succès !')
        document.location.reload();
        })
        }

        this.errors = [];

        if (!this.titre) {
            this.errors.push('Titre requis')
        }
        if (!this.content) {
            this.errors.push('Content requis')
        }

        alert('Titre et Message requis !')
        e.preventDefault();
    }
}
}

</script>