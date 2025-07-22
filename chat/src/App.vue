<script setup>
import ChatWindow from "./components/ChatWindow.vue";
import ChatForm from "./components/ChatForm.vue";

import { ref, onMounted } from "vue";

const socket = new WebSocket("ws://localhost:8080");
const messages = ref([]);
const newMessage = ref("");
const myUserId = ref(null);

onMounted(() => {
  socket.addEventListener("message", async (event) => {
    const text =
      typeof event.data === "string" ? event.data : await event.data.text();
    try {
      const obj = JSON.parse(text);
      if (obj.type === "init") {
        myUserId.value = obj.userId;
      } else {
        messages.value.push(obj);
      }
    } catch (e) {
      console.error("Ошибка парсинга сообщения", e, text);
    }
  });
});

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(newMessage.value);
  } else {
    alert("Соединение с сервером потеряно. Попробуйте обновить страницу.");
  }
  newMessage.value = "";
};
</script>

<template>
  <div>
    <ChatWindow
      v-if="myUserId !== null"
      :messages="messages"
      :myUserId="myUserId"
    />
    <ChatForm v-model="newMessage" @send="sendMessage" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
