<script>
import { store } from '../data/store.js';
import axios from 'axios';

export default {
  name : 'Orders',

  data(){
    return{
      store,
    }
  },
  created() {

    if(!store.isLogged){
      this.$router.push("/login")
    }

  }
}

</script>

<template>

<h1>Orders</h1>

</template>

<style lang="scss" scoped>

h1{
  color: black;
}


</style>