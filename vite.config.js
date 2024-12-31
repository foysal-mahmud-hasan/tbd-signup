import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "https://demo.poskeeper.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/flutter-api"),
      },
      "/shop-api": {
        target: "https://demo.poskeeper.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/shop-api/, ""),
      },
    },
  },
});
