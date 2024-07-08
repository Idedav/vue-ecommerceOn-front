<script>

export default {
  name : 'Footer',
}

</script>

<template>

    <footer>
      <ul class="d-flex">
        <li class="mx-2"><a href="#">Termini e condizioni</a></li>
        |
        <li class="mx-2"><a href="#">Informazioni sulla privacy</a></li>
        |
        <li class="mx-2"><a href="#">Utilizzo dei cookie</a></li>
      </ul>
    </footer>

</template>

<style lang="scss" scoped>

footer{
  margin: 0 auto;
    min-width: 1300px;
    max-width: 1300px;
  height: 100px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  li{
    list-style: none;
  }
  a{
    color: white;
    text-decoration: none;
  }
}

</style>