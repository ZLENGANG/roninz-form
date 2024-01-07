<template>
  <r-form :fields="fieldConfigs" :formData="formData"></r-form>

  <el-select-v2
    v-model="value"
    :options="options"
    placeholder="Please select"
    size="large"
  />

  <r-select></r-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElSelectV2 } from 'element-plus';

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref('Option 99999');
const options = Array.from({ length: 100000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));

const formData = ref({});

setTimeout(() => {
  formData.value = {
    age: 18,
  };
}, 2000);

const fieldConfigs = ref<RFormItemProps[]>([
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
