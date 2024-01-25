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
import type { RFormInstance, RFormItemProps, RFormProps } from './type';
import readonlyView from './components/readonly-view/index.vue';
import formView from './components/form-view/index.vue';
import { ref, useSlots } from 'vue';
import { cloneDeep } from 'lodash-es';

const props = withDefaults(defineProps<RFormProps>(), {
  readonly: false,
});
const formViewRef = ref<RFormInstance>();

const exposeFn: RFormInstance = {
  validate() {
    return formViewRef.value?.validate?.();
  },

  scrollToField(key: string) {
    formViewRef.value?.scrollToField?.(key);
  },

  resetFields() {
    formViewRef.value?.resetFields?.();
  },

  getFieldConfigByKey(key: string) {
    return cloneDeep(props.fields).find((item) => item.key === key);
  },

  getFieldValueByKey(key: string) {
    return cloneDeep(props.formData)[key];
  },

  getFieldsConfig<T extends string[]>(keys?: T) {
    const _fields = cloneDeep(props.fields);

    let _keys =
      keys && keys?.length > 0 ? keys : _fields.map((item) => item.key);
    return _keys.reduce((acc: { [key: string]: any }, key) => {
      acc[key] = _fields.find((item) => item.key === key);
      return acc;
    }, {}) as { [key in T[number]]: RFormItemProps };
  },

  getFieldsValue<T extends string[]>(keys?: T) {
    const _formData = cloneDeep(props.formData);
    let _keys = keys && keys?.length > 0 ? keys : Object.keys(_formData);

    return _keys.reduce((acc: { [key: string]: any }, key) => {
      acc[key] = _formData[key];
      return acc;
    }, {}) as { [key in T[number]]: ModelValue };
  },

  setField(
    param: string | { [key: string]: Partial<RFormItemProps> },
    config?: Partial<RFormItemProps>
  ) {
    if (typeof param === 'string') {
      if (!config) {
        console.warn('`config` is required.');
        return;
      }

      if (config.key) {
        console.warn('cannot set field `key`');
        return;
      }

      props.fields.forEach((item, index) => {
        if (item.key === param) {
          props.fields[index] = {
            ...item,
            ...config,
          };
        }
      });
    }

    if (typeof param === 'object') {
      for (let key in param) {
        if (param[key].key) {
          console.warn('cannot set field `key`');
          return;
        }
        props.fields.forEach((item, index) => {
          if (item.key === key) {
            props.fields[index] = {
              ...item,
              ...param[key],
            };
          }
        });
      }
    }
  },

  setFieldValue(param: string | AnyObject, value?: ModelValue) {
    if (typeof param === 'string') {
      props.formData[param] = value;
    } else if (typeof param === 'object') {
      for (let key in param) {
        props.formData[key] = param[key];
      }
    }
  },
};

defineExpose(exposeFn);

const formItemSlots = useSlots();
</script>

<style></style>
