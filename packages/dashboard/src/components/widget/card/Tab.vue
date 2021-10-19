<template>
  <a-col>
    <a-card
      class="card"
      :tab-list="tabList"
      :active-tab-key="tabKey"
      @tabChange="(key:string) => (tabKey = key)"
      bodyStyle="padding: 1.5rem 1.5rem 1rem 1.5rem;"
    >
      <template #title>
        <a-typography-text type="secondary" class="title">
          {{ props.type }}
        </a-typography-text>
      </template>

      <a-descriptions
        :column="1"
        size="small"
        class="description"
        v-if="props.type === '网络' && tabContent"
      >
        <a-descriptions-item label="IPv4 地址">
          {{ (tabContent as NetworkData).ip4 }}
        </a-descriptions-item>
        <a-descriptions-item label="IPv6 地址">
          {{ (tabContent as NetworkData).ip6 }}
        </a-descriptions-item>
        <a-descriptions-item label="MAC 地址">
          {{ (tabContent as NetworkData).mac }}
        </a-descriptions-item>
      </a-descriptions>

      <a-descriptions
        :column="2"
        size="small"
        class="description"
        v-else-if="props.type === '文件系统' && tabContent"
      >
        <a-descriptions-item label="位置">
          {{ (tabContent as FileSystemData).mount }}
        </a-descriptions-item>
        <a-descriptions-item label="大小">
          {{ toSize('size') }}
        </a-descriptions-item>
        <a-descriptions-item label="已用">
          {{ toSize('used') }}
        </a-descriptions-item>
        <a-descriptions-item label="可用">
          {{ toSize('available') }}
        </a-descriptions-item>
        <a-descriptions-item label="使用率">
          {{ (tabContent as FileSystemData).use }}%
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </a-col>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import byteSize from 'byte-size'

const props = defineProps<{
  type: '网络' | '文件系统'
  data: NetworkData[] | FileSystemData[]
}>()

const tabList = props.data.map(d => {
  switch (props.type) {
    case '网络':
      return {
        key: (d as NetworkData).iface,
        tab: (d as NetworkData).iface,
      }
    case '文件系统':
      return {
        key: (d as FileSystemData).fs,
        tab: (d as FileSystemData).fs,
      }
  }
})

const tabKey = ref(tabList[0].key || '')

const tabContent = computed(() => {
  switch (props.type) {
    case '网络': {
      const data = props.data as NetworkData[]
      return data.find(d => d.iface === tabKey.value)
    }
    case '文件系统': {
      const data = props.data as FileSystemData[]
      return data.find(d => d.fs === tabKey.value)
    }
  }
})

const toSize = (key: keyof FileSystemData) => {
  return byteSize(Number((tabContent.value as FileSystemData)[key]))
}
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}

.title {
  font-size: 0.875rem;
}

.description table {
  width: auto !important;
}
</style>
