<template>
  <r-form readonly :formConfig="formConfig"></r-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { RFormItemProps } from "./components/r-form";

const formConfig = ref<RFormItemProps[]>([
  {
    key: "name",
    label: "姓名",
    type: "input",
    hide: false,
  },
  {
    key: "age",
    label: "年龄",
    type: "input",
    hide: true,
  },
]);
</script>

<style></style>
