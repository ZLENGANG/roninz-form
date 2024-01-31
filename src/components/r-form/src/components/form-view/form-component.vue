<template>
  <component
    :is="curComp"
    v-bind="compProps"
    v-on="_events"
    v-model="_value"
    :field-config="_formItem"
    :disabled="props.disabled"
  >
    <template v-for="(render, key) of _compSlots" v-slot:[key]="data">
      <render-slot :key="key" :render="render" :data="data" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, watch, inject } from "vue";
import type { Component } from "vue";

import { RFormComponentProps, RFormItemProps } from "../../type";
import RenderSlot from "../../../../r-slot/render-slot";
import { innerComponents, componentPrefix } from "../../../index";

const customerComponents = inject("customerComponents") as {
  [key: string]: Component;
};
const inputTypeArr = ["input", "autocomplete", "input-number"];
const chooseTypeArr = ["select", "date", "cascader", "tree-select"];

const props = defineProps<RFormComponentProps>();
const emit = defineEmits(["input"]);

const formItem = props.formItem;
let curComp: Component = {};
let _events = formItem.events || {};
let _compSlots = formItem.compSlots || {};
let compProps = getCompProps(formItem);

const _formItem = ref(props.formItem);

const _value = computed({
  get: () => {
    const comp = getCurrentInstance()?.appContext.components[
      // @ts-ignore
      `${componentPrefix}${getCurCompType(_formItem.value)}`
    ] as {
      defaultValue: ModelValue;
    };
    return props.value || comp?.defaultValue;
  },
  set: (val) => {
    handleInput(val);
  },
});

watch(
  () => props.formItem,
  (val) => {
    _formItem.value = val;
    setValueByWatch(val);
  },
  { deep: true }
);

function getCurCompType(item: RFormItemProps) {
  return item.type || "input";
}

function getCompProps(item: RFormItemProps) {
  const formItemType = getCurCompType(item);

  curComp =
    typeof formItemType === "string"
      ? innerComponents[formItemType] || customerComponents[formItemType]
      : formItemType;

  let optionsObj = {};
  if (
    typeof formItemType === "string" &&
    ["select", "radio", "checkbox", "cascader"].includes(formItemType)
  ) {
    optionsObj = { options: item.options || item.props?.options || [] };
  }

  const compProps = {
    ...(item.props || {}),
    ...getInnerCompPlaceholder(item),
    ...optionsObj,
    ...(formItemType === "textarea"
      ? { type: "textarea", rows: 3, ...(item.props || {}) }
      : {}),
  };

  return compProps;
}

function setValueByWatch(val: RFormItemProps) {
  _events = {
    ..._events,
    ...val.events,
  };

  _compSlots = {
    ..._compSlots,
    ...val.compSlots,
  };

  compProps = {
    ...compProps,
    ...getCompProps(val),
  };
}

/* 获取placeholder */
function getInnerCompPlaceholder(item: RFormItemProps) {
  let defaultPlaceholder = "";
  const formItemType = item.type || "input";
  let placeholderObj = {};
  if (typeof formItemType === "string") {
    if (chooseTypeArr.includes(formItemType)) {
      defaultPlaceholder = `请选择${item.label}`;
    } else if (inputTypeArr.includes(formItemType)) {
      defaultPlaceholder = `请输入${item.label}`;
    }
  }

  const innerComps = Object.keys(innerComponents);
  if (typeof formItemType === "string" && innerComps.includes(formItemType)) {
    placeholderObj = {
      placeholder:
        item.placeholder || item.props?.placeholder || defaultPlaceholder,
    };
  }

  return placeholderObj;
}

function handleInput(val: ModelValue | Event) {
  if (val instanceof Event) {
    emit("input", formItem.key, (<HTMLInputElement>val.target).value);
  } else {
    emit("input", formItem.key, val);
  }
}
</script>

<style scoped></style>
