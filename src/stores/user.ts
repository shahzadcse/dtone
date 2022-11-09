import { computed, reactive } from "vue";
import * as Request from "@/requests";
import router from "@/router/index";
import type { User } from "@/types/interfaces";

const state = reactive({
  username: "",
  password: "",
  flag: false,
  error: "",
});

const getters = reactive({
  isLoggedIn: computed(() => {
    state.flag;
  }),
});

const actions = {
  async getUser() {
    const user = await Request.getUser();
    if (user == null) return;
    state.username = user.username;
    state.password = user.password;
  },
  async login(username: string, password: string) {
    const user = await Request.login(username, password);

    if (user == null || user == undefined) {
      state.error = "Could not find user.";
      state.flag = false;
      return false;
    }
    state.username = user.username;
    state.password = user.password;
    state.flag = true;
    state.error = "";
    router.push({ path: "/balance" });
  },
  async logout() {
    state.password = "";
    state.username = "";
    state.flag = false;
  },
};

export default { state, getters, ...actions };
