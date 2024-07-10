<script>
import { store } from '../data/store.js';
import axios from 'axios';
import Loader from '../components/Loader.vue';

export default {
  name : 'Home',
  components: {
    Loader
    },
  data(){
    return {
      store,
      articles: {},
      isLoaded: false,
    }
  },
  methods : {

   getArticles(){

      axios.get(store.apiUrl + 'articles')
       .then(res => {
          this.articles = res.data;
          this.isLoaded = true;  
        })   

   }

  },
  created() {

    if(!store.isLogged){
      this.$router.push("/login")
    }else{
      const userString = localStorage.getItem("userInfo");
      const user = JSON.parse(userString);
      store.user = user;
    }

  },
  mounted(){
   this.getArticles();
  }
}

</script>

<template>

<div v-if="!isLoaded">
   <Loader/>
</div> 

<div v-else> 

   
   <h1 class="text-center pb-4">I nostri prodotti</h1>

   <div  class="container d-flex flex-wrap justify-content-center">
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