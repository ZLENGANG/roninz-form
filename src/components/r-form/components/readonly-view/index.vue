<template>
  <section class="r-form-readonly" :style="(style as StyleValue)">
    <section
      v-for="item in form_config"
      :key="item.key"
      :class="item.cls"
      :style="item.style"
    >
      <span class="r-form-readonly-label">
        <slot :name="`${item.key}-label`" :label="item.label">
          <span :title="item.label"> {{ item.label }}</span>
        </slot>
      </span>

      <section class="r-form-readonly-content">
        <template v-if="item.type">
          <template v-if="isInnerComponent(item.type)">
            {{ formatFormItem(item) }}
          </template>
        </template>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { RFormItemProps, RReadonlyViewProps } from '../../index';
import { watch, ref, StyleValue, Component } from 'vue';

const { fields, style, formData } = withDefaults(
  defineProps<RReadonlyViewProps>(),
  {
    style() {
      return {
        '--grid-count': 3,
      };
    },
    fields: () => [],
    formData: () => ({}),
  }
);

const form_config = ref<RFormItemProps[]>([]);
const curSpan = ref(0);
const innerComponents = [
  'input',
  'input-number',
  'input-money',
  'textarea',
  'select',
  'checkbox',
  'radio',
  'date',
];

watch(
  fields,
  (val) => {
    getFormConfig(val);
  },
  { deep: true, immediate: true }
);

/* 获取表单配置 */
function getFormConfig(config: RFormItemProps[] = []) {
  const count = style['--grid-count'] || 3;
  const filterConfig = config.filter((item) => !item.hide);
  const BASE_NAME = 'r-form-readonly';

  // @ts-ignore
  form_config.value = filterConfig.map((item, index) => {
    const cls = [`${BASE_NAME}-col`, `${BASE_NAME}-${item.key}`];
    const { span = 0, full, className = [] } = item;

    /* 添加自定义样式 */
    if (className.length > 0) {
      cls.push(...className);
    }

    /* 是否占满一行 */
    if (span >= count || full) {
      cls.push(`${BASE_NAME}-full-col`);
      curSpan.value = 0;
    } else {
      curSpan.value += span || 1;
    }

    /* 判断是否为一行的最后一个 */
    if (curSpan.value % count === 0) {
      cls.push(`${BASE_NAME}-no-border-right`);
    }

    /* 判断是否是最后一行 */
    const n = filterConfig.length % count;
    const num = n > 0 ? n : count;
    if (index >= filterConfig.length - num) {
      cls.push(`${BASE_NAME}-last-row`);
    }

    return {
      cls,
      ...item,
    };
  });
}

/* 判断是否为内置组件 */
function isInnerComponent(name: string | Component) {
  return typeof name === 'string' && innerComponents.includes(name);
}

/* 格式化表单配置 */
function formatFormItem(formItem: RFormItemProps) {
  const { type, key, initValue } = formItem;
  let text = '';
  switch (type) {
    case 'input':
    case 'input-number':
      text = formData[key] || initValue;
      break;

    case 'select':
      text = formatSelect(formItem);
      break;
    default:
      text = initValue || '-';
  }

  return text;
}

function formatSelect(formItem: RFormItemProps) {
  const { key, config } = formItem;
  const value = formData[key];
  const option = config?.options?.find(
    (item: { value: any }) => item.value === value
  );
  return option?.label || '-';
}
</script>

<style scoped></style>
