<template>
  <el-radio-group v-bind="$attrs">
    <template v-if="type === 'group'">
      <el-radio
        v-bind="item"
        :label="item.value"
        v-for="item in options"
        :border="border"
        >{{ item.label }}</el-radio
      >
    </template>

    <template v-if="type === 'button'">
      <el-radio-button
        v-bind="item"
        :label="item.value"
        v-for="item in options"
        >{{ item.label }}</el-radio-button
      >
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import type { RRadioProps } from "./type";
withDefaults(defineProps<RRadioProps>(), {
  type: "group",
});
</script>

<style scoped></style>
