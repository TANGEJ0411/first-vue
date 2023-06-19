<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";

const url = "https://openapi.taifex.com.tw/v1/DailyForeignExchangeRates";
const cros = "https://cors-anywhere.herokuapp.com/";

const exchangeRate = reactive([]);
const getExchangeRate = async () => {
  const response = await axios.get(`${cros}${url}`, {
    headers: { "content-type": "application/json" },
  });
  console.log(response.data);
  response.data.forEach((rate) => exchangeRate.push(rate));
};
onMounted(() => {
  getExchangeRate();
});
</script>

<template>
  <h1>近30日匯率</h1>
  <div v-for="rate in exchangeRate">
    <h3>日期:{{ rate.Date }}</h3>
    <ul>
      <li>美金兌台幣{{ rate["USD/NTD"] }}</li>
      <li>人民幣兌台幣{{ rate["RMD/NTD"] }}</li>
      <li>美金兌日幣{{ rate["USD/JPY"] }}</li>
    </ul>
  </div>
</template>
