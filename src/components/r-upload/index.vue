<template>
  <el-upload v-bind="$attrs" v-model:fileList="fileList">
    <el-button type="primary">上传文件</el-button>
    <template v-for="(render, key) of compSlots" v-slot:[key]="data">
      <render-slot :key="key" :render="render" :data="data" />
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { computed, defineOptions } from 'vue';
import RenderSlot from '../r-form/components/slot/render-slot';
import type { RUploadType } from './index';

const props = defineProps<RUploadType>();
const compSlots = props.fieldConfig.compSlots || {};
const emit = defineEmits(['update:modelValue']);

const fileList = computed({
  get: () => {
    return props.modelValue || [];
  },
  set: (val) => {
    emit('update:modelValue', val || []);
  },
});

defineOptions({
  defaultValue: [],
});
</script>

<style scoped></style>
