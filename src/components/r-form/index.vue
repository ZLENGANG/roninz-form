<template>
  <readonly-view v-if="readonly" v-bind="props" />
  <form-view v-else v-bind="props" ref="formViewRef">
    <template v-for="(_item, key) in formItemSlots" #[key]="slotScope">
      <span :key="key">
        <slot :name="key" v-bind="slotScope"></slot>
      </span>
    </template>
  </form-view>
</template>

<script setup lang="ts">
import type { RFormProps } from './index';
import readonlyView from './components/readonly-view/index.vue';
import formView from './components/form-view/index.vue';
import { ref, useSlots } from 'vue';

const props = withDefaults(defineProps<RFormProps>(), {
  readonly: false,
});
const formViewRef = ref<RFormInstance>();

const exposeFn: RFormInstance = {
  validate() {
    return formViewRef.value?.validate?.();
  },

  getFieldConfigByKey(key: string) {
    return props.fields.find((item) => item.key === key);
  },

  getFieldValueByKey(key: string) {
    return props.formData[key];
  },

  getFieldsConfig<T extends string[]>(keys?: T) {
    let _keys =
      keys && keys?.length > 0 ? keys : props.fields.map((item) => item.key);
    return _keys.reduce((acc: { [key: string]: any }, key) => {
      acc[key] = props.fields.find((item) => item.key === key);
      return acc;
    }, {}) as { [key in T[number]]: RFormItemProps };
  },

  getFieldsValue<T extends string[]>(keys?: T) {
    let _keys = keys && keys?.length > 0 ? keys : Object.keys(props.formData);

    return _keys.reduce((acc: { [key: string]: any }, key) => {
      acc[key] = props.formData[key];
      return acc;
    }, {}) as { [key in T[number]]: ModelValue };
  },
};

defineExpose(exposeFn);

const formItemSlots = useSlots();
</script>

<style></style>
