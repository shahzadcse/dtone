<template>
  <div class="login">
    <h1>Login</h1>
    <FormLogin />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import userStore from "../stores/user";
import FormLogin from "../components/FormLogin.vue";

export default defineComponent({
  name: "Login",
  components: { FormLogin },
  setup() {
    onMounted(userStore.getUser);
    return { userStore };
  },
});
</script>

<style>
.login {
  padding: 2rem;
  width: 400px;
  max-width: 95%;
  margin: 70px auto;
  box-shadow: 0px 35px 50px rgb(0 0 0 / 20%);
  border: 1px solid #d3d3d3;
  padding: 4rem 4rem;
  border-radius: 5px;
  background: #fefefe;
}
.login .form-inputs {
  padding-bottom: 10px;
}

.login .form-inputs label {
  padding-right: 10px;
}

.input {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  margin-top: 6px;
  border: 1px solid #ccc;
  height: 38px;
  border-radius: 4px;
  width: 100%;
}

.input > label {
  text-align: start;
}

.input > input {
  margin-top: 6px;
  height: 38px !important;
}

.btn-pers {
  position: relative;
  left: 50%;
  padding: 1em 2.5em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 700;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  transform: translateX(-50%);
}

.btn-pers:hover {
  background-color: #198754;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translate(-50%, -7px);
}

.btn-pers:active {
  transform: translate(-50%, -1px);
}

.alternative-option {
  text-align: center;
}

.alternative-option > span {
  color: #0d6efd;
  cursor: pointer;
}

#sign_out {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
