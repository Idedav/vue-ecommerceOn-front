<script>
import { store } from '../data/store.js';
import axios from 'axios';
import Loader from '../components/Loader.vue';

export default {
  name : 'CheckOut',
  components: {
    Loader
    },
  data(){
    return {
      store,
      cart: {},
      isLoaded: false,
      isError: false,
      typePayment:""
    }
  },
  methods:{
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
    addOrder(){
        if(this.typePayment == ""){
            this.isError = true;

            setTimeout(() => {
                this.isError = false;
            }, 2000);

        }else{

            axios.post(store.apiUrl + 'add-order',{
                idCart: this.cart.cartId,
                typePayment: this.typePayment,
            })
            .then(res => {
                console.log(res.data);
                this.$router.push("/orders")
            })

        }
    }
  },
  created() {

    if(!store.isLogged){
    this.$router.push("/login")
    }

  },
  mounted(){
    this.getCart();
  }
}

</script>

<template>

    <div v-if="!isLoaded">
        <Loader />
    </div>

    <div v-else>

        <h2 class="mb-5">Riepilogo ordine</h2>

        <div class="container-table">
            <table class="table table-light">
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Quantità ordinata</th>
                    <th scope="col">Prezzo</th>
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
                    </tr>
                </tbody>
            </table>
        </div>
  
    <div class="d-flex justify-content-end">
        <div class="d-flex justify-content-end">
          <p><b>Totale: {{ cart.totalPrice }} &euro;</b></p>
        </div>
    </div>  
    
    <form @submit.prevent="addOrder" class="d-flex justify-content-end">


        <select v-model="typePayment" class="form-select select-custom" aria-label="Default select example">
            <option value="" selected>Metodo di pagamento</option>
            <option value="CREDIT_CARD">Carta di credito</option>
            <option value="DEBIT_CARD">Carta di debito</option>
            <option value="PAYPAL">Paypal</option>
        </select>

        <button type="submit" class="btn btn-warning ms-3">Paga</button>

    </form>

    <div class="error-message" role="alert">
       <p  v-if="isError">Selezionare un metodo di pagamento</p>
    </div>

    </div>

</template>

<style lang="scss" scoped>

.container-table{
  width: 800px;
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

.select-custom{
    max-width: 225px;
}

.error-message{
    margin-top: 5px;
    color: red;
    text-align: end;
    height: 30px;
}

</style>