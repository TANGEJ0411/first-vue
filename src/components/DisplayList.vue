<script setup>
defineProps({
  todoList: Array,
  default() {
      return [];
    },
});
const emit = defineEmits(["toogle-completed"])
const handleCompleted = (id)=>{
    emit("toogle-completed",id)
}
const handleDelete = (id) =>{
  emit("delete-todo",id)
}
</script>
<template>
  <ul>
    <li v-for="todo in todoList" v-bind:key="todo.id">
      {{ todo.content }}
      <button @click="handleCompleted(todo.id)" v-if="!todo.completed">未完成</button>
      <button @click="handleCompleted(todo.id)" v-else>完成</button>
      <button @click="handleDelete(todo.id)">刪除</button>
    </li>
  </ul>
</template>
