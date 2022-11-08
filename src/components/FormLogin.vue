<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group my-2">
      <label>Username</label>
      <input
        v-model="form.username"
        class="form-control"
        placeholder="Username"
        required
      />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input
        v-model="form.password"
        class="form-control"
        type="password"
        placeholder="Password"
        required
      />
    </div>
    <div class="text-error">{{ userStore.state.error }}</div>
    <button class="button" type="submit">Login</button>
  </form>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import userStore from "../stores/user";
import router from "../router/index";
export default defineComponent({
  setup() {
    const form = reactive({
      username: "",
      password: "",
    });

    const onSubmit = () => {
      userStore.login(form.username, form.password);
    };

    return { form, userStore, onSubmit };
  },
});
</script>
<style scoped>
.form-control {
  margin: 10px 5px;
  height: 30px;
  width: 250px;
}
.text-error {
  margin-top: 10px;
  color: red;
}
</style>
