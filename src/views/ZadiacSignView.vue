<script setup>
import { ref } from 'vue'
import zodiacList from '@/constants/ZodiacList'

let date = ref(new Date())
let signName = ref('')
const checkSign = () => {
  const { timestamp, month, day } = convertSelectorTimeToSameYearTimestamp(date)
  for (let sign of zodiacList) {
    const { startTimestamp, endTimestamp } = convertToSameYearTimestamp(sign)
    if(month === '01' && Number(day) <= 19) {
      const sign =  zodiacList.find(sign => sign.name === 'Capricorn');
      signName.value = sign.chineseName
      return 
    }
    if (timestamp >= startTimestamp && timestamp <= endTimestamp) {
      signName.value = sign.chineseName
      return
    }
  }
}

const convertToSameYearTimestamp = (sign) => {
  const startTimeString = `2023-${sign.duration.start.month}-${sign.duration.start.date}T00:00:00`
  const endTimeString =
    sign.name === 'Capricorn'
      ? `2024-${sign.duration.end.month}-${sign.duration.end.date}T00:00:00`
      : `2023-${sign.duration.end.month}-${sign.duration.end.date}T00:00:00`
  const startTimestamp = new Date(startTimeString).getTime()
  const endTimestamp = new Date(endTimeString).getTime()
  return { startTimestamp, endTimestamp }
}

const convertSelectorTimeToSameYearTimestamp = (selectTime) => {
  const date = new Date(selectTime.value)
  const month = `00${date.getUTCMonth() + 1}`.substr(-2)
  const day = `00${date.getUTCDate()}`.substr(-2)
  const timeString = `2023-${month}-${day}T00:00:00`
  console.log(timeString,'timeString')
  const timestamp = new Date(timeString).getTime()
  console.log(timestamp,'user impiut')
  return { timestamp, month, day }
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
