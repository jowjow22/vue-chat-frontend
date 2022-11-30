<template>
      <form @submit.prevent="submit" class="chat__form">
      <label for="name">User Name</label>
      <input name="name" id="name" v-model="name" />
      <label for="message">Message</label>
      <input name="message" id="message" v-model="newMessage" />
      <button @click="clickButton">Submit</button>
    </form>
    <div class="chat__messages">
      <div :class="{'message': true, 'mine':message.name === name}" v-for="(message, index) in messages" :key="index">
        <span class="message__owner">{{ message.name + ": " }}</span>
        <span>{{ message.message }}</span>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      messages: [],
      name: "",
      newMessage: "",
    };
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    message: function (message: any) {
      this.displayName(message);
    },
  },
  methods: {
    clickButton: function () {
      this.$socket.emit("sendMessage", this.newMessage, this.name);
    },
    displayName: function (message: any) {
      this.messages = this.messages.concat(message);
    },
  },
});
</script>

<style scoped lang="scss" src="./HelloWorld.scss" />
