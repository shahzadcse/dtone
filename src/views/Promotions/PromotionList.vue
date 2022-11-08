<template>
  <div class="promo-wrapper">
    <PromoItem v-for="(promo, index) in promos" :key="index" :promo="promo" />
  </div>
</template>

<script>
import PromoItem from "./PromoItem.vue";
export default {
  props: {
    promos: {
      type: Array,
      required: true,
    },
  },
  components: {
    PromoItem,
  },
};
</script>
