<template>
  <div class="table-wrapper">
    <div class="cart-container">
      <router-link to="/cart">
        <em>Go to Cart</em>
        <img
          alt="Cart"
          class="Cart"
          src="@/assets/cart.svg"
          width="32"
          height="32"
        /><span> {{ cartUpdate }} </span>
      </router-link>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Desination</th>
          <th>Operator</th>
          <th>Product Value</th>
          <th>Product Type</th>
          <th>Description</th>
          <th>Benefits</th>
          <th>Validity</th>
          <th>Price</th>
          <th>Promotion</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <ProductItem
          v-for="(product, index) in products"
          :product="product"
          :key="index"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import ProductItem from "./ProductItem.vue";

//const cartStore = useCartStore();
//console.log(cartStore);
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },

  components: {
    ProductItem,
  },

  computed: {
    cartUpdate() {
      //return displayCart.value.length;
    },
  },
};
</script>
<style scoped>
.cart-container {
  display: flex;
  flex-direction: row-reverse;
  position: relative;
}
.cart-container a {
  line-height: normal;

  margin: 0;
  height: 32px;
}
.cart-container span {
  position: absolute;
  top: 6px;
  right: 7px;
  font-weight: 600;
}
.cart-container em {
  position: absolute;
  font-size: 0.5rem;
  top: 0;
  right: 33px;
  text-align: right;
}
</style>
