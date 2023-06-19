<script setup>
import { ref } from "vue";
import { useGetRate } from "../stores/useGetRate";
const rate = useGetRate();
let NTD = ref("");
const emit = defineEmits(["NTD-submitted"]);
const handleSubmit = () => {
  emit("NTD-submitted", NTD.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="NTD" />
    <input class="button" type="submit" value="Submit" />
  </form>
</template>
