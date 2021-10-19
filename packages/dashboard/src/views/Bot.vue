<template>
  <a-layout class="layout">
    <Header :title="id" :re-fetch="reFetch" />
    <Main>
      <a-spin v-if="!infos && !loads" :delay="300" />
      <NotFound
        v-else-if="loads?.length === 0"
        title="找不到这个客户端的数据"
        status="error"
      />
      <a-layout v-else class="nest-layout">
        <Grid v-if="infos" :wrap="true">
          <Info
            title="主机名"
            :content="infos.os.hostname"
            :suffix="infos.system.virtual ? '是虚拟机' : '不是虚拟机'"
          />
          <Info
            title="操作系统"
            :content="`${infos.os.distro}`"
            :suffix="`${infos.os.release} (${infos.os.arch})`"
          />
          <Info
            title="设备"
            :content="`${infos.system.model}`"
            :suffix="`${infos.system.manufacturer}`"
          />
          <Info
            title="CPU"
            :content="`${infos.cpu.manufacturer} ${infos.cpu.brand}`"
            :suffix="`${infos.cpu.speed}GHz | ${infos.cpu.physicalCores} 个核心 | ${infos.cpu.cores} 个逻辑处理器`"
          />
        </Grid>
        <Grid v-if="infos" :wrap="true">
          <Tab type="网络" :data="infos.network" />
          <Tab type="文件系统" :data="infos.disk" />
        </Grid>
      </a-layout>
    </Main>
    <Footer />
  </a-layout>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NotFound from '../components/widget/NotFound.vue'
import { BASE_API } from '../utils/const'
import { get } from '../utils/fetch'
import Info from '../components/widget/card/Info.vue'
import Tab from '../components/widget/card/Tab.vue'
import Grid from '../components/container/Grid.vue'

const route = useRoute()
const id = route.params.id
const infos = ref<ISystemInfo | null>(null)
const loads = ref<ISystemLoad[] | null>(null)

const getInfos = async () =>
  (infos.value = await get(`${BASE_API}/bot/${id}/info`))

const getLoads = async () =>
  (loads.value = await get(`${BASE_API}/bot/${id}/load`))

const reFetch = () =>
  Promise.all([getInfos(), getLoads()]).then(() =>
    message.success('已重新请求数据')
  )

onMounted(async () => {
  await getInfos()
  await getLoads()
})
</script>

<style scoped>
.layout {
  min-height: 100vh !important;
}

.nest-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
