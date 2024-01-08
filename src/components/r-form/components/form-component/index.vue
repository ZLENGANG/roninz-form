<template>
  <component
    :is="curComp"
    v-bind="_config"
    v-on="_events"
    v-model="_value"
  ></component>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RFormComponentProps } from "../../index";
const component = {
  input: "ElInput",
  select: "ElSelectV2",
};
const props = defineProps<RFormComponentProps>();
const formItem = props.formItem;
const curComp = component[props.formItem.type || "input"];
const itemProps = formItem.props || {};

const _config = {
  ...itemProps,
  ...{
    options: formItem.options || itemProps.options || [],
    disabled: formItem.disabled || itemProps.options || false,
  },
};

const _value = ref("");
const _events = {
  ...(formItem.events || {}),
  ...{
    input(val: string) {
      _value.value = val;
    },
  },
};

watch(
  () => props.value,
  (val) => {
    _value.value = val;
  },
  { immediate: true }
);
</script>

<style scoped></style>
