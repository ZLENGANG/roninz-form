<template>
  <r-form :fields="fieldConfigs" :formData="formData">
    <!-- <template v-slot:slot-age2>
      <el-button>click me</el-button>
    </template> -->

    <template #slot-age2>
      <el-button type="primary">click me</el-button>
    </template>
  </r-form>

  <!-- <el-select-v2
    v-model="value"
    :options="options"
    placeholder="Please select"
    size="large"
  /> -->
</template>

<script setup lang="ts">
// import { ElSelectV2 } from 'element-plus';
import { h, ref } from "vue";
import { ElButton } from "element-plus";

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
    events: {},
    compSlots: {
      prefix() {
        return h("span", "prefix");
      },
      suffix() {
        return h(
          ElButton,
          {
            type: "primary",
            onClick() {
              console.log("click");
            },
          },
          () => "查看"
        );
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
    // render() {
    //   return h(
    //     ElButton,
    //     {
    //       type: "primary",
    //       onClick() {
    //         console.log("click");
    //       },
    //     },
    //     () => "查看"
    //   );
    // },
  },
  {
    key: "age2",
    label: "年龄",
    type: "input",
    // slot: "slot-age2",
    required: true,
  },
  {
    key: "class",
    label: "班级",
    // hide: true,
    type: "select",
    // disabled: true,
    // initValue: 'n2',
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
    props: {},
    events: {},
  },
  {
    key: "searchSuggest",
    label: "搜索建议",
    type: "autocomplete",
    required: true,
    props: {
      "fetch-suggestions": (q: string, cb: Function) => {
        console.log(q);
        const arr = [
          { value: "vue", link: "https://github.com/vuejs/vue" },
          { value: "element", link: "https://github.com/ElemeFE/element" },
        ];
        cb(arr.filter((item) => item.value.indexOf(q) > -1));
      },
    },
  },
  {
    key: "input-number",
    label: "数字输入框",
    type: "input-number",
    required: true,
    initValue: 0,
    props: {
      precision: 2,
    },
  },

  {
    key: "date",
    label: "日期选择",
    type: "date",
    required: true,
    props: {
      type: "daterange",
    },
  },

  {
    key: "radio",
    label: "单选框",
    type: "radio",
    required: true,
    initValue: "n2",
    options: [
      { label: "选项1", value: "n1" },
      { label: "选项2", value: "n2" },
    ],
    props: {},
  },
]);
</script>

<style></style>
