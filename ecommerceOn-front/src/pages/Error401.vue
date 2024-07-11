<script>

export default {
  name : 'Error401',
}

</script>

<template>

    <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
      <h1>ERROR401</h1>
      <p>Non sei autorizzato a visualizzare questa pagina.</p>
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