<template>
  <a-layout class="layout">
    <Header :re-fetch="reFetch" title="主页" />
    <Main>
      <a-spin v-if="bots === null" :delay="300" />
      <NotFound
        title="还没有已收集的客户端数据"
        :re-fetch="reFetch"
        v-else-if="bots.length === 0"
      />
      <Grid v-else>
        <BotCard v-for="bot in bots" :bot="bot" :key="bot.id" />
      </Grid>
    </Main>
    <Footer />
  </a-layout>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import Grid from '../components/container/Grid.vue'
import Footer from '../components/layout/Footer.vue'
import Header from '../components/layout/Header.vue'
import Main from '../components/layout/Main.vue'
import BotCard from '../components/widget/BotCard.vue'
import NotFound from '../components/widget/NotFound.vue'
import { BASE_API } from '../utils/const'
import { get } from '../utils/fetch'

const bots = ref<ISystemOverviewResponse[] | null>(null)

const getBots = async () => (bots.value = (await get(`${BASE_API}/bots`)) || [])
const reFetch = () => getBots().then(() => message.success('已重新请求数据'))

onMounted(async () => {
  await getBots()
})
</script>

<style scoped>
.layout {
  min-height: 100vh !important;
}
</style>
