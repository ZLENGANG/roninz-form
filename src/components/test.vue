<template>
  <div>测试注入</div>
</template>

<script setup lang="ts">
defineProps({
  test: {
    type: String,
    default: 'test',
  },
});
</script>

<style></style>
