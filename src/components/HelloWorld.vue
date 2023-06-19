<script setup>
import { useCounterStore } from "../stores/useCountStore.js";
import { storeToRefs } from "pinia";
const store = useCounterStore();
const { count, name, doubleCount } = storeToRefs(store);
const { increment } = store;
</script>

<template>
  <button type="button" @click="increment">按我</button>
  <p>count is {{ count }} name is {{ name }} double is {{ doubleCount }}</p>
</template>

<style scoped></style>
