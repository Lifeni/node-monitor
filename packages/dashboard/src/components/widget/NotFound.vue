<template>
  <a-result class="result" title="还没有已收集的客户端数据">
    <template #extra>
      <a-button key="reFetch" type="primary" @click="props.reFetch()">
        重新获取数据
      </a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
const props = defineProps<{
  reFetch: () => void
}>()
</script>
