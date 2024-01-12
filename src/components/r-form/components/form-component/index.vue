<template>
  <component
    :is="curComp"
    v-bind="_config"
    v-on="_events"
    v-model="_value"
    :field-config="formItem"
  >
    <template v-for="(render, key) of formItem.compSlots" v-slot:[key]="data">
      <render-slot :key="key" :render="render" :data="data" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RFormComponentProps } from "../../index";
import RenderSlot from "../slot/render-slot";

const component: { [key in keyof typeof CompType]: string } = {
  autocomplete: "ElAutocomplete",
  cascader: "ElCascader",
  checkbox: "r-checkbox",
  color: "ElColorPicker",
  input: "ElInput",
  textarea: "ElInput",
  "input-number": "ElInputNumber",
  select: "ElSelectV2",
  date: "ElDatePicker",
  radio: "r-radio",
  rate: "ElRate",
  slider: "ElSlider",
  switch: "ElSwitch",
  transfer: "ElTransfer",
  upload: "r-upload",
  calendar: "ElCalendar",
  "tree-select": "ElTreeSelect",
};

const inputTypeArr = ["input", "autocomplete", "input-number"];
const chooseTypeArr = ["select", "date", "cascader", "tree-select"];

const props = defineProps<RFormComponentProps>();
const emit = defineEmits(["input"]);
const formItem = props.formItem;
const formItemType = formItem.type || "input";
const curComp = component[formItemType];
const itemProps = formItem.props || {};

const _config = {
  ...itemProps,
  ...{
    options: formItem.options || itemProps.options || [],
    disabled: formItem.disabled || itemProps.disabled || false,
    placeholder: getPlaceholder(),
  },
  ...(formItemType === "textarea" ? { type: "textarea" } : {}),
};

/* 获取placeholder */
function getPlaceholder() {
  let defaultPlaceholder = "";

  if (chooseTypeArr.includes(formItemType)) {
    defaultPlaceholder = `请选择${formItem.label}`;
  } else if (inputTypeArr.includes(formItemType)) {
    defaultPlaceholder = `请输入${formItem.label}`;
  }
  return formItem.placeholder || itemProps.placeholder || defaultPlaceholder;
}

const _value = computed({
  get: () => {
    return props.value;
  },
  set: (val) => {
    handleInput(val);
  },
});

const _events = formItem.events || {};

function handleInput(val: ModelValue | Event) {
  if (val instanceof Event) {
    emit("input", formItem.key, (<HTMLInputElement>val.target).value);
  } else {
    emit("input", formItem.key, val);
  }
}
</script>

<style scoped></style>
