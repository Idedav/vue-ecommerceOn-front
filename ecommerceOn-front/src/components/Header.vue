<script>
import { store } from '../data/store.js';

export default {
  name : 'Header',
  data(){
    return {
        store
        }
    },
    methods: {
        logout(){
            localStorage.removeItem("userInfo");
            this.store.isLogged = false;
            this.$router.push("/login");
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
                    <button @click="logout" class="btn btn-custom">Logout</button>
                </li>
            </ul>
        </nav>
    </header>

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
        color: black;
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
    }
}

</style>