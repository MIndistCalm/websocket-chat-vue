<script setup>
import { ref, onMounted } from "vue";
defineProps(["modelValue"]);
defineEmits(["update:modelValue", "send"]);

const inputRef = ref(null);

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <form @submit.prevent="$emit('send')" class="chat-form">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target && $event.target.value)"
      type="text"
      ref="inputRef"
      placeholder="Введите сообщение"
    />
    <button type="submit">Отправить</button>
  </form>
</template>

<style scoped>
.chat-form {
  display: flex;
  gap: 10px;
  padding: 12px;
  background: #232323;
  border-top: 1px solid #333;
  border-radius: 0 0 12px 12px;
}

.chat-form input[type="text"] {
  flex: 1;
  padding: 10px 14px;
  border: 1.5px solid #444;
  border-radius: 20px;
  font-size: 1rem;
  outline: none;
  background: #181818;
  color: #f3f3f3;
  transition: border 0.2s;
}

.chat-form input[type="text"]:focus {
  border: 1.5px solid #7e57c2;
}

.chat-form button {
  padding: 10px 22px;
  border: none;
  border-radius: 20px;
  background: linear-gradient(90deg, #7e57c2 0%, #42a5f5 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(66, 165, 245, 0.08);
}

.chat-form button:hover {
  background: linear-gradient(90deg, #42a5f5 0%, #7e57c2 100%);
}
</style>
