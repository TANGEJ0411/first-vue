import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  // 這邊也可以建立非同步打API的function去更改上面所定義的嚮應式變數

  return { count, name, doubleCount, increment };
});

