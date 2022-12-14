import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import SocketIO from "socket.io-client";
import VueSocketIO from "vue-3-socket.io";

const socketConnection = SocketIO("https://vue-chat-io-server.herokuapp.com/");

const socket = new VueSocketIO({
  debug: true,
  connection: socketConnection,
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_",
  },
});

createApp(App).provide("$socket", socket).use(store).use(socket).mount("#app");
