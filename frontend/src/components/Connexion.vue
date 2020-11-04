<template>
<div class="col-md-12">
<div class="card card-container">
  <img
        id="profile-img"
        src="../assets/icon-left-font-monochrome-black-mini.png"
        alt="groupomania logo"
        class="profile-img-card"
      />
<form id="login-form" @submit="loginForm">


<div class="form-group">
    <label for="username">Pseudo</label>
    <input type="text" 
    id="username" 
    class="form-control"  
    placeholder="Jojo" 
    pattern="[a-zâäàéèùêëîïôöçñA-Z-0-9\s]{3,25}" 
    v-model="username">
    <small id="pseudo" class="form-text text-muted"></small>
</div>

<div class="form-group">
    <label for="password">Mot de passe</label>
    <input type="password" 
    id="password" class="form-control"  
    placeholder="ex : Alpha1!" 
    title="Doit contenir 6 caractères minimum, une majuscule, une minuscule et un chiffre" 
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}" 
    v-model="password">
    <small id="smallpass" class="text-danger"></small>
</div>

<button  type="submit" class="col-md-12 btn-lg btn-dark mt-3 mb-3">Se connecter</button>
        <p>Pas encore inscrit ? <a href="/inscription">Inscrivez-vous</a></p>

</form>
</div>
</div>
</template>


<script>

import ApiService from '../api/api-service'

export default {
    name: "connexion",
    data() {
        return {
   errors: [],
        username: null,
        password: null,
        data:JSON.parse(localStorage.getItem('user')),
        user: "",
      }
    },
    
    methods: {
      loginForm(e) {
        this.errors = [];

        if (!this.username ) {
          this.errors.push('Pseudo requis !');
        }
        if (!this.password) {
          this.errors.push('Mot de passe requis');
        }

        if (!this.errors.length) {

       ApiService.login(this.username, this.password)
         .then((result) => {
            localStorage.setItem("userId", result.data.userId)
            localStorage.setItem("token", result.data.token)

         alert("Vous êtes à présent connecté !")

         let userId = localStorage.getItem("userId");

        ApiService.getOneUser(userId)
        
        .then(response => {
          this.user = response.data
          console.log(this.user)
          this.username = localStorage.setItem('username', this.user.username)
          this.nom = localStorage.setItem('nom', this.user.nom)
          this.prenom = localStorage.setItem('prenom', this.user.prenom)
          this.isAdmin = localStorage.setItem('isAdmin', this.user.isAdmin)
          this.$router.push('/mur');
         
        })
        .catch(error => console.log(error))

         })
        }
         e.preventDefault();
        
      },
        
      }
  }

</script>

<style scoped>

label {
  display: block;
  margin-top: 10px;
}

a {
  color: blue;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

button {
    margin: 0 auto;
}
</style>