<template>
  <a-layout-header class="header">
    <a-space align="center">
      <a-typography-title class="title">Node Montior</a-typography-title>
      <a-divider type="vertical" />
      <a-typography-text class="title" v-if="{ title }" type="secondary">
        {{ props.title }}
      </a-typography-text>
    </a-space>

    <a-space align="center" size="middle">
      <a-tooltip>
        <template #title>搜索客户端</template>
        <a-button shape="circle" size="large">
          <template #icon><SearchOutlined /></template>
        </a-button>
      </a-tooltip>

      <a-tooltip>
        <template #title>重新获取数据</template>
        <a-button shape="circle" size="large" @click="props.reFetch()">
          <template #icon><SyncOutlined /></template>
        </a-button>
      </a-tooltip>

      <a-tooltip>
        <template #title>代码仓库</template>
        <a-button
          shape="circle"
          size="large"
          href="https://119.3.208.164/LFN/node-monitor"
          target="_blank"
        >
          <template #icon><HomeOutlined /></template>
        </a-button>
      </a-tooltip>
    </a-space>
  </a-layout-header>
</template>

<script setup lang="ts">
import {
  HomeOutlined,
  SearchOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue'

const props = defineProps<{
  title?: string
  reFetch: () => void
}>()
</script>

<style scoped>
.header {
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f2f5;
  line-height: unset;
}

.title {
  margin: 1rem 0;
  padding: 1rem 0;
  font-size: 1.125rem;
}
</style>
