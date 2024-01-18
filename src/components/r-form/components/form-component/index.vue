<template>
  <component
    :is="curComp"
    v-bind="compProps"
    v-on="_events"
    v-model="_value"
    :field-config="_formItem"
  >
    <template v-for="(render, key) of _compSlots" v-slot:[key]="data">
      <render-slot :key="key" :render="render" :data="data" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, watch, inject } from 'vue';
import type { Component } from 'vue';

import { RFormComponentProps } from '../../index';
import RenderSlot from '../slot/render-slot';
import { formComponents as component, componentPrefix } from '../../../index';

const inputTypeArr = ['input', 'autocomplete', 'input-number'];
const chooseTypeArr = ['select', 'date', 'cascader', 'tree-select'];

const props = defineProps<RFormComponentProps>();
const emit = defineEmits(['input']);

const formItem = props.formItem;
let curComp: Component = {};
let _events = formItem.events || {};
let _compSlots = formItem.compSlots || {};
let compProps = getCompProps(formItem);

const _formItem = ref(props.formItem);

const _value = computed({
  get: () => {
    const comp = getCurrentInstance()?.appContext.components[
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
  return item.type || 'input';
}

function getCompProps(item: RFormItemProps) {
  const formItemType = getCurCompType(item);
  const customerComponents = inject('customerComponents') as {
    [key: string]: Component;
  };
  curComp =
    typeof formItemType === 'string'
      ? component[formItemType] || customerComponents[formItemType]
      : formItemType;

  return {
    ...(item.props || {}),
    ...{
      options: item.options || item.props?.options || [],
      disabled: item.disabled || item.props?.disabled || false,
      placeholder: getPlaceholder(item),
    },
    ...(formItemType === 'textarea'
      ? { type: 'textarea', rows: 3, ...(item.props || {}) }
      : {}),
  };
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
function getPlaceholder(item: RFormItemProps) {
  let defaultPlaceholder = '';
  const formItemType = item.type || 'input';
  if (typeof formItemType === 'string') {
    if (chooseTypeArr.includes(formItemType)) {
      defaultPlaceholder = `请选择${item.label}`;
    } else if (inputTypeArr.includes(formItemType)) {
      defaultPlaceholder = `请输入${item.label}`;
    }
  }

  return item.placeholder || item.props?.placeholder || defaultPlaceholder;
}

function handleInput(val: ModelValue | Event) {
  if (val instanceof Event) {
    emit('input', formItem.key, (<HTMLInputElement>val.target).value);
  } else {
    emit('input', formItem.key, val);
  }
}
</script>

<style scoped></style>
