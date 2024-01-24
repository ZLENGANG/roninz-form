<template>
  <el-checkbox-group v-bind="$attrs">
    <template v-if="type === 'group'">
      <el-checkbox
        v-for="item in options"
        v-bind="item"
        :label="item.value"
        :border="border"
        >{{ item.label }}</el-checkbox
      >
    </template>

    <template v-if="type === 'button'">
      <el-checkbox-button
        v-for="item in options"
        v-bind="item"
        :label="item.value"
        >{{ item.label }}</el-checkbox-button
      >
    </template>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { RCheckboxProps } from './index';
withDefaults(defineProps<RCheckboxProps>(), {
  type: 'group',
});
</script>

<style scoped></style>
