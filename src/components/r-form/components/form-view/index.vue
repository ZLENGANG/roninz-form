<template>
  <el-form ref="formRef" :model="formData" v-bind="props">
    <el-form-item
      :label="item.label"
      v-for="item in fields"
      :key="item.key"
      :prop="item.key"
      :rules="getRules(item)"
    >
      <form-component
        :form-item="item"
        :value="_formData[item.key]"
      ></form-component>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import type { RFormViewProps } from "../../index";
import { ElForm, ElFormItem, FormItemRule } from "element-plus";
import formComponent from "../form-component/index.vue";

type FormDataType = RFormViewProps["formData"];

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
    res[field.key] = val[field.key] || field.initValue || "";
  });
  return res;
}

function getRules(item: RFormItemProps) {
  let rules: FormItemRule[] = [];
  const findItem = props.fields.find((i) => i.key === item.key);
  const requiredItem: FormItemRule = {
    required: true,
    message: `${findItem?.label}不能为空！`,
    trigger: "blur",
  };

  if (item.required) {
    rules.push(requiredItem);
  }

  const itemRules = item.rules;
  if (itemRules && itemRules.length > 0) {
    const hasRequired = itemRules.some((i) => i.required) && item.required;
    if (hasRequired) {
      rules = itemRules;
    } else {
      rules = rules.concat(itemRules);
    }
  }
  return rules;
}
</script>

<style scoped></style>
