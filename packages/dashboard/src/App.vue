<template>
  <a-layout class="layout">
    <Header :re-fetch="getBots" title="主页" />
    <Main>
      <a-spin v-if="bots === null" />
      <NotFound :re-fetch="getBots" v-else-if="bots.length === 0" />
      <Grid v-else>
        <Card v-for="bot in bots" :title="bot.name" />
      </Grid>
    </Main>
    <Footer />
  </a-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Grid from './components/container/Grid.vue'
import Footer from './components/layout/Footer.vue'
import Header from './components/layout/Header.vue'
import Main from './components/layout/Main.vue'
import Card from './components/widget/Card.vue'
import { BASE_API } from './utils/const'
import { get } from './utils/fetch'
import NotFound from './components/widget/NotFound.vue'

const bots = ref<ISystemOverviewResponse[] | null>(null)

const getBots = async () => (bots.value = (await get(`${BASE_API}/bots`)) || [])

onMounted(async () => {
  await getBots()
})
</script>

<style scoped>
.layout {
  min-height: 100vh !important;
}

.result {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
