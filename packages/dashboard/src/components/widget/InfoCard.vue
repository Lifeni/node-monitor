<template>
  <a-col>
    <a-card class="card" bodyStyle="padding: 1.25rem 1.5rem 1.125rem 1.5rem;">
      <a-statistic
        :title="props.title"
        :value="props.content"
        :valueStyle="{ display: 'flex', flexDirection: 'column' }"
      >
        <template #suffix>
          <a-typography-text type="secondary" class="suffix">
            {{ props.suffix }}
          </a-typography-text>
        </template>
      </a-statistic>
    </a-card>
  </a-col>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  content: string
  suffix?: string
}>()
</script>

<style scoped>
.card {
  max-width: 24rem;
  border-radius: 0.5rem;
}

.suffix {
  font-size: 0.875rem;
}
</style>
