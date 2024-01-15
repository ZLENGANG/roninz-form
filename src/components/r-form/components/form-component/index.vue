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
import { computed, ref, watch } from 'vue';
import { RFormComponentProps } from '../../index';
import RenderSlot from '../slot/render-slot';

const component: { [key in keyof typeof CompType]: string } = {
  autocomplete: 'ElAutocomplete',
  cascader: 'ElCascader',
  checkbox: 'r-checkbox',
  color: 'ElColorPicker',
  input: 'ElInput',
  textarea: 'ElInput',
  'input-number': 'ElInputNumber',
  select: 'ElSelectV2',
  date: 'ElDatePicker',
  radio: 'r-radio',
  rate: 'ElRate',
  slider: 'ElSlider',
  switch: 'ElSwitch',
  transfer: 'ElTransfer',
  upload: 'r-upload',
  calendar: 'ElCalendar',
  'tree-select': 'ElTreeSelect',
};

const inputTypeArr = ['input', 'autocomplete', 'input-number'];
const chooseTypeArr = ['select', 'date', 'cascader', 'tree-select'];

const props = defineProps<RFormComponentProps>();
const emit = defineEmits(['input']);

const formItem = props.formItem;
let curComp = '';
let _events = formItem.events || {};
let _compSlots = formItem.compSlots || {};
let compProps = getCompProps(formItem);

const _formItem = ref(props.formItem);

const _value = computed({
  get: () => {
    return props.value;
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

function getCompProps(item: RFormItemProps) {
  const formItemType = item.type || 'input';
  curComp = component[formItemType];
  return {
    ...(item.props || {}),
    ...{
      options: item.options || item.props?.options || [],
      disabled: item.disabled || item.props?.disabled || false,
      placeholder: getPlaceholder(item),
    },
    ...(formItemType === 'textarea' ? { type: 'textarea' } : {}),
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
  if (chooseTypeArr.includes(formItemType)) {
    defaultPlaceholder = `请选择${item.label}`;
  } else if (inputTypeArr.includes(formItemType)) {
    defaultPlaceholder = `请输入${item.label}`;
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
