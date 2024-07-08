<script>

export default {
  name : 'Error404',
}

</script>

<template>

    <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
      <h1>ERROR404</h1>
      <div class="btn btn-warning">
        <router-link :to="{name: 'home'}">Torna alla home</router-link>
      </div>
    </div>

</template>

<style scoped>

h1{
  color: black;
}

a{
  color: black;
  text-decoration: none;
}

</style>