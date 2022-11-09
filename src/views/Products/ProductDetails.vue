<template>
  <div class="product-wrapper">
    <h1>{{ product?.name }}</h1>
    <div class="card-item">
      <strong>Description</strong>
      <p>{{ product?.description }}</p>
    </div>
    <div class="card-item">
      <strong>Zone</strong>
      <p>{{ product?.availability_zones[0] }}</p>
    </div>
    <div class="card-item">
      <strong>benefits</strong>
      <p>
        {{ product?.benefits[0].amount.base }} {{ product?.benefits[0].unit }}
        {{ product?.benefits[0].type }}
      </p>
    </div>
    <div class="card-item">
      <strong>Desination</strong>
      <p>
        {{ product?.operator?.country?.name }}
      </p>
    </div>
    <div class="card-item">
      <strong>Operator</strong>
      <p>
        {{ product?.operator?.name }}
      </p>
    </div>
    <div class="card-item">
      <strong>Product Value </strong>
      <p>{{ product?.destination?.amount }} {{ product?.destination?.unit }}</p>
    </div>
    <div class="card-item">
      <strong>Product Type </strong>
      <p>{{ product?.type }}</p>
    </div>
    <div class="card-item">
      <strong>Product Rates </strong>
      <p>{{ priceRoundTo }} {{ product?.source.unit }}</p>
    </div>
    <div class="card-item">
      <strong>service</strong>
      <p>{{ product?.service?.name }}</p>
    </div>
    <div class="card-item">
      <strong>validity</strong>
      <p>{{ product?.validity.quantity }} {{ product?.validity.unit }}</p>
    </div>
    <br />
    <router-link class="button" @click="addToCart" to="/cart"
      >Add to cart</router-link
    >
  </div>
</template>
<script>
import { useCartStore } from "../../stores/cart";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const apiKey = import.meta.env.VITE_SECRET_KEY;
const apiKeyPass = import.meta.env.VITE_SECRET_PASSWORD;

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      product: null,
      error: null,
    };
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  methods: {
    async fetchData() {
      this.error = this.product = null;
      this.loading = true;
      try {
        const response = await fetch(`/v1/products/${this.$route.params.id}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + window.btoa(apiKey + ":" + apiKeyPass),
          },
        });

        const data = await response.json();
        this.product = data;
      } catch (error) {
        console.log(error);
      }

      this.loading = false;
    },
    addToCart() {
      cartStore.addToCart({ id: this.product.id, qty: 1 });
    },
  },
  mounted() {
    this.fetchData();
    cartStore.loadCartInstance();
  },
  computed: {
    priceRoundTo() {
      let num = this.product?.rates?.base;
      return Math.round(num * 100) / 100;
    },
    anyPromotion() {
      return this.product?.promotions !== null
        ? this.product.promotions
        : "No Promo";
    },
  },
};
</script>
<style scoped>
.product-wrapper {
  margin: 30px 70px 70px;
  padding: 20px;
  box-shadow: 0px 35px 50px rgb(0 0 0 / 20%);
}
</style>
