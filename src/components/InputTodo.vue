<script setup>
import { reactive } from "vue";
const todo = reactive({
  id: "",
  content: "",
  completed: false,
});
const emit = defineEmits(["todo-submitted"]);
const onSubmit = () => {
  emit("todo-submitted", { ...todo, id: Date.now() });
  todo.content = "";
};
</script>
<template>
  <form @submit.prevent="onSubmit">
    <input v-model="todo.content" />
    <input class="button" type="submit" value="Submit" />
  </form>
</template>
