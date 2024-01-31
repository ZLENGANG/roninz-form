<template>
  <el-select-v2
    v-model="_value"
    :options="_options"
    :placeholder="'请选择' + label"
  />
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
const attrs = useAttrs();
const props = defineProps({
  value: null,
});

const _value = computed({
  get() {
    return props.value;
  },
  set() {},
});
const fieldConfig = attrs["field-config"] as any;

const label = fieldConfig.label;

const opts = fieldConfig.opts || fieldConfig.props?.opts;

const _options = ref<
  {
    label: string;
    value: string | number | boolean;
  }[]
>([]);

if (typeof opts === "string") {
  setTimeout(() => {
    _options.value = [
      { label: "class1", value: "1" },
      { label: "class2", value: "3" },
    ];
  }, 500);
} else if (Array.isArray(opts)) {
  _options.value = opts;
}
</script>

<style></style>
