<script>
import { store } from '../data/store.js';
import axios from 'axios';
import Loader from '../components/Loader.vue';

export default {
  name : 'Cart',
  components: {
    Loader
    },
  data(){
    return{
      store,
      cart: {},
      isLoaded: false,
      cartEmpty: false,
      showPopup: false
    }
  },
  methods: {
    getCart(){
      axios.get(store.apiUrl + 'cart/' + store.user.idUser)
      .then(res =>{
        console.log(res.data);
        this.cart = res.data;
        this.isLoaded = true;
      })
      .catch(err => {
        console.log(err);
        this.isLoaded = true;
        this.cartEmpty = true;
      })
    },
    openPopup(){
      this.showPopup = true;
    },
    deleteCart(){

      axios.delete(store.apiUrl + 'delete-cart/' + store.user.idUser)
      .then(res => {
        this.cart = {};
        this.cartEmpty = true;
        this.$router.push("/cart");
        this.showPopup = false;
      });

    },
    deleteArticleToCart(idArticle){
      axios.delete(store.apiUrl + 'delete-article-cart/' + store.user.idUser + '/' + idArticle)
      .then(res => {
        console.log(res.data);
        this.getCart();
      });
    }
  },
  created() {

    if(!store.isLogged){
      this.$router.push("/login")
    }

  },
  mounted() {
    this.getCart();
  }
}

</script>

<template>

<div v-if="!isLoaded">
  <Loader />
</div>

<div v-else>

  <div v-if="cartEmpty" class="text-center">
    <h2>Non hai ancora aggiunto alcun articolo nel tuo carrello.</h2>
    <p>Vai alla <router-link :to="{name: 'home'}">homepage</router-link> per iniziare a acquistare.</p>
  </div>

  <div v-else>

    <h2 class="mb-5">Il tuo Carrello</h2>
    
    <div class="container-table">
        <table class="table table-light">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Quantità ordinata</th>
              <th scope="col">Prezzo</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in cart.articles">
              <th scope="row">
                <img :src="article.article.thumb" alt="">  
                <router-link :to="{name: 'article-detail', params:{idArticle: article.article.id}}" class="ms-3">
                  {{ article.article.name }}
                </router-link> 
              </th>
              <td>x {{ article.qtyOrdered }}</td>
              <td>{{ (article.article.unitPrice * article.qtyOrdered).toFixed(2) }} &euro;</td>
              <td><button @click="deleteArticleToCart(article.article.id)" class="btn btn-danger ">&Cross;</button></td>
            </tr>
          </tbody>
        </table>
    </div>
  
    <div class="d-flex justify-content-end">
      <div>
        <div class="d-flex justify-content-end">
          <p><b>Totale: {{ cart.totalPrice }} &euro;</b></p>
        </div>
        <div class="actions">        
          <button @click="openPopup()" class="btn btn-danger ms-2">Svuota carrello</button>
          <router-link :to="{name: 'checkout'}" class="btn btn-warning ms-2">CheckOut</router-link> 
        </div>
      </div>
    </div>

  </div>

  <div v-if="showPopup" class="container-delete d-flex flex-column justify-content-center align-items-center">

    <p>Sei sicuro di voler eliminare il tuo carrello?</p>

    <div>
      <button @click="deleteCart()" class="btn btn-danger ms-3">Sì</button>
      <button @click="showPopup = false" class="btn btn-light ms-3">No</button>
    </div>

  </div>

</div>

</template>

<style lang="scss" scoped>

.container-table{
  width: 800px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  .table{
    width: 100%;
    a{
      text-decoration: none;
      color: black;
    }
    img{
      width: 50px;
      height: 50px;
    }
  }
}

.container-delete{
  width: 500px;
  height: 150px;
  background-color: beige;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}


</style>