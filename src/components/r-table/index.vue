<template>
  <div>table</div>
</template>

<script setup lang="ts">
import { RTableProps } from './index';
withDefaults(defineProps<RTableProps>(), {
  readOnly: false,
});
</script>

<style></style>
