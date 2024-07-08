<script>
import axios from 'axios';
import { store } from '../data/store.js';
import localStore from '../data/localStorage.js';

export default {
  name : 'Login',
  data(){
    return {
        store,
        localStore,
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
          this.localStore.commit("setIsLogged", true);
        //   Reindirizzo alla home
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

            <img src="../assets/image/logo.jpg" alt="logo">

            <h1>Accesso</h1>

            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Accedi</button>
            </form>  
        </div>

        <div class="error" v-if="isError">

            <div class="warning">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
            </div>


            <p>CREDENZIALI NON VAILDE</p>

        </div>

    </div>


</template>

<style lang="scss" scoped>

.container-login {
    width: 100%;
    height: 100vh;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    .form-login {
        width: 1000px;
        height: 500px;
        background-color: #F0F1F6;
        border: 1px solid black;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
            width: 75px;
            border-radius: 50%;
            border: 2px solid black;
        }
        h1 {
            font-size: 30px;
        }
 
    }
    .error{
        position: absolute;
        width: 300px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #F0F1F6;
        border: 1px solid black;
        border-radius: 20px;
        z-index: 100;
        .warning{
            width: 50px;
            color: red;
        }
        p {
            color: red;
            font-weight: bold;
        }
    }
}

</style>