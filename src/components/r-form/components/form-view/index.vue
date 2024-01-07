<template>
  <el-form ref="formRef" :model="formData" :rules="rules">
    <el-form-item :label="item.label" v-for="item in fields" :key="item.key">
      <el-input v-model="_formData[item.key]" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import type { RFormViewProps } from '../../index';
import { ElForm, ElFormItem, ElInput } from 'element-plus';
type FormDataType = RFormViewProps['formData'];

const props = defineProps<RFormViewProps>();
const _formData = ref<FormDataType>({});

watch(
  () => props.formData,
  (val) => {
    _formData.value = setFormData(val);
  },
  { deep: true, immediate: true }
);

function setFormData(val: FormDataType) {
  const res: FormDataType = {};
  props.fields.forEach((field) => {
    res[field.key] = val[field.key] || field.initValue || '';
  });
  return res;
}
</script>

<style scoped></style>
