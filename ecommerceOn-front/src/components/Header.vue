<script>
import axios from 'axios';
import { store } from '../data/store.js';

export default {
  name : 'Header',
  data(){
    return {
        store,
        showPopup: false
        }
    },
    methods: {
        logout(){
            localStorage.removeItem("userInfo");
            this.store.isLogged = false;
            this.store.user = {};
            this.showPopup = false;
            this.$router.push("/login");
        },
        openPopup(){
            this.showPopup = true;
        },
        deleteCart(){

            axios.delete(store.apiUrl + 'delete-cart/' + store.user.idUser)
            .then(res => {
                console.log(res.data);
                this.logout();
            })
            .catch(error => {
                console.log(error);
                this.logout();
            });

        }
    }
}

</script>

<template>

    <header>        
        <img src="../assets/image/logo1-removebg-preview.png" alt="logo">

        <nav v-if="store.isLogged">
            <ul>
                <li class="ms-3">
                    <router-link :to="{name: 'home'}">Home</router-link>
                </li>
                <li class="ms-3">
                    <router-link :to="{name: 'cart'}">Carrello</router-link>
                </li>
                <li class="ms-3">
                    <router-link :to="{name: 'orders'}">I tuoi ordini</router-link>
                </li>
                <li class="ms-3">
                    <button @click="openPopup" class="btn btn-custom">Logout</button>
                </li>
            </ul>
        </nav>
    </header>

    <div v-if="showPopup" class="container-logout d-flex flex-column justify-content-center align-items-center">

        <p>Salvare il tuo carello prima di effettuare il logout?</p>

        <div>
            <button @click="logout" class="btn btn-light ms-3">Sì</button>
            <button @click="deleteCart" class="btn btn-danger ms-3">No</button>
        </div>

    </div>

</template>

<style lang="scss" scoped>

header{
    margin: 0 auto;
    min-width: 800px;
    max-width: 800px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        width: 100px;
        height: 100px;
    }
    .btn-custom{
        background-color: beige;
        color: #743D1E;
        &:hover{
            background-color: #FDF031;
        }
    }
}

nav ul{
    display: flex;
    align-items: center;
    list-style: none;
    li a{
        margin-right: 10px;
        color: beige;
        text-decoration: none;
        &:hover{
            color: #FDF031;
        }
    }
}

.container-logout{
  width: 500px;
  height: 150px;
  background-color: beige;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  z-index: 99;
}

</style>