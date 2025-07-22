<script setup>
defineProps({
  messages: {
    type: Array,
    required: true,
  },
  myUserId: {
    type: [Number, null], // null не тип, но можно использовать Function
    required: true,
    default: null,
  },
});

import { ref } from "vue";

const chatBox = ref(null);

// onUpdated(() => {
//   nextTick(() => {
//     chatBox.value.scrollTop = chatBox.value.scrollHeight;
//   });
// });
</script>

<template>
  <div class="messages" ref="chatBox">
    <div v-for="(msg, index) in messages" :key="msg.id">
      <div
        :class="{
          'text-right': msg.userId === myUserId,
          'text-left': msg.userId !== myUserId,
        }"
      >
        <div
          class="container"
          :class="{
            right: msg.userId === myUserId,
            left: msg.userId !== myUserId,
          }"
        >
          <template v-if="msg.userId === myUserId">
            <span class="message-text">{{ msg.messages }}</span>
            <span class="user-id">{{ msg.userId }}</span>
          </template>
          <template v-else>
            <span class="user-id">{{ msg.userId }}</span>
            <span class="message-text">{{ msg.messages }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.messages {
  height: 500px;
  max-width: 600px;
  overflow-y: auto;
  border: 1px solid #333;
  border-radius: 12px 12px 0 0;
  background: #232323;
  padding: 16px 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 16px;
  margin: 8px 0;
  border-radius: 16px;
  background: #2d2d2d;
  box-shadow: 0 10px 4px rgba(0, 0, 0, 0.12);
}

.right .container {
  background: linear-gradient(90deg, #7e57c2 0%, #42a5f5 100%);
  color: #fff;
  justify-content: flex-end;
  gap: 8px;
}

.left .container {
  background: #232323;
  color: #f3f3f3;
  gap: 8px;
  justify-content: flex-start;
}

.message-text {
  flex: 1;
  word-break: break-word;
  text-align: left;
  width: 70%;
}

.right .message-text {
  text-align: right;
  margin-right: 0;
}

.user-id {
  color: #b0b0b0;
  font-size: 0.9em;
}
</style>
