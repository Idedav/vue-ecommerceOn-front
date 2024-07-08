<script>
import { store } from '../data/store.js';
import axios from 'axios';

export default {
  name : 'ArticleDetail',
  data(){
    return {
      store,
      article: {},
    }
  },
  methods:{

    getArticle(idArticle) {

      axios.get(store.apiUrl + 'article/' + idArticle)
      .then(res =>{
        this.article = res.data;
        console.log(res.data);
      })

    }

  },
  created() {

    if(!store.isLogged){
      this.$router.push("/login")
    }

  },
  mounted(){
    this.getArticle(this.$route.params.idArticle);
  }
}

</script>

<template>


<div class="d-flex">

  <div class="image me-5">
    <img :src="article.thumb" alt="">
  </div>

  <div class="text">
    <h1>{{ article.name }}</h1>
    <p>{{ article.description }}.</p>
    <p>Prezzo unitario: <b>{{ article.unitPrice }} &euro;</b></p>
    <p>Quantità disponibile: <b>{{ article.qtyAvailable }}</b></p>



  </div>

</div>




</template>

<style lang="scss" scoped>

h1{
    color: black;
}

.image{
  width: 300px;
  height: 300px;
  img{
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 10px;
  }
}

</style>