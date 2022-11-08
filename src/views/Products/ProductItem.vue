<template>
  <tr>
    <td>
      <router-link
        class="event-link"
        :to="{
          name: 'ProductDetails',
          params: { id: product.id },
        }"
      >
        {{ product.name }}
      </router-link>
    </td>
    <td>{{ product.operator?.country?.name }}</td>
    <td>{{ product.operator?.name }}</td>
    <td>{{ product.destination?.amount }} {{ product.destination?.unit }}</td>
    <td>{{ product.type }}</td>
    <td>{{ product.description }}</td>
    <td>
      {{ product.benefits[0].amount.base }} {{ product.benefits[0].unit }}
      {{ product.benefits[0].type }}
    </td>
    <td>{{ product.validity?.quantity }} {{ product.validity?.unit }}</td>
    <td>{{ priceRoundTo }} {{ product.source.unit }}</td>
    <td>{{ anyPromotion }}</td>
    <td>
      <img
        @click="addToCart"
        alt="Add to Cart"
        title="Add to Cart"
        class="btn-cart"
        src="@/assets/cart.svg"
        width="16"
        height="16"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useCartStore } from "../../stores/cart";
import { storeToRefs } from "pinia";

interface Product {
  name: string;
  currency: string;
  price: string;
  id: number;
}
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

// export default {
//   props: {
//     products: {
//       type: Array,
//       required: true,
//     },
//   },

//   methods: {
//     addToCart() {
//       cartStore.addToCart({ id: props.product.id, qty: 1 });
//     },
//   },
//   computed: {
//     priceRoundTo() {
//       let num = props.product?.source?.amount;
//       return Math.round(num * 100) / 100;
//     },
//     anyPromotion() {
//       return this.product.promotions !== null
//         ? this.product.promotions
//         : "No Promo";
//     },
//   },
//   mounted() {
//     cartStore.loadCartInstance();
//   },
// };

const props = defineProps<{
  product: Product;
}>();

const anyPromotion = computed(() => {
  return props.product.promotions !== null
    ? props.product.promotions
    : "No Promo";
});

const priceRoundTo = computed(() => {
  let num = props.product?.source?.amount;

  return Math.round(num * 100) / 100;
});

onMounted(() => {
  cartStore.loadCartInstance();
});

function addToCart() {
  cartStore.addToCart({ id: props.product.id, qty: 1 });
}
</script>

<style scoped>
.btn-cart {
  cursor: pointer;
}
</style>
