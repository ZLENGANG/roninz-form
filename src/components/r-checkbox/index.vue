<template>
  <el-checkbox-group v-bind="$attrs">
    <template v-if="type === 'group'">
      <el-checkbox v-for="item in options" v-bind="item"></el-checkbox>
    </template>

    <template v-if="type === 'button'">
      <el-checkbox-button v-for="item in options" v-bind="item" />
    </template>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import type { CheckboxProps } from "element-plus";

type RCheckboxProps = {
  options: CheckboxProps[];
  type?: "button" | "group";
};

withDefaults(defineProps<RCheckboxProps>(), {
  type: "group",
});
</script>

<style scoped></style>
