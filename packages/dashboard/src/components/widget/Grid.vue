<template>
  <a-row class="row" justify="center" :gutter="[16, 16]" :wrap="props.wrap">
    <slot></slot>
  </a-row>
</template>

<script setup lang="ts">
const props = defineProps<{
  wrap?: boolean
}>()
</script>
