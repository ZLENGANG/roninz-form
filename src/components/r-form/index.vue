<template>
  <readonly-view v-if="readonly" v-bind="props" />
  <form-view v-else v-bind="props">
    <template v-for="(_item, key) in formItemSlots" #[key]="slotScope">
      <span :key="key">
        <slot :name="key" v-bind="slotScope"></slot>
      </span>
    </template>
  </form-view>
</template>

<script setup lang="ts">
import type { RFormProps } from "./index";
import readonlyView from "./components/readonly-view/index.vue";
import formView from "./components/form-view/index.vue";
import { useSlots } from "vue";

const props = withDefaults(defineProps<RFormProps>(), {
  readonly: false,
  layout: "inline",
});

const formItemSlots = useSlots();
</script>

<style></style>
