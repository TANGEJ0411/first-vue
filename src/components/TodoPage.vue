<script setup>
import { reactive } from "vue";
import InputTodo from "./InputTodo.vue";
import DisplayList from "./DisplayList.vue";
const todoList = reactive([]);
const handleSubmit = (todo) => {
  todoList.push(todo);
  console.log(todo, todoList);
};
const toggleCompleted=(id)=>{
    todoList.forEach((todo)=>{
      if(todo.id === id){
        todo.completed= !todo.completed
        // console.log(todoList)
      }
    })
}
const deleteTodo=(id)=>{
    todoList.forEach((todo)=>{
      if(todo.id === id){
        todo.completed= !todo.completed
        // console.log(todoList)
      }
    })
}
</script>

<template>
  <InputTodo @todo-submitted="handleSubmit" />
  <DisplayList :todoList="todoList" @toogle-completed="toggleCompleted" @delete-todo=""/>
</template>
