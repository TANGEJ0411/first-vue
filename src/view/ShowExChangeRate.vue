<script setup>
import { storeToRefs } from "pinia";
import { useGetRate } from "../stores/useGetRate";

const exchangeRate = useGetRate();
const { exchangeRateList } = storeToRefs(exchangeRate);
</script>

<template>
  <h1>近30日匯率</h1>
  <div v-for="rate in exchangeRateList">
    <h3>日期:{{ rate.Date }}</h3>
    <ul>
      <li>美金兌台幣{{ rate["USD/NTD"] }}</li>
      <li>人民幣兌台幣{{ rate["RMB/NTD"] }}</li>
      <li>美金兌日幣{{ rate["USD/JPY"] }}</li>
    </ul>
  </div>
</template>
