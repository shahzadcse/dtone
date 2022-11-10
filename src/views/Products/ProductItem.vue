<template>
  <tr>
    <td>
      <router-link
        class="event-link"
        :to="{
          name: 'ProductDetails',
          params: { id: singleProduct.id },
        }"
      >
        {{ singleProduct.name }}
      </router-link>
    </td>
    <td>{{ singleProduct.operator?.country?.name }}</td>
    <td>{{ singleProduct.operator?.name }}</td>
    <td>
      {{ singleProduct.destination?.amount }}
      {{ singleProduct.destination?.unit }}
    </td>
    <td>{{ singleProduct.type }}</td>
    <td>{{ singleProduct.description }}</td>
    <td>
      {{ benefits?.amount?.base }}

      {{ benefits?.unit }}
      {{ benefits?.type }}
    </td>
    <td>
      {{ singleProduct.validity?.quantity }} {{ singleProduct.validity?.unit }}
    </td>
    <td>{{ priceRoundTo }} {{ singleProduct?.source?.unit }}</td>
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
import type { Product } from "../../types/interfaces";
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

// start - fixing error TS2322: Type 'unknown' is not assignable to type 'Product'.
const props = defineProps<{
  product: unknown;
}>();

let singleProduct: Product;
singleProduct = props.product as Product;
// end - fixing error TS2322: Type 'unknown' is not assignable to type 'Product'.

const anyPromotion = computed(() => {
  return singleProduct.promotions !== null
    ? singleProduct.promotions
    : "No Promo";
});

const benefits = computed(() => {
  if (singleProduct.benefits != undefined) {
    let ben = singleProduct.benefits.map((el) => el);
    return ben[0];
  }
});
const priceRoundTo = computed(() => {
  if (singleProduct?.source?.amount) {
    let num: number = singleProduct?.source?.amount;
    return Math.round(num * 100) / 100;
  }
  return;
});

onMounted(() => {
  cartStore.loadCartInstance();
});

function addToCart() {
  cartStore.addToCart({ id: singleProduct.id, qty: 1 });
}
</script>

<style scoped>
.btn-cart {
  cursor: pointer;
}
</style>
