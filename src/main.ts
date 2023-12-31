import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
// import "./style.css";
import router from "./router";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
