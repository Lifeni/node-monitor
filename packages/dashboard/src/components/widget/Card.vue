<template>
  <a-col>
    <a-card :title="props.title">
      <p>card content</p>
    </a-card>
  </a-col>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>
