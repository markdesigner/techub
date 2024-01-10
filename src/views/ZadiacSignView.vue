<script setup>
import { ref } from 'vue'
import { zodiacList } from '@/constants/ZodiacList'

let date = ref(new Date())
let signName = ref('')
const checkSign = () => {
  console.log('checkSign', checkSign)

  const dates = new Date(date.value)
  const timestamp = dates.getTime()
  for (let sign of zodiacList) {
    const startTimestamp = new Date(sign.duration.start).getTime()
    const endTimestamp = new Date(sign.duration.end).getTime()
    console.log(timestamp, startTimestamp, endTimestamp, 'aaa')

    if (timestamp >= startTimestamp && timestamp <= endTimestamp) {
      signName.value = sign.chineseName
      return
    } else {
      signName.value = '博愛座'
      return
    }
  }
}

// watchEffect(() => { console.log(123123);
//   if(date.value) {
//     checkSign();
//   }
// })
</script>

<template>
  <div class="zadiac-sign">
    <div class="input-container">
      <label for="date">生日: </label>
      <input type="date" name="date" v-model="date" />
    </div>
    <div class="answer-container">
      <div class="title">你的星座</div>
      <div class="sign">{{ signName }}</div>
    </div>
    <button @click="checkSign">查詢</button>
  </div>
</template>

<style lang="scss" scoped>
.swiper .swiper-wrapper {
  height: 100vh;
  width: 100%;
}
</style>
