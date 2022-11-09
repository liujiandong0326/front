<template>
  <div>
    <div>token: {{ this.$store.state.token }}</div>
    <div>userid: {{ this.$store.state.userid }}</div>
    <div>username: {{ this.$store.state.username }}</div>
  </div>
</template>

<script>
export default {
  name: "demo",
};
</script>

<style scoped></style>
