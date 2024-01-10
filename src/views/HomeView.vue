<script setup>
import { useCounterStore } from '../stores/counter';
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore();
let { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore
</script>

<template>
  <div class="home">
    home
  </div>
</template>

<style lang="scss" scoped>
.home {
  .image {
    width: 100%;
  }
}
</style>
