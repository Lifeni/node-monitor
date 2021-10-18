<template>
  <a-layout-footer class="footer">
    <a-typography-text class="text" type="secondary">
      这个是页脚，页脚要长一点才好看
    </a-typography-text>

    <a-typography-text class="text" type="secondary">
      Powered by Vue.js & Ant Design Vue
    </a-typography-text>
  </a-layout-footer>
</template>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text {
  padding: 0.5rem 0;
}
</style>
