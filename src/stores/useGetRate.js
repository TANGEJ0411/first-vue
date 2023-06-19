import axios from "axios";
import { defineStore } from "pinia";
import { onMounted, reactive } from "vue";

export const useGetRate = defineStore('exchangeRate', () => {
    const exchangeRateList = reactive([])

    const url = "https://openapi.taifex.com.tw/v1/DailyForeignExchangeRates";
    const cros = "https://cors-anywhere.herokuapp.com/";
    async function getExchangeRate() {
        const response = await axios.get(`${cros}${url}`, {
            headers: { "content-type": "application/json" },
        });
        console.log(response.data);
        response.data.forEach((rate) => exchangeRateList.push(rate));
    };
    onMounted(() => {
        getExchangeRate()
    })
    return { exchangeRateList }
})