<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/navBar";

export default {
  components: { NavBar },
  mounted() {
    let token = window.localStorage.getItem("token");
    if (token) {
      this.$store.commit("login_saveToken", token);
      this.$store.dispatch("getAvatar");
    }
  },
};
</script>

<style lang="scss"></style>
