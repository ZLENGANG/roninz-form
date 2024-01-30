<template>
  <div ref="formWrapRef">
    <el-form ref="formRef" :model="formData" v-bind="props">
      <el-row :gutter="20">
        <template v-for="item in _fields">
          <el-col
            v-if="!isHide(item)"
            :key="item.key"
            :span="item.full || !inline ? 24 : computedSpan"
          >
            <el-form-item :prop="item.key" :rules="getRules(item)">
              <template #label>
                <slot
                  :name="`label-${item.key}`"
                  :lable="item.label"
                  :value="_formData[item.key]"
                >
                  <span :title="item.label">{{ item.label }}</span>
                </slot>
              </template>
              <form-item-slot
                v-if="item.slot"
                :slots="formItemSlots"
                :formItem="item"
                :formData="_formData"
              />

              <render-slot v-else-if="item.render" :render="item.render" />

              <form-component
                v-else
                :form-item="item"
                :value="_formData[item.key]"
                :form-data="_formData"
                :disabled="isDisabled(item)"
                @input="handleChangeValue"
              ></form-component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, useSlots, onMounted, onBeforeUnmount } from "vue";
import type {
  RFormCommonProps,
  RFormItemProps,
  RFormViewProps,
} from "../../../index";
import { ElForm, ElFormItem, FormInstance, FormItemRule } from "element-plus";
import formComponent from "../form-component/index.vue";
import FormItemSlot from "../../../../r-slot/form-item-slot";
import RenderSlot from "../../../../r-slot/render-slot";

type FormDataType = RFormViewProps["formData"];

const props = withDefaults(defineProps<RFormCommonProps>(), {
  inline: true,
  "label-position": "top",
});
const _formData = ref<FormDataType>({});
const formItemSlots = useSlots();
const formRef = ref<FormInstance>();
const computedSpan = ref(props.column || 24);
const formWrapRef = ref<HTMLElement>();
const _fields = ref<RFormItemProps[]>([]);

defineExpose({
  validate,
  scrollToField: (key: string) => {
    formRef.value?.scrollToField(key);
  },
  resetFields: () => {
    formRef.value?.resetFields();
  },
});

defineOptions({
  inheritAttrs: false,
});

watch(
  () => props.formData,
  (val) => {
    _formData.value = setFormData(val);
  },
  { deep: true, immediate: true }
);

watch(
  () => props.fields,
  (val) => {
    _fields.value = val;
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  setComputedSpan();
  if (!props.column && props.inline) {
    window.addEventListener("resize", () => {
      setComputedSpan();
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {});
});

/* 设置表单数据 */
function setFormData(val: FormDataType) {
  const res: FormDataType = {};
  _fields.value.forEach((field) => {
    res[field.key] = val[field.key] || field.initValue;
  });
  return res;
}

/* 获取校验规则 */
function getRules(item: RFormItemProps) {
  let rules: FormItemRule[] = [];
  // @ts-ignore
  const findItem = _fields.value.find((i) => i.key === item.key);
  const requiredItem: FormItemRule = {
    required: true,
    message: `${findItem?.label}不能为空！`,
  };

  if (item.required) {
    rules.push(requiredItem);
  }

  const itemRules = item.rules;
  if (itemRules && itemRules.length > 0) {
    const hasRequired = itemRules.some((i) => i.required) && item.required;
    if (hasRequired) {
      rules = itemRules;
    } else {
      rules = rules.concat(itemRules);
    }
  }
  return rules;
}

function isHide(item: RFormItemProps) {
  if (typeof item.hide === "boolean") {
    return item.hide;
  }
  if (typeof item.hide === "function") {
    return item.hide(_formData.value);
  }
  return false;
}

function isDisabled(item: RFormItemProps) {
  if (typeof item.disabled === "boolean") {
    return item.disabled;
  }

  if (typeof item.disabled === "function") {
    return item.disabled(_formData.value);
  }

  return item.props?.disabled || false;
}

/**处理表单数据 */
function handleChangeValue(key: string, val: string) {
  props.formData[key] = val;
}

/**校验 */
function validate() {
  return new Promise((resolve, reject) => {
    formRef.value
      ?.validate()
      .then(() => {
        resolve(_formData);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

/**设置列数 */
function setComputedSpan() {
  const formWrapWidth = formWrapRef.value?.clientWidth || 0;
  const computedColumn = Math.floor(formWrapWidth / 500);
  computedSpan.value = Math.ceil(24 / (props.column || computedColumn));
}
</script>

<style scoped lang="less">
.el-form {
  &.el-form--inline {
    .el-form-item {
      width: 100%;
      margin-right: 0;
    }
  }

  :deep(.el-form-item__content) {
    .el-input,
    .el-select-v2,
    .el-cascader,
    .el-autocomplete,
    .el-select,
    .el-input-number {
      width: 100%;
    }

    .el-slider .el-input-number {
      width: unset;
    }
  }
}
</style>
