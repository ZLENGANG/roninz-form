<template>
  <component
    :is="curComp"
    v-bind="_config"
    v-on="_events"
    v-model="_value"
    @change="handleChange"
    @input="handleChange"
  >
    <template v-for="(render, key) of formItem.compSlots" v-slot:[key]>
      <render-slot :key="key" :render="render" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RFormComponentProps } from "../../index";
import RenderSlot from "../slot/render-slot";

const component: { [key in keyof typeof CompType]: string } = {
  input: "ElInput",
  "input-number": "ElInputNumber",
  autocomplete: "ElAutocomplete",
  select: "ElSelectV2",
  date: "ElDatePicker",
  radio: "r-radio",
};

const props = defineProps<RFormComponentProps>();
const emit = defineEmits(["change"]);
const formItem = props.formItem;
const curComp = component[formItem.type || "input"];
const itemProps = formItem.props || {};

const _config = {
  ...itemProps,
  ...{
    options: formItem.options || itemProps.options || [],
    disabled: formItem.disabled || itemProps.disabled || false,
    placeholder: getPlaceholder(),
  },
};

/* 获取placeholder */
function getPlaceholder() {
  let defaultPlaceholder = "";
  const type = formItem.type as string;
  const inputTypeArr = ["input", "autocomplete"];
  const chooseTypeArr = ["select", "date"];

  if (chooseTypeArr.includes(type)) {
    defaultPlaceholder = `请选择${formItem.label}`;
  } else if (inputTypeArr.includes(type)) {
    defaultPlaceholder = `请输入${formItem.label}`;
  }
  return formItem.placeholder || itemProps.placeholder || defaultPlaceholder;
}

const _value = ref("");
const _events = formItem.events || {};

watch(
  () => props.value,
  (val) => {
    _value.value = val;
  },
  { immediate: true }
);

/* 处理表单数据 */
function handleChange(val: string | any[]) {
  emit("change", formItem.key, val);
}
</script>

<style scoped></style>
