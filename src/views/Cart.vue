<template>
  <div class="table-wrapper">
    <h1>Your Cart</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in displayCart" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.currency }} {{ item.price }}</td>
          <td>
            {{ item.qty }}
          </td>
          <td>
            <img
              @click="removeItem(item.id)"
              alt="Remove from the Cart"
              class="remove-icon"
              src="@/assets/delete.svg"
              width="24"
              height="24"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="checkout">
      <div class="total">Total {{ total }}</div>
      <button class="button" @click="toggleModal">Checkout</button>
    </div>
    <Modal @close="toggleModal" :modalActive="modalActive">
      <div class="modal-content">
        <h1>Checkout</h1>
        <div class="modal-grid">
          <div class="total">Total {{ total }}</div>
          <p>Forward to Payment gateways.</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from "../components/Modal.vue";
import { computed, onMounted } from "@vue/runtime-core";
import { useCartStore } from "../stores/cart";
import { storeToRefs } from "pinia";
import { DisplayCart } from "../types/interfaces";
import { ref } from "vue";
const cartStore = useCartStore();
const { cart, displayCart } = storeToRefs(cartStore);

onMounted(() => {
  cartStore.loadCartInstance();
  cartStore.displayCartLoad();
});
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
  return { modalActive, toggleModal };
};

const total = computed(() => {
  let currency = null;
  let sum = (displayCart.value as DisplayCart[]).reduce(
    (initialSum: number, item: DisplayCart) => {
      initialSum = initialSum + item.price * item.qty;
      currency = item.currency;
      return Number.parseFloat(initialSum).toFixed(2);
    },
    0
  );

  return `${currency} ${sum}`;
});

function removeItem(id: number) {
  cartStore.removeFromCart(id);
}
</script>
<style scoped>
.remove-icon {
  cursor: pointer;
}
.total {
  display: flex;
  align-items: right;
  justify-content: right;
  padding: 10px 30px;
  font-size: 1.2rem;
}
.checkout {
  display: flex;
  align-items: right;
  justify-content: right;
}
</style>
