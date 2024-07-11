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
      <router-link :to="{name: 'article-detail', params:{idArticle: article.idArticle}}" v-for="article in articles" class="card mx-2 my-3 card-custom" style="width: 18rem;">
         <img :src="article.thumb" class="card-img-top">
         <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">{{ article.name }}</h5>
            <p class="card-text">{{ article.description }}</p>
            <p>Prezzo: <b>{{ article.unitPrice }} &euro;</b></p>
         </div>
      </router-link>
   </div>


</div>

</template> 

<style lang="scss" scoped>

.card-custom {
   border: none;
   background-color: rgb(116, 61, 30);
   color: beige;
   transition: 0.25s ease;
   &:hover{
      transform: translate(-5px, -5px);
      box-shadow:rgba(116, 61, 30, .4) 5px 5px, rgba(116, 61, 30, 0.3) 10px 10px, rgba(116, 61, 30, 0.2) 15px 15px, rgba(116, 61, 30, 0.1) 20px 20px, rgba(116, 61, 30, 0.05) 25px 25px;
   }
   img{
      height: 300px;
   }
}

a{
   color: black;
   text-decoration: none;
}
</style>