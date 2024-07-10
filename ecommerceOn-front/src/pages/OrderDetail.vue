<script>
import { store } from '../data/store.js';
import axios from 'axios';
import Loader from '../components/Loader.vue';

export default {
  name : 'OrderDetail',
  components: {
    Loader
    },
    data(){
    return{
      store,
      order: {},
      isLoaded : false
    }
  },
  methods:{

    getOrder(){
      axios.get(store.apiUrl + 'order/' + this.$route.params.idOrder)
       .then(res => {
        console.log(res.data);
          this.order = res.data;
          this.isLoaded = true;
        })
       .catch(error => {
          console.error(error);
        });
    },
    formatTypePayment(typePayment){

      switch(typePayment) {
        case "PAYPAL":
          return "PayPal";
          break;
        case "CREDIT_CARD":
          return "Carta di credito";
          break;
        default:
          return "Carta di debito";
      }

    },
    formatStatus(status){

      if(status == "CREATED"){
        return "In fase di elaborazione";
      }else{
        return "Confermato";
      }

    }

  },
  mounted(){
    this.getOrder(); 
  }
}

</script>

<template>

    <div v-if="!isLoaded">
      <Loader />
    </div>

    <div v-else class="d-flex justify-content-between align-items-center">

      <div class="card card-custom " style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Ordine N°{{ order.idOrder }}</h5>
            <p class="card-text"><b>Effetuato il:</b> {{ order.orderDate }}</p>
            <p class="card-text"><b>Alle ore:</b> {{ order.orderTime }}</p>
            <p class="card-text"><b>Metodo di pagamento: </b> {{ formatTypePayment(order.typePayment) }}</p> 
            <p><b>Prezzo totale:</b> {{ order.totalPrice }} &euro;</p>
            <p><b>Stato Ordine:</b> {{ formatStatus(order.state) }}</p>
            <p><b>Articoli:</b></p>
            <ul v-for="article in order.articles">
              <li>
                <router-link :to="{name: 'article-detail', params:{idArticle: article.article.id}}" class="ms-3">
                  {{ article.article.name }}
                </router-link> 
                <span style="float: right;">  x {{ article.qtyOrdered }}</span>
              </li>
            </ul>
          </div>
      </div>  
        
    </div>

</template>

<style lang="scss" scoped>

.card-custom{
  width: 500px !important;
  background-color: beige;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

a{
  text-decoration: none;
  font-weight: bold;
  color: black;
}

</style>