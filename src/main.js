import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Noir from "./components/presets/Noir";
import "./style.css";
import App from "./App.vue";
import { ToastService } from "primevue";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: "p",
      darkModeSelector: ".p-dark",
      cssLayer: false,
    },
  },
});
app.use(ToastService);
app.mount("#app");
