<template>
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Groupomania application</h1>
    <p class="lead">Venez échanger avec vos collègues</p>
  </div>
</div>
</template>


<script>

export default {
    name : 'Accueil',
    data() {
        return {
            txt: "Bienvenue sur groupomania",
            txt2: "Venez échanger avec vos collègues"
        }
    }
}

</script>

<style>
body {
    text-align: center;
}

.jumbotron {
  border-bottom: 2px rgba(0, 0, 0, 0.1) solid;
}

</style>