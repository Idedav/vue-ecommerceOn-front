<script>
import { store } from '../data/store.js';
import axios from 'axios';
import Loader from '../components/Loader.vue';

export default {
  name : 'Orders',
  components: {
    Loader
    },
  data(){
    return{
      store,
      orders: {},
      isLoaded : false
    }
  },
  methods:{

    getOrders(){

      axios.get(store.apiUrl + 'orders/' + store.user.idUser)
      .then(res =>{
        this.orders = res.data;
        console.log(res.data);
        this.isLoaded = true;
      })

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
  created() {

    if(!store.isLogged){
      this.$router.push("/login")
    }

  },
  mounted(){
    this.getOrders();
  }
}

</script>

<template>

<div v-if="!isLoaded">
  <Loader />
</div>

<div v-else class="container">

    <h2 class="text-center mb-5">I tuoi ordini</h2>

    <div class="d-flex flex-wrap justify-content-center">

      <div v-for="order in orders" class="card mx-4 card-custom mb-4" style="width: 18rem;">
        <router-link :to="{name: 'order-detail', params:{idOrder: order.idOrder}}" class="card-body">
          <h5 class="card-title mb-3">Ordine n° {{ order.idOrder }}</h5>
          <p class="card-text"><b>Effetuato il:</b> {{ order.orderDate }}</p>
          <p class="card-text"><b>Alle ore:</b> {{ order.orderTime }}</p>
          <p class="card-text"><b>Metodo di pagamento: </b> {{ formatTypePayment(order.typePayment) }}</p> 
          <p><b>Prezzo totale:</b> {{ order.totalPrice }} &euro;</p>
          <p><b>Stato Ordine:</b> {{ formatStatus(order.state) }}</p>
        </router-link> 
      </div>

    </div>
  
</div>

</template>

<style lang="scss" scoped>

.card-custom{
  background-color: beige;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  .btn-custom{
    background-color: beige;
  }
}

img{
  width: 30px;
}

a{
  text-decoration: none;
}

</style>