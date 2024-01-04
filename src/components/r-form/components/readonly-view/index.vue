<template>
  <section class="r-form-readonly" :style="(formStyle as StyleValue)">
    <section
      v-for="item in form_config"
      :key="item.key"
      :class="item.cls"
      :style="(item.style as StyleValue)"
    ></section>
  </section>
</template>

<script setup lang="ts">
import type { RReadonlyViewProps } from '../../index';
import { watch, ref, StyleValue } from 'vue';

const { formConfig, formStyle } = withDefaults(
  defineProps<RReadonlyViewProps>(),
  {
    formStyle() {
      return {
        '--grid-count': 3,
      };
    },
    formConfig: () => [],
  }
);

const form_config = ref<RFormItemProps[]>([]);
const curSpan = ref(0);

watch(
  formConfig,
  (val) => {
    getFormConfig(val);
  },
  { deep: true, immediate: true }
);

function getFormConfig(config: RFormItemProps[] = []) {
  const count = formStyle['--grid-count'] || 3;
  const filterConfig = config.filter((item) => !item.hide);
  const BASE_NAME = 'r-form-readonly';

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
  console.log(form_config.value, count);
}
</script>

<style scoped></style>
