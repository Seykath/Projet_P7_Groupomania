<template>
  <div id="app">
    <Nav :key="$route.fullPath"/>
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/Nav";

export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>
