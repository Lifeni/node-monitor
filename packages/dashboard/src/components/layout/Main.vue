<template>
  <a-layout-content class="content">
    <slot></slot>
  </a-layout-content>
</template>

<style scoped>
.content {
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
