<script setup>
import { useCounterStore } from '../stores/counter';
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore();
let { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore
</script>

<template>
  <div class="home">
    <h1>home</h1>
    <p>{{ count }}</p>
    <p>{{ doubleCount }}</p>
    <button @click="increment">add</button>
  </div>
</template>

<style lang="scss" scoped>
.sss {
  color: red;
}
</style>
