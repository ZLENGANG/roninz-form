<template>
  <div>form11</div>
</template>

<script setup lang="ts">
import { RFormProps } from './index';
const props = withDefaults(defineProps<RFormProps>(), {
  readOnly: false,
  layout: 'horizontal',
});

console.log(props.readOnly);
</script>

<style></style>
