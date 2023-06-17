<script setup>
defineProps({
  todoList: Array,
});
</script>
<template>
  <ul>
    <li v-for="todo in todoList" v-bind:key="todo.id">
      {{ todo.content }}
      <button>完成</button>
      <button>刪除</button>
    </li>
  </ul>
</template>
