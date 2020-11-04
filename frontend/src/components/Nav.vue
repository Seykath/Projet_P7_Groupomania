<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/mur" class="nav-link">
    <a href class="navbar-brand">
      <img
        class="groupomania-logo"
        src="../assets/icon-left-font-monochrome-white-mini.png"
        alt=""
    /></a>
</router-link>

<div class="dropdown dropleft ml-auto">
   <button class="btn btn-light btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <font-awesome-icon icon="bars" size="2x" id="bars-menu" />
  </button>
  
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" v-if="!currentUser"><router-link to="/inscription" class="nav-link"><font-awesome-icon icon="user-plus" class="mr-2" /> S'inscrire</router-link></a>
    <div class="dropdown-divider" v-if="!currentUser"></div>
    <a class="dropdown-item" v-if="!currentUser"><router-link to="/connexion" class="nav-link"><font-awesome-icon icon="sign-in-alt" class="mr-2" /> Connexion</router-link></a>
    
    <a class="dropdown-item" v-if="currentUser"><router-link to="/mur" class="nav-link"><font-awesome-icon icon="sticky-note" class="mr-2"/>Actualités</router-link></a>
    <div class="dropdown-divider" v-if="currentUser"></div>
    <a class="dropdown-item" v-if="currentUser"><router-link to="/profil" class="nav-link"><font-awesome-icon icon="user" class="mr-2" />{{ username }}</router-link></a>
    <div class="dropdown-divider" v-if="currentUser"></div>
    <a class="dropdown-item" v-if="currentUser" @click.prevent="disconnect"><font-awesome-icon icon="sign-out-alt" class="mr-2" /> Déconnexion</a>
  </div>
</div>

    
  </nav>
</template>


<script>

export default {
  name: 'Nav',
  data() {
    return {
      currentUser: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      nom: localStorage.getItem('nom'),
      prenom: localStorage.getItem('prenom')
    }
  },
  methods: {
      disconnect() {
        localStorage.clear();
        console.log('Déconnexion');
        setTimeout(() => {
            this.$router.push('/');
          }, 500);
      }
  },

}
</script>

<style scoped>

.dropdown-item {
  text-decoration: none;
  color: #343A40;

}
.groupomania-logo {
  width: 250px;
}

a {
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  .groupomania-logo {
  width: 200px;
  }
  
}

</style>