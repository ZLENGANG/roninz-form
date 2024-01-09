<template>
  <el-radio-group v-model="_value">
    <el-radio :label="item.value" v-for="item in options">{{
      item.label
    }}</el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

type ModelValue = boolean | string | number;
type RRadioProps = {
  options: { label: string; value: ModelValue }[];
  type?: "button" | "group";
};

const props = withDefaults(defineProps<RRadioProps>(), {
  type: "group",
});
const _value = ref<ModelValue>("");

console.log(props, "zlzl");
</script>

<style scoped></style>
