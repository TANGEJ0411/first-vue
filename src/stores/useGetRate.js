import axios from "axios";
import { defineStore } from "pinia";
import { onMounted, reactive } from "vue";

//定義pinia兩個參數第一個是唯一命名string，後面是setup寫法
export const useGetRate = defineStore('exchangeRate', () => {
    const exchangeRateList = reactive([])
    //掛網域打API用cros
    const url = "https://openapi.taifex.com.tw/v1/DailyForeignExchangeRates";
    const cros = "https://cors-anywhere.herokuapp.com/";
    async function getExchangeRate() {
        const response = await axios.get(`${cros}${url}`, {
            headers: { "content-type": "application/json" },
        });
        console.log(response.data);
        response.data.forEach((rate) => exchangeRateList.push(rate));
    };
    //掛載時呼叫getExchangeRate
    onMounted(() => {
        getExchangeRate()
    })
    return { exchangeRateList }
})