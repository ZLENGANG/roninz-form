<template>
  <r-form readonly :formConfig="formConfig"></r-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const formConfig = ref<RFormItemProps[]>([
  {
    key: 'name',
    label: '姓名',
    type: 'input',
  },
  {
    key: 'age',
    label: '年龄',
    type: 'input',
    hide: true,
  },
  {
    key: 'age1',
    label: '年龄',
    type: 'input',
  },
  {
    key: 'age2',
    label: '年龄',
    type: 'input',
  },
  {
    key: 'age3',
    label: '年龄',
    hide: true,
    type: 'input',
  },
  {
    key: 'age4',
    label: '年龄',
    type: 'input',
    style: {
      width: '100px',
    },
  },
]);
</script>

<style></style>
