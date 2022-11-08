<template>
  <div class="card">
    <PromoSummary :promo="promo" />
    <a href="#" @click="toggleModal" class="card-link">More Details</a>
    <Modal @close="toggleModal" :modalActive="modalActive">
      <div class="modal-content">
        <h1>{{ promo.title }}</h1>
        <div class="modal-grid">
          <PromoSummary :promo="promo" />
          <h3>Terms & Conditions</h3>
          <p class="terms">{{ promo.terms }}</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "../../components/Modal.vue";
import PromoSummary from "./PromoSummary.vue";
import { ref } from "vue";
export default {
  props: {
    promo: {
      type: Object,
      required: true,
    },
  },
  components: {
    Modal,
    PromoSummary,
  },
  setup() {
    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    return { modalActive, toggleModal };
  },
};
</script>
<style scoped>
.terms {
  font-size: 10px;
  padding: 5px;
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;
}
</style>
