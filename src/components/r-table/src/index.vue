<template>
  <div>table</div>
</template>

<script setup lang="ts">
import { RTableProps } from './type';
withDefaults(defineProps<RTableProps>(), {
  readOnly: false,
});
</script>

<style></style>
