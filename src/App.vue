<template>
  <header>
    <div class="logo-container">
      <router-link to="/" class="logo"
        ><img alt="Vue logo" src="@/assets/logo.svg" width="75" height="75" />
        <span> MegaSoft Inc.</span></router-link
      >
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/promotions">Promotions</router-link>
      <router-link v-if="isAuthenticated" to="/balance">Balance</router-link>
      <router-link
        v-if="isAuthenticated"
        to="/login"
        v-on:click="logout"
        replace
        >Logout
      </router-link>
      <router-link v-else to="/login">Login</router-link>
    </nav>
  </header>
  <router-view :key="$route.path" />
</template>
<script>
import userStore from "./stores/user";

export default {
  name: "App",
  computed: {
    isAuthenticated() {
      return userStore.state.flag;
    },
  },
  methods: {
    logout() {
      userStore.state.flag = false;
      this.authenticated = false;
      return;
    },
  },
};
</script>
