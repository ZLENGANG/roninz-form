<template>
  <component :is="curComp" v-bind="_config" v-on="_events" v-model="_value">
    <template v-for="(render, key) of formItem.compSlots" v-slot:[key]>
      <render-slot :key="key" :render="render" />
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
  input: "ElInput",
  "input-number": "ElInputNumber",
  select: "ElSelectV2",
  date: "ElDatePicker",
  radio: "r-radio",
  rate: "ElRate",
  slider: "ElSlider",
  switch: "ElSwitch",
  transfer: "ElTransfer",
  upload: "ElUpload",
};

const inputTypeArr = ["input", "autocomplete", "input-number"];
const chooseTypeArr = ["select", "date", "cascader"];

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
