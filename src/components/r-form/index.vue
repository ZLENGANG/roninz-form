<template>
  <readonly-view v-if="readonly" v-bind="props" />
  <form-view v-else v-bind="props" />
</template>

<script setup lang="ts">
import type { RFormProps } from './index';
import readonlyView from './components/readonly-view/index.vue';
import formView from './components/form-view/index.vue';

const props = withDefaults(defineProps<RFormProps>(), {
  readonly: false,
  layout: 'inline',
});
</script>

<style></style>
