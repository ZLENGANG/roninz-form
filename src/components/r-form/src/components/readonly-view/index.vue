<template>
  <el-descriptions title="With border" :column="4" border>
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
type Option = { label: string; value: ModelValue };

const valueToLabel = {
  select(field: RFormItemProps, value: ModelValue) {
    const props = field.props || {};
    const options = field.options || props.options || [];
    if (props.multiple) {
      return options
        .filter((item: Option) => (value as ModelValue[]).includes(item.value))
        ?.map((item: Option) => item.label)
        .join(" | ");
    }
    return options.find((item: Option) => item.value === value)?.label;
  },
  radio(field: RFormItemProps, value: ModelValue) {
    const options = field.options || field.props?.options || [];
    return options.find((item: Option) => item.value === value)?.label;
  },
  checkbox(field: RFormItemProps, value: ModelValue = []) {
    const options = field.options || field.props?.options || [];
    return options
      .filter((item: Option) => (value as ModelValue[]).includes(item.value))
      ?.map((item: Option) => item.label)
      .join(" | ");
  },

  switch(field: RFormItemProps, value: ModelValue) {
    const props = field.props || {};
    const active = props["active-text"];
    const inactive = props["inactive-text"];
    return active && inactive ? (value ? active : inactive) : value;
  },

  cascader(field: RFormItemProps, value: ModelValue) {
    // const options = field.options || field.props?.options || [];
    // let res = "";

    // const getLabel = (opts: ModelValue[]) => {
    //   opts.forEach((item) => {
    //     if (item.value === value) {
    //       res = item.lable;
    //     } else {
    //       if (item.children && item.children.length > 0) {
    //         res = getLabel(item.children);
    //       }
    //     }
    //   });

    //   return res;
    // };

    console.log(field, value);
    return value
  },
};

watch(
  () => props.formData,
  (val) => {
    setFormData(val);
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
  const needChangeTypes = Object.keys(valueToLabel);
  _fields.value.forEach((field) => {
    const compType = field.type;
    const value = val[field.key] || field.initValue;

    if (typeof compType === "string") {
      if (needChangeTypes.includes(compType)) {
        // @ts-ignore
        _formData.value[field.key] = valueToLabel[compType](field, value);
      } else {
        _formData.value[field.key] = value;
      }
    } else {
      _formData.value[field.key] = value;
    }
  });
}
</script>

<style></style>
