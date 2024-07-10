<script>

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { store } from "./data/store.js";


export default {
  name : 'App',
  components : {
    Header,
    Footer
  },
  data(){
    return {
      store,
    }
  },
  methods:{
  },
  created() {

    const userString = localStorage.getItem("userInfo");
    if (userString) {

    this.store.isLogged = true;
    const user = JSON.parse(userString);
    this.store.user = user;

    }
  },
  
}

</script>

<template>

  <div class="container-custom">

    <div class="container-header">
      <Header />
    </div>

    <div class="container-route">
      <RouterView />
    </div>

    <div class="container-footer">
      <Footer />
    </div>

  </div>

</template>

<style lang="scss" scoped>

:root{
  --blur: 10px;
}

.container-custom{
  min-height: 100vh;
  margin: 0 auto;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .container-route{
    margin: 50px auto;
    min-width: 1300px;
    max-width: 1300px;
    display: flex;
    justify-content: center;
  }
  .container-header{
    width: 100%;
    background-color: #743D1E;
    border-bottom: 4px solid #FDF031;
  }
  .container-footer{
    width: 100%;
    background-color: black;
  }
}

</style>
