<template>
<div class="col-md-12">
<div class="card card-container">
  <img
        id="profile-img"
        src="../assets/icon-left-font-monochrome-black-mini.png"
        class="profile-img-card"
      />
<form @submit.prevent="submitForm">

    <div class="form-group">
    <label for="nom">Nom</label>
    <input type="text" id="nom" class="form-control" 
    placeholder="Lenon" 
    pattern="[a-zâäàéèùêëîïôöçñA-Z\s]{3,30}" 
    v-model="form.nom">
    <div class="invalid-feedback">
        Veuillez entrer un nom
      </div>
</div>

<div class="form-group ">
    <label for="prenom">Prénom</label>
    <input type="text" id="prenom" class="form-control"  
    placeholder="John" pattern="[a-zâäàéèùêëîïôöçñA-Z\s]{3,30}" 
    v-model="form.prenom">
</div>

<div class="form-group">
    <label for="username">Pseudo</label>
    <input type="text" 
    id="username" 
    class="form-control"  
    placeholder="Jojo" 
    pattern="[a-zâäàéèùêëîïôöçñA-Z-0-9\s]{3,25}" 
    v-model="form.username">
</div>

<div class="form-group">
    <label for="email">Email</label>
    <input type="email" 
    id="email" 
    class="form-control"  
    placeholder="ex : JohnLenon@exemple.com" 
    pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}" 
    v-model="form.email">
</div>

<div class="form-group">
    <label for="password">Mot de passe</label>
    <input type="password" 
    id="password" class="form-control"  
    placeholder="ex : Alpha1!" 
    title="Doit contenir 6 caractères minimum, une majuscule, une minuscule et un chiffre" 
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}" 
    v-model="form.password">
</div>

<button  type="submit" class="col-md-12 btn-lg btn-dark mt-3 mb-3" @submit.prevent="register">Envoyer</button>
        <p>Déjà inscrit ? <a href="/connexion">Connectez-vous</a></p>

</form>


</div>
</div>
</template>

<script>


import axios from 'axios';

export default {
    name: "inscription",
    data() {
      return {
        errors: [],
        form: {
        nom: null,
        prenom: null,
        username: null,
        email: null,
        password: null
        }
      }
    },
    methods: {
     
      submitForm(e) {
        this.errors = [];

        if (!this.nom) {
          this.errors.push('Nom requis !');
        }
        if (!this.prenom) {
          this.errors.push('Prenom requis !');
        }
        if (!this.username) {
          this.errors.push('Pseudo requis !');
        }
        if (!this.email) {
          this.errors.push("Email requis !");
        }
        if (this.password) {
          this.errors.push('Mot de passe requis');
        }

        if (!this.errors.length) {
          return true;
        }

        let url='http://localhost:3000/api/auth/signup';

         axios.post(url, this.form)
         .then(() => {

         alert("Bienvenue ! vous pouvez maintenant vous connecter !")
         
          this.$router.push('/connexion');
         })
         
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