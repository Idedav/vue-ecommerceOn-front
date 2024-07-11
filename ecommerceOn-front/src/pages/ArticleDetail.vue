<script>
import { store } from '../data/store.js';
import axios from 'axios';
import Loader from '../components/Loader.vue';

export default {
  name : 'ArticleDetail',
  components: {
    Loader
    },
  data(){
    return {
      store,
      article: {},
      isLoaded: false,
      qtyOrdered: 1
    }
  },
  methods:{

    getArticle(idArticle) {

      axios.get(store.apiUrl + 'article/' + idArticle)
      .then(res =>{
        this.article = res.data;
        console.log(res.data);
      })
      this.isLoaded = true;

    },
    addToCart(){

      axios.post(store.apiUrl + 'add-cart', {
        idUser: store.user.idUser,
        idArticle: this.article.idArticle,
        qtyOrdered: this.qtyOrdered
      })
      .then(res => {
        console.log(res.data);
        this.$router.push('/cart')
      })

    },
    handleAddArticle(){
      if(this.qtyOrdered < this.article.qtyAvailable){
        this.qtyOrdered++;
      }
    },
    handleRemoveArticle(){
      if (this.qtyOrdered > 1 ) {
          this.qtyOrdered--;
      }
    },

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

<div v-if="!isLoaded">
  <Loader/>
</div>

<div v-else class="d-flex container-article">

  <div class="image me-5">
    <img :src="article.thumb" alt="">
  </div>

  <div class="text">
    <h2>{{ article.name }}</h2>
    <p>{{ article.description }}.</p>
    <p>Prezzo unitario: <b>{{ article.unitPrice }} &euro;</b></p>
    <p>Quantità disponibile: <b>{{ article.qtyAvailable }}</b></p>

    <form @submit.prevent="addToCart" class="d-flex flex-column mt-4">

      <div class="d-flex ms-3">
        <span class="btn btn-custom"  @click="handleRemoveArticle">-</span>
        <input  type="number" readonly="true" v-model="qtyOrdered" class="input mx-2">
        <span class="btn btn-custom"  @click="handleAddArticle">+</span>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-warning">Aggiungi al Carrello</button>
      </div>

    </form>

  </div>

</div>




</template>

<style lang="scss" scoped>

.container-article{
  border-radius: 10px;
  padding: 30px;
  background-color: rgba(0,0,0, .7);
  color: beige;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

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

.input{
  width: 50px;
  border-radius: 5px;
  text-align: center;
}

.btn-custom{
  font-weight: bold;
  background-color: beige;
  color: black;
}

</style>