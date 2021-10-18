<template>
  <a-result class="result" :title="props.title" :status="props.status">
    <template #extra>
      <a-button
        v-if="props.reFetch"
        key="reFetch"
        type="primary"
        @click="props.reFetch?.()"
      >
        重新获取数据
      </a-button>
      <router-link v-else to="/">
        <a-button type="primary"> 回到主页 </a-button>
      </router-link>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { ResultProps } from 'ant-design-vue'

const props = defineProps<{
  title?: string
  status?: ResultProps['status']
  reFetch?: () => void
}>()
</script>

<style scoped>
.result {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
