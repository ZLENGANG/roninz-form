<template>
  <r-form :fields="fieldConfigs" :formData="formData"></r-form>

  <!-- <el-select-v2
    v-model="value"
    :options="options"
    placeholder="Please select"
    size="large"
  /> -->
</template>

<script setup lang="ts">
import { ref } from "vue";

// const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

// const value = ref("Option 99999");
// const options = Array.from({ length: 100000 }).map((_, idx) => ({
//   value: `Option ${idx + 1}`,
//   label: `${initials[idx % 10]}${idx}`,
// }));

const formData = ref({});

setTimeout(() => {
  formData.value = {
    age: 18,
    // class: "n1",
  };
}, 2000);

const fieldConfigs = ref<RFormItemProps[]>([
  {
    key: "name",
    label: "姓名",
    required: true,
    rules: [
      {
        required: true,
        message: "姓名1不能为空！",
      },
    ],
    props: {
      placeholder: "请输入姓名",
    },
    events: {
      blur(e: EventTarget) {
        console.log(e);
      },
    },
  },
  {
    key: "age",
    label: "年龄",
    type: "input",
    hide: true,
  },
  {
    key: "age1",
    label: "年龄",
    type: "input",
  },
  {
    key: "age2",
    label: "年龄",
    type: "input",
  },
  {
    key: "class",
    label: "班级",
    // hide: true,
    type: "select",
    // disabled: true,
    // initValue: "n2",
    required: true,
    rules: [
      {
        required: true,
        message: "班级不能为空！",
      },
    ],
    options: [
      { label: "1班", value: "n1" },
      { label: "2班", value: "n2" },
    ],
  },
  {
    key: "age4",
    label: "年龄",
    type: "input",
    style: {
      width: "100px",
    },
  },
]);
</script>

<style></style>
