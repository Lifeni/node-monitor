<template>
  <a-col style="flex: 1">
    <a-card class="card" bodyStyle="padding: 1.25rem 1.5rem 1.125rem 1.5rem;">
      <template #title>
        <a-typography-text type="secondary" class="title">
          负载
        </a-typography-text>
      </template>
    </a-card>
  </a-col>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: ISystemLoadResponse[]
}>()
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}

.title {
  font-size: 0.875rem;
}
</style>
