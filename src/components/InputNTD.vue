<script setup>
import { ref } from "vue";
import { useGetRate } from "../stores/useGetRate";
const rate = useGetRate();
let NTD = ref("");
//定義emit使是見可以往上傳defineEmits有一個陣列參數，放自定義事件string
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
