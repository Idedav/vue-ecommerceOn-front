<script>
import { store } from '../data/store.js';
import axios from 'axios';

export default {
  name : 'Home',
  components: {
    },
  data(){
    return {
      store,
      articles: {},
    }
  },
  methods : {

   getArticles(){

      axios.get(store.apiUrl + 'articles')
       .then(res => {
          this.articles = res.data;
        })     

   }

  },
  created() {

    if(!store.isLogged){
      this.$router.push("/login")
    }

  },
  mounted(){
   this.getArticles();
  }
}

</script>

<template>

<div class="container d-flex flex-wrap justify-content-center"> 

   <div v-for="article in articles" class="card mx-2 my-3 card-custom" style="width: 18rem;">
      <img :src="article.thumb" class="card-img-top">
      <div class="card-body d-flex flex-column justify-content-between">
         <h5 class="card-title">{{ article.name }}</h5>
         <p class="card-text">{{ article.description }}</p>
         <p>Prezzo: <b>{{ article.unitPrice }} &euro;</b></p>
         <router-link :to="{name: 'article-detail', params:{idArticle: article.idArticle}}" class="btn btn-warning">Visualizza Prodotto</router-link> 
      </div>
   </div>

</div>

</template> 

<style lang="scss" scoped>

.card-custom {
   border: 2px solid #FDF031;
   background-color: #743D1E;
   color: beige;
   img{
      height: 300px;
   }
   a{
      color: black;
      text-decoration: none;
   }
}

</style>