<script setup lang="ts"></script>
<template>
  <main>
    <h1>Promotions</h1>

    <PromotionList v-if="!loading && !error" :promos="promos" />
    <!-- //Start of loading animation -->

    <div v-if="loading">
      <div class="pulse-loader"></div>
    </div>
    <!-- //End of loading animation -->
  </main>
</template>
<script lang="ts">
import PromotionList from "./PromotionList.vue";
const apiKey = import.meta.env.VITE_SECRET_KEY;
const apiKeyPass = import.meta.env.VITE_SECRET_PASSWORD;

export default {
  components: {
    PromotionList,
  },
  data() {
    return {
      promos: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(
          "https://preprod-dvs-api.dtone.com/v1/promotions",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + window.btoa(apiKey + ":" + apiKeyPass),
            },
          }
        );
        console.log("response", response);
        const data = await response.json();
        console.log(data);
        this.promos = data.map((promo: any) => ({
          id: promo.id,
          title: promo.title,
          name: promo.name,
          description: promo.description,
          operator: promo.operator,
          start_date: promo.start_date,
          end_date: promo.end_date,
          products: promo.products,
          terms: promo.terms,
        }));
        console.log(this.promos);
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
