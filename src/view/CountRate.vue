<script setup>
import { reactive } from "vue";
import InputNTD from "../components/InputNTD.vue";
import { useGetRate } from "../stores/useGetRate";
//拿到匯率表的hook
const rate = useGetRate();

let lastestRate = null;
//定義響應式物件
const allRate = reactive({
  USD: "",
  RMB: "",
  JYP: "",
  EUR: "",
  HKD: "",
});
const calcRate = (NTD) => {
  //指定最近一天的匯率
  lastestRate = rate.exchangeRateList[rate.exchangeRateList.length - 1];
  //計算匯率，是否改成switch?
  allRate.USD = (NTD / lastestRate["USD/NTD"]).toFixed(2);
  allRate.RMB = (NTD / lastestRate["RMB/NTD"]).toFixed(2);
  allRate.JYP = (
    (NTD / lastestRate["USD/NTD"]) *
    lastestRate["USD/JPY"]
  ).toFixed(2);
  allRate.EUR = (NTD / lastestRate["USD/NTD"] / lastestRate["EUR/USD"]).toFixed(
    2
  );
  allRate.HKD = (
    (NTD / lastestRate["USD/NTD"]) *
    lastestRate["EUR/USD"]
  ).toFixed(2);
};
</script>

<template>
  <InputNTD @NTD-submitted="calcRate" />
  <ul>
    <li>美元USD:{{ allRate.USD }}</li>
    <li>人民幣RMB:{{ allRate.RMB }}</li>
    <li>日幣JYP:{{ allRate.JYP }}</li>
    <li>歐元EUR:{{ allRate.EUR }}</li>
    <li>港幣HKD:{{ allRate.HKD }}</li>
  </ul>
</template>
