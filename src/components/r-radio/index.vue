<template>
  <el-radio-group v-bind="attrs">
    <template v-if="type === 'group'">
      <el-radio
        :label="item.value"
        :disabled="item.disabled"
        v-for="item in options"
        >{{ item.label }}</el-radio
      >
    </template>

    <template v-if="type === 'button'">
      <el-radio-button :label="item.label" :disabled="item.disabled" v-for="item in options" />
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

type RRadioProps = {
  options: { label: string; value: ModelValue; disabled?: boolean }[];
  type?: 'button' | 'group';
};

withDefaults(defineProps<RRadioProps>(), {
  type: 'group',
});
const attrs = useAttrs();
</script>

<style scoped></style>
