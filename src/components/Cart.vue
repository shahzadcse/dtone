<template>
  <div class="cart-container">
    <div v-show="modalActive" class="modal-inner">
      <!-- Modal Content -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["modalActive"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    return { close };
  },
};
</script>

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(200, 200, 200, 0.7);
}
.modal-inner {
  position: relative;
  max-width: 800px;
  width: 80%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  padding: 32px 16px;
  z-index: 1;
}
i {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}
i:hover {
  color: crimson;
}
button {
  padding: 10px 15px;
  border: none;
  font-size: 16px;
  background-color: crimson;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
}
</style>
