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
    <button class="btn btn-danger" @click="deleteUser" >Supprimer</button>
    </div>
  </div>
</template>



<script>


import axios from "axios";


export default {
    name: 'profil',
    data(){
    return {
        data:JSON.parse(localStorage.getItem('user')),
        userId:"",
        user:"",
    }
},
mounted(){
    //Appel à API pour affichage des infos utilisateur
    let id = JSON.parse(localStorage.getItem("userId"))
     axios.get(`http://localhost:3000/api/auth/user/${id}`,{
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    }) 
        .then(response => {
          console.log(response.data.id)
          this.user = response.data
        
         
        })
        .catch(error => console.log(error)) 
},
methods:{
    deleteUser : function () {//Fonction permettant à utilisateur de supprimer son compte 
        let userId = JSON.parse(localStorage.getItem('userId'))
        if(confirm('Voulez-vous vraiment supprimer le compte ?'),confirm('Attention, cette opération est irreversible !')){
             axios.delete(`http://localhost:3000/api/auth/user/${userId}`, { 
          headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
        })
       .then (() => { 
                    localStorage.clear();
                    alert('votre compte a bien été supprimé !');
                    this.$router.push('/')
                    
       })
       .catch(() =>{
         console.log('Votre compte n\'a pas pu être supprimé !')
       }) 
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