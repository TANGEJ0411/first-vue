<script setup>
import { onMounted, reactive } from "vue";
const state = reactive({
  count: 0,
  apple: "apple",
});
const increment = () => {
  state.count++;
};
const showApple = () => {
  console.log(state.apple);
  state.apple = "banana";
};
onMounted(() => {
  console.log(`the component is now mounted.`);
});
</script>
<template>
  <p>{{ state.apple }}</p>
  <p>{{ state.count }}</p>
  <button @click="increment">add add</button>
  <button @click="showApple">print apple</button>
</template>
