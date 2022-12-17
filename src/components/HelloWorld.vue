<template>
    <div class="chat__form">
        <label for="name">User Name</label>
        <input id="name" v-model="name" name="name" />
        <label for="message">Message</label>
        <input id="message" v-model="newMessage" name="message" />
        <button @click="clickButton">Submit</button>
    </div>
    <div ref="chat_box" class="chat__messages">
        <div
            v-for="(message, index) in messages"
            :key="index"
            :class="{ message: true, mine: message.name === name }"
        >
            <span class="message__owner">{{ message.name + ': ' }}</span>
            <span>{{ message.message }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            messages: [],
            name: '',
            newMessage: '',
        };
    },
    sockets: {
        connect: function () {
            console.log('socket connected');
        },
        message: function (message: any) {
            this.displayName(message);
            this.$refs.chat_box.scrollTop = this.$refs.chat_box.scrollHeight;
        },
    },
    methods: {
        clickButton: function () {
            this.$socket.emit('sendMessage', this.newMessage, this.name);
        },
        displayName: function (message: any) {
            this.messages = this.messages.concat(message);
        },
    },
});
</script>

<style scoped lang="scss" src="./HelloWorld.scss" />
