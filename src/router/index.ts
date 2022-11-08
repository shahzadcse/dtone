import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import user from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/promotions",
      name: "Promotions",
      component: () => import("../views/Promotions/Promotion.vue"),
    },

    {
      path: "/balance",
      name: "balance",
      component: function () {
        return import("../views/Balance/Balance.vue");
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: function () {
        return import("../views/Login.vue");
      },
    },
    {
      path: "/cart",
      name: "Cart",
      component: function () {
        return import("../views/Cart.vue");
      },
    },
    {
      path: "/ProductDetails/:id",
      name: "ProductDetails",
      component: function () {
        return import("../views/Products/ProductDetails.vue");
      },
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!user.state.flag) {
      return {
        path: "/login",
      };
    }
  }
});

export default router;
