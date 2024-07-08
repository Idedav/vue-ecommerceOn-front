<script>
import { store } from '../data/store.js';
import axios from 'axios';

export default {
  name : 'Cart',

  data(){
    return{
      store,
      cart: {},
    }
  },
  methods: {
    getCart(){
      axios.get(store.apiUrl + 'cart/' + this.store.user.id)
      .then(res =>{
        console.log(res.data);
      })
    }
  },
  created() {

    if(!store.isLogged){
      this.$router.push("/login")
    }

  },
  mounted() {
    this.getCart();
  }
}

</script>

<template>

<h1>Cart</h1>

</template>

<style lang="scss" scoped>

h1{
  color: black;
}


</style>