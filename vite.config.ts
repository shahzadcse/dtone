import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/v1/products": "https://preprod-dvs-api.dtone.com/",
      "/v1/promotions": "https://preprod-dvs-api.dtone.com/",
      "/v1/promotions/:id": "https://preprod-dvs-api.dtone.com/",
      "/v1/balances": "https://preprod-dvs-api.dtone.com/",
    },
  },
});
