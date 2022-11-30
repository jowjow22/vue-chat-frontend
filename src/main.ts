import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import VueSocketIO from "vue-3-socket.io";

const socket = new VueSocketIO({
  debug: true,
  connection: "http://localhost:8000",
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_",
  },
});

createApp(App).provide("$socket", socket).use(store).use(socket).mount("#app");
