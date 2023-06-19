<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- <HelloWorld msg="Vite 加上 Vue" /> -->
  <!-- <MyFirstComp /> -->
  <RouterLink to="/">todo list</RouterLink>
  <RouterLink to="/exchangeRate">exchange rate</RouterLink>
  <RouterView />
</template>

<style scoped></style>
