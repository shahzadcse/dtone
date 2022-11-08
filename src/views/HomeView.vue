<script setup lang="ts"></script>
<template>
  <main>
    <h1>Products Range</h1>

    <ProductList v-if="!loading && !error" :products="products" />
    <!-- //Start of loading animation -->

    <div v-if="loading">
      <div class="pulse-loader"></div>
    </div>
    <!-- //End of loading animation -->
  </main>
</template>
<script>
import ProductList from "./Products/ProductList.vue";
const apiKey = import.meta.env.VITE_SECRET_KEY;
const apiKeyPass = import.meta.env.VITE_SECRET_PASSWORD;

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      products: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        // below line when api server is down
        //  const response = await fetch("../../data.json", {
        const response = await fetch("/v1/products", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + window.btoa(apiKey + ":" + apiKeyPass),
          },
        });
        //  console.log("response", response);
        const data = await response.json();
        // console.log(data);

        this.products = data.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          operator: product.operator,
          source: product.source,
          promotions: product.promotions,
          zone: product.availability_zones,
          benefits: product.benefits,
          destination: product.destination,
          rates: product.rates,
          prices: product.prices,
          regions: product.regions,
          service: product.service,
          type: product.type,
          validity: product.validity,
        }));
        console.log(this.products);
      } catch (error) {
        console.log(error);
      }

      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style>
@media (min-width: 1024px) {
  main {
    min-height: 100vh;
    align-items: center;
    padding: 2rem;
  }
}
</style>
