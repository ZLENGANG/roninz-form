<template>
  <section class="r-form-readonly" :style="formStyle">
    <section></section>
  </section>
</template>

<script setup lang="ts">
import type { RReadonlyViewProps } from "../../index";
import { defineProps, watch, ref } from "vue";

const { formConfig, formStyle } = withDefaults(
  defineProps<RReadonlyViewProps>(),
  {
    formStyle() {
      return {
        "--grid-count": 3,
      };
    },
    formConfig: () => [],
  }
);

const form_config = ref([]);

watch(
  formConfig,
  (val) => {
    getFormConfig(val);
  },
  { deep: true, immediate: true }
);

function getFormConfig(config = []) {
  const count = formStyle["--grid-count"] || 3;
  form_config.value = formConfig.filter((item) => !item.hide);
}
</script>

<style scoped></style>
