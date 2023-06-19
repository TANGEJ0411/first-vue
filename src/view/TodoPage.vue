<script setup>
import { reactive } from "vue";
import InputTodo from "../components/InputTodo.vue";
import DisplayList from "../components/DisplayList.vue";
import HelloWorld from "../components/HelloWorld.vue";
const todoList = reactive([]);
const handleSubmit = (todo) => {
  todoList.push(todo);
  console.log(todo, todoList);
};
const toggleCompleted = (id) => {
  todoList.forEach((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
      // console.log(todoList)
    }
  });
};
const deleteTodo = (id) => {
  todoList.forEach((todo, index) => {
    if (todo.id === id) {
      todoList.splice(index, 1);
    }
  });
};
</script>

<template>
  <InputTodo @todo-submitted="handleSubmit" />
  <DisplayList
    :todoList="todoList"
    @toogle-completed="toggleCompleted"
    @delete-todo="deleteTodo"
  />
  <HelloWorld />
</template>
