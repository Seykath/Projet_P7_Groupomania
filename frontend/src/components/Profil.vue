<template>
  <div class="container" id="profil">

    <header class="card-header col-md-4 mt-3 moncompte">
      <h3>Profil</h3>
    </header>

    <div class="bg-card card col-md-4 pt-3">
    <p>
      <strong>Pseudo :</strong><br>
      {{user.username}}
    </p>
    <p>
      <strong>Nom :</strong><br>
      {{user.nom}}
    </p>
    <p>
      <strong>Prenom :</strong><br>
      {{user.prenom}}
    </p>
    <p>
      <strong>Email :</strong><br>
      {{user.email}}
    </p>
    </div>
    <div class="btn-profil col-md-4 mt-2">
    <button class="btn btn-danger" @click="deleteOneUser()">Supprimer</button>
    </div>
  </div>
</template>



<script>


import ApiService from '../api/api-service';


export default {
    name: 'profil',
    data(){
    return {
        data:JSON.parse(localStorage.getItem('user')),
        userId: localStorage.getItem('userId'),
        user:"",
    }
},
mounted(){

    //Appel à API pour affichage des infos utilisateur
      console.log(this.userId);
      ApiService.getOneUser(this.userId) 
       .then(response => {
          console.log(response.data.id)
          this.user = response.data
         
        })
        .catch(error => console.log(error)) 
    },

methods:{
    deleteOneUser() {//Fonction permettant à utilisateur de supprimer son compte 
  
        if ( confirm('Voulez-vous vraiment supprimer le compte ?') ) {
          const id =  localStorage.getItem('userId');
          console.log(id);
          ApiService.deleteUser(id);
          localStorage.clear();
          alert('votre compte a bien été supprimé !');
          this.$router.push('/');

       } else {
          return;
        }
    },
}
}
</script>

<style>

h3 {
  margin: 0;
}

.moncompte {
  margin: 0 auto 15px auto;
}
.btn-profil {
  text-align: right;
 margin: 0 auto;
}

.bg-card {
  border-bottom: 2px rgba(0, 0, 0, 0.1) solid;
  margin: 0 auto 0 auto;
  }

</style>