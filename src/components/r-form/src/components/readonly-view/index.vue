<template>
  <el-descriptions title="With border" :column="3" border>
    <el-descriptions-item v-for="item in _fields" :key="item.key">
      <template #label>
        <div class="cell-item">{{ item.label }}</div>
      </template>

      <div>{{ _formData[item.key] || "-" }}</div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RFormCommonProps, RFormItemProps } from "../../type";

const props = withDefaults(defineProps<RFormCommonProps>(), {});
const _formData = ref<AnyObject>({});
const _fields = ref<RFormItemProps[]>([]);

watch(
  () => props.formData,
  (val) => {
    _formData.value = setFormData(val);
    console.log(_formData.value);
  },
  { deep: true, immediate: true }
);

watch(
  () => props.fields,
  (val) => {
    // @ts-ignore
    _fields.value = val;
  },
  { deep: true, immediate: true }
);

/* 设置表单数据 */
function setFormData(val: AnyObject) {
  const res: AnyObject = {};
  _fields.value.forEach((field) => {
    res[field.key] = val[field.key] || field.initValue;
  });
  return res;
}
</script>

<style></style>
