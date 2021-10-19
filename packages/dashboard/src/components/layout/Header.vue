<template>
  <a-layout-header class="header">
    <a-space align="center">
      <router-link to="/">
        <a-typography-title class="title"> Node Monitor </a-typography-title>
      </router-link>
      <a-divider type="vertical" />
      <a-typography-text class="subtitle" v-if="{ title }" type="secondary">
        {{ props.title }}
      </a-typography-text>
    </a-space>

    <a-space align="center" size="large">
      <a-tooltip v-if="props.reFetch">
        <template #title>重新获取数据</template>
        <a-button
          shape="circle"
          size="large"
          @click="props.reFetch?.()"
          class="icon"
        >
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
          class="icon"
        >
          <template #icon><BugOutlined /></template>
        </a-button>
      </a-tooltip>
    </a-space>
  </a-layout-header>
</template>

<script setup lang="ts">
import { BugOutlined, SyncOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  title?: string
  reFetch?: () => void
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
  margin: 1.25rem 0;
  padding: 1rem 0;
  font-size: 1.125rem;
}

.subtitle {
  font-size: 1rem;
  padding: 0.5rem 0;
  vertical-align: text-top;
}

.icon {
  border: none;
}
</style>
