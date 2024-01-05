<template>
  <readonly-view
    v-if="readonly"
    :form-config="formConfig"
    :form-style="formStyle"
    :form-data="formData"
  />
  <form-view v-else />
</template>

<script setup lang="ts">
import type { RFormProps } from "./index";
import readonlyView from "./components/readonly-view/index.vue";
import formView from "./components/form-view/index.vue";

withDefaults(defineProps<RFormProps>(), {
  readonly: false,
  layout: "inline",
  formStyle() {
    return {
      "--grid-count": 3,
    };
  },
  formConfig: () => [],
  formData: () => ({}),
});
</script>

<style></style>
