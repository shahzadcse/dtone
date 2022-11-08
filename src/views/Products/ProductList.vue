<template>
  <div class="table-wrapper">
    <div class="cart-container">
      <router-link to="/cart">
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
          :key="index"
          :product="product"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";

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
      let sum = 0;
      if (localStorage.cart) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart.products.map((el) => {
          sum = sum + el.qty;
        });
      }
      return sum;
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
</style>
