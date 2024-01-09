<template>
  <component
    :is="curComp"
    v-bind="_config"
    v-on="_events"
    v-model="_value"
    @change="handleChange"
    @input="handleInput"
  >
    <template v-for="(render, key) of formItem.compSlots" v-slot:[key]>
      <render-slot :key="key" :render="render" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { RFormComponentProps } from '../../index';
import RenderSlot from '../slot/render-slot';

const component: { [key in keyof typeof CompType]: string } = {
  input: 'ElInput',
  'input-number': 'ElInputNumber',
  autocomplete: 'ElAutocomplete',
  select: 'ElSelectV2',
  date: 'ElDatePicker',
  radio: 'r-radio',
  rate: 'ElRate',
};

const inputTypeArr = ['input', 'autocomplete', 'input-number'];
const chooseTypeArr = ['select', 'date'];

const props = defineProps<RFormComponentProps>();
const emit = defineEmits(['change']);
const formItem = props.formItem;
const formItemType = formItem.type || 'input';
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
  let defaultPlaceholder = '';

  if (chooseTypeArr.includes(formItemType)) {
    defaultPlaceholder = `请选择${formItem.label}`;
  } else if (inputTypeArr.includes(formItemType)) {
    defaultPlaceholder = `请输入${formItem.label}`;
  }
  return formItem.placeholder || itemProps.placeholder || defaultPlaceholder;
}

const _value = ref('');
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
  emit('change', formItem.key, val);
}

function handleInput(val: string | { target?: { value: string } }) {
  if (inputTypeArr.includes(formItemType)) {
    emit('change', formItem.key, val);
  }

  if (formItemType === 'radio') {
    if (typeof val !== 'string') {
      emit('change', formItem.key, val.target?.value);
    }
  }
}
</script>

<style scoped></style>
