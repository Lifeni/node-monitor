<template>
  <a-layout class="layout">
    <Header :title="route.params.id" />
    <Main>
      <NotFound title="找不到这个客户端的数据" status="error" />
    </Main>
    <Footer />
  </a-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import NotFound from '../components/widget/NotFound.vue'

const route = useRoute()
</script>

<style scoped>
.layout {
  min-height: 100vh !important;
}
</style>
