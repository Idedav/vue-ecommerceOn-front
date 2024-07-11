<script>
import { store } from '../data/store.js';
import axios from 'axios';

export default {
  name : 'Login',
  data(){
    return {
        store,
        email : '',
        password : '',
        isError : false
    }
  },
  methods : {
    login(){
        axios.post(store.apiUrl + "login", {
            email : this.email,
            password :  this.password
        } )
        .then(res => {
          // Salva l'utente nello storage locale
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          // Imposta il flag di accesso
          this.store.isLogged = true;
          // Reindirizzo alla home
          this.$router.push("/");
        })
        .catch(err => {
            this.isError = true;
            setTimeout(() => {
                this.isError = false;
            }, 3000);
        })
    }
  }
}

</script>

<template>

<div class="container-login">

  <div class="form-login">

      <h1>Accesso</h1>

      <form @submit.prevent="login">
          <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
          </div>
          <div>
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
          </div>
          <div class="container-error">
            <p  v-if="isError">E-mail o Password errati</p>
          </div>
          <div>
            <button type="submit" class="btn btn-warning">Accedi</button>
          </div>
      </form>  
  </div>

</div>


</template>

<style lang="scss" scoped>

h1{
  color: black;
}

.container-error{
  height: 30px;
  color: red;
}


</style>