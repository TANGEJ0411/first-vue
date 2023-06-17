<script setup>
import { reactive } from "vue";
import InputTodo from "./InputTodo.vue";
import DisplayList from "./DisplayList.vue";
const todoList = reactive([]);
const handleSubmit = (todo) => {
  todoList.push(todo);
  console.log(todo, todoList);
};
</script>

<template>
  <InputTodo @todo-submitted="handleSubmit" />
  <DisplayList :todoList="todoList" />
</template>
