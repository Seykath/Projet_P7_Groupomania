<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/" class="nav-link">
    <a href class="navbar-brand">
      <img
        class="groupomania-logo"
        src="../assets/icon-left-font-monochrome-white-mini.png"
        alt=""
    /></a>
</router-link>

    <div class="navbar-nav ml-auto" v-if="!currentUser">
      <li class="nav-item">
        <router-link to="/inscription" class="nav-link">
          <button type="button" class="btn btn-light">
            <font-awesome-icon icon="user-plus" /> S'inscrire
          </button>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/connexion" class="nav-link">
          <button type="button" class="btn btn-light">
            <font-awesome-icon icon="sign-in-alt" /> Connexion
          </button>
        </router-link>
      </li>
    </div>


    <div v-if="currentUser" class="navbar-nav mr-auto">
       <li class="nav-item">
          <router-link to="/mur" class="nav-link">
            <font-awesome-icon icon="sticky-note" class="mr-2"/>Actualités
          </router-link>
        </li>
    </div>
    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/profil" class="nav-link">
          <font-awesome-icon icon="user" />
          {{ username }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href @click.prevent="disconnect">
          <font-awesome-icon icon="sign-out-alt" /> Déconnexion
        </a>
      </li>
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

<style>
a {
  text-decoration: none;
}
.groupomania-logo {
  width: 250px;
}

</style>