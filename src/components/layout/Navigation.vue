<script setup>
import { PAGES } from '../../constants/Pages'
import JiraIcon from '@/components/icon/JiraIcon.vue';
import AppPadIcon from '@/components/icon/AppPadIcon.vue'
</script>

<template>
  <div class="navigation">
    <div class="container">
      <div class="logo-container">
        <div class="logo"><AppPadIcon /></div>
        <div class="logo"><JiraIcon /></div>
        <div class="logo-text">Jira Software</div>
      </div>
      <div class="page-link-container">
        <router-link v-for="(page, index) in PAGES" :key="index" :to="{ name: page.name }" class="page-link">
          <div class="page-name">
            <p>{{ page.title }}</p>
          </div>
        </router-link>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>

.navigation {
  display: flex;
  width: 100%;
  height: 56px;
  background-color: $surface01;
  .container {
    display: flex;
    align-items: center;
    .logo-container {
      margin-right: 50px;
      margin-left: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      .logo {
        font-size: 24px;
      }
      .logo-text {
        font-size: 20px;
        color: $text01;
        margin-left: 20px;
      }
    }
    .page-link-container {
      display: flex;
      align-items: center;
      .page-link {
        text-decoration: none;
        background-color: $surface01;
        color: $text01;
        padding: 0 10px;
        .page-name {
          p {
            font-weight: 600;
          }
        }
      }
    }

  }
}
</style>
