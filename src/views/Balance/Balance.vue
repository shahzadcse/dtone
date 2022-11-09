<script setup lang="ts"></script>
<template>
  <main>
    <h1>Balance</h1>

    <div class="balance-container" v-if="!loading && !error">
      <h3>
        Available Balance :
        <span>
          {{ balanceRoundTo }}
        </span>
      </h3>
      <p>with {{ balances[0]["holding"] }} Holding</p>
      <p>with {{ balances[0]["credit_limit"] }} Credit Limit</p>
    </div>
    <!-- //Start of loading animation -->

    <div v-if="loading">
      <div class="pulse-loader"></div>
    </div>
    <!-- //End of loading animation -->
  </main>
</template>
<script lang="ts">
import type { Balances } from "../../types/interfaces";
const apiKey = import.meta.env.VITE_SECRET_KEY;
const apiKeyPass = import.meta.env.VITE_SECRET_PASSWORD;

export default {
  data() {
    return {
      balances: [],
      loading: true,
      error: null,
    };
  },
  computed: {
    balanceRoundTo() {
      let num = this.balances[0]["available"];
      return Math.round(num * 100) / 100 + " " + this.balances[0]["unit"];
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("/v1/balances", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + window.btoa(apiKey + ":" + apiKeyPass),
          },
        });
        console.log("response", response);
        const data = await response.json();

        (this.balances as Balances[]) = data.map((balance: any) => ({
          id: balance.id,
          available: balance.available,
          holding: balance.holding,
          unit: balance.unit,
          credit_limit: balance.credit_limit,
        }));
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
.balance-container h3 span {
  font-size: 4rem;
  color: #42b883;
  display: flex;
}
</style>
