<template>
  <el-button type="primary" @click="submit">校验</el-button>
  <el-button type="primary" @click="getFieldConfigyKey"
    >获取指定字段配置</el-button
  >

  <el-button type="primary" @click="getFieldValueByKey"
    >获取指定字段值</el-button
  >

  <el-button type="primary" @click="getFieldsValue"
    >输入数组获取指定字段值</el-button
  >

  <el-button type="primary" @click="getFieldsConfig"
    >输入数组获取指定字段配置</el-button
  >

  <el-button type="primary" @click="setFieldValue">设置字段值</el-button>
  <el-button type="primary" @click="setField">设置字段</el-button>
  <el-button type="primary" @click="scrollToField">跳转到指定字段</el-button>
  <el-button type="primary" @click="resetFields">重置表单</el-button>

  <div
    v-if="isShow"
    style="margin: 0 auto; padding: 20px; boxshadow: var(--el-box-shadow-dark)"
  >
    <r-form :fields="fieldConfigs" :formData="formData" ref="RRormRef">
      <!-- <template v-slot:slot-age2>
        <el-button>click me</el-button>
      </template> -->

      <template #slot-age2>
        <el-button type="primary">click me</el-button>
      </template>

      <template #label-age1>
        <span style="color: red">花里胡哨的名字</span>
      </template>
    </r-form>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { ElButton } from "element-plus";
import { RFormInstance, RFormItemProps, RForm } from "../src/components";

const formData = ref({});
const RRormRef = ref<RFormInstance>();
const isShow = ref(true);

setTimeout(() => {
  formData.value = {
    age: 18,
    // class: "n1",
    // checkbox: ['cn'],
    upload: [
      {
        name: "element-plus-logo.svg",
        url: "https://element-plus.org/images/element-plus-logo.svg",
      },
      {
        name: "element-plus-logo2.svg",
        url: "https://element-plus.org/images/element-plus-logo.svg",
      },
    ],
    // "m-select": "3",
  };
}, 0);

const fieldConfigs = ref<RFormItemProps[]>([
  {
    key: "name",
    label: "姓名",
    required: true,
    initValue: "zl",
    rules: [
      // {
      //   required: true,
      //   message: '姓名1不能为空！',
      // },
    ],
    props: {
      // placeholder: '请输入姓名',
    },
    events: {
      blur() {
        console.log("blur");
      },
    },
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
              console.log(formData.value);
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
    initValue: 26,
  },
  {
    key: "age1",
    label: "年龄",
    type: "input",
    initValue: 26,
    disabled(arg0) {
      return arg0.rate === 3;
    },
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
    initValue: 26,
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
    initValue: "n1",
  },
  {
    key: "searchSuggest",
    label: "搜索建议",
    type: "autocomplete",
    required: true,
    props: {
      "fetch-suggestions": (q: string, cb: Function) => {
        const arr = [
          { value: "vue", link: "https://github.com/vuejs/vue" },
          { value: "element", link: "https://github.com/ElemeFE/element" },
        ];
        cb(arr.filter((item) => item.value.indexOf(q) > -1));
      },
    },
    initValue: "vue",
  },
  {
    key: "input-number",
    label: "数字输入框",
    type: "input-number",
    required: true,
    props: {},
    initValue: 4,
  },

  {
    key: "date",
    label: "日期选择",
    type: "date",
    required: true,
    initValue: "2020-10-10",
  },

  {
    key: "rate",
    label: "评分",
    type: "rate",
    required: true,
    props: {},
    initValue: 5,
  },
  {
    key: "radio",
    label: "单选框",
    type: "radio",
    required: true,
    full: true,
    // initValue: 'n1',
    options: [
      { label: "选项1", value: "n1" },
      { label: "选项2", value: "n2" },
      { label: "选项3", value: "n3" },
    ],
    props: {
      border: true,
      // disabled: true,
      // type: 'button',
    },
    initValue: "n1",
  },

  {
    key: "slider",
    label: "滑块",
    type: "slider",
    required: true,
    props: {
      "show-input": true,
    },
    initValue: 30,
  },

  {
    key: "switch",
    label: "开关",
    type: "switch",
    required: true,
    props: {
      "active-text": "是",
      "inactive-text": "否",
    },
    initValue: true,
  },

  {
    key: "cascader",
    label: "级联选择器",
    type: "cascader",
    required: true,
    props: {},
    options: [
      {
        value: "guide",
        label: "Guide",
        children: [
          {
            value: "disciplines",
            label: "Disciplines",
            children: [
              {
                value: "consistency",
                label: "Consistency",
              },
              {
                value: "feedback",
                label: "Feedback",
              },
              {
                value: "efficiency",
                label: "Efficiency",
              },
              {
                value: "controllability",
                label: "Controllability",
              },
            ],
          },
          {
            value: "navigation",
            label: "Navigation",
            children: [
              {
                value: "side nav",
                label: "Side Navigation",
              },
              {
                value: "top nav",
                label: "Top Navigation",
              },
            ],
          },
        ],
      },
      {
        value: "component",
        label: "Component",
        children: [
          {
            value: "basic",
            label: "Basic",
            children: [
              {
                value: "layout",
                label: "Layout",
              },
              {
                value: "color",
                label: "Color",
              },
              {
                value: "typography",
                label: "Typography",
              },
              {
                value: "icon",
                label: "Icon",
              },
              {
                value: "button",
                label: "Button",
              },
            ],
          },
          {
            value: "form",
            label: "Form",
            children: [
              {
                value: "radio",
                label: "Radio",
              },
              {
                value: "checkbox",
                label: "Checkbox",
              },
              {
                value: "input",
                label: "Input",
              },
              {
                value: "input-number",
                label: "InputNumber",
              },
              {
                value: "select",
                label: "Select",
              },
              {
                value: "cascader",
                label: "Cascader",
              },
              {
                value: "switch",
                label: "Switch",
              },
              {
                value: "slider",
                label: "Slider",
              },
              {
                value: "time-picker",
                label: "TimePicker",
              },
              {
                value: "date-picker",
                label: "DatePicker",
              },
              {
                value: "datetime-picker",
                label: "DateTimePicker",
              },
              {
                value: "upload",
                label: "Upload",
              },
              {
                value: "rate",
                label: "Rate",
              },
              {
                value: "form",
                label: "Form",
              },
            ],
          },
          {
            value: "data",
            label: "Data",
            children: [
              {
                value: "table",
                label: "Table",
              },
              {
                value: "tag",
                label: "Tag",
              },
              {
                value: "progress",
                label: "Progress",
              },
              {
                value: "tree",
                label: "Tree",
              },
              {
                value: "pagination",
                label: "Pagination",
              },
              {
                value: "badge",
                label: "Badge",
              },
            ],
          },
          {
            value: "notice",
            label: "Notice",
            children: [
              {
                value: "alert",
                label: "Alert",
              },
              {
                value: "loading",
                label: "Loading",
              },
              {
                value: "message",
                label: "Message",
              },
              {
                value: "message-box",
                label: "MessageBox",
              },
              {
                value: "notification",
                label: "Notification",
              },
            ],
          },
          {
            value: "navigation",
            label: "Navigation",
            children: [
              {
                value: "menu",
                label: "Menu",
              },
              {
                value: "tabs",
                label: "Tabs",
              },
              {
                value: "breadcrumb",
                label: "Breadcrumb",
              },
              {
                value: "dropdown",
                label: "Dropdown",
              },
              {
                value: "steps",
                label: "Steps",
              },
            ],
          },
          {
            value: "others",
            label: "Others",
            children: [
              {
                value: "dialog",
                label: "Dialog",
              },
              {
                value: "tooltip",
                label: "Tooltip",
              },
              {
                value: "popover",
                label: "Popover",
              },
              {
                value: "card",
                label: "Card",
              },
              {
                value: "carousel",
                label: "Carousel",
              },
              {
                value: "collapse",
                label: "Collapse",
              },
            ],
          },
        ],
      },
      {
        value: "resource",
        label: "Resource",
        children: [
          {
            value: "axure",
            label: "Axure Components",
          },
          {
            value: "sketch",
            label: "Sketch Templates",
          },
          {
            value: "docs",
            label: "Design Documentation",
          },
        ],
      },
    ],
    initValue: "consistency",
  },

  {
    key: "checkbox",
    label: "复选框",
    type: "checkbox",
    required: true,
    options: [
      { label: "中文", value: "cn" },
      { label: "英文", value: "en" },
    ],
    props: {
      // type: 'button',
      border: true,
    },
    initValue: ["en"],
  },

  {
    key: "color",
    label: "颜色选择",
    type: "color",
    required: true,
    initValue: "#eee",
  },

  {
    key: "tree-select",
    label: "树形选择框",
    type: "tree-select",
    required: true,
    props: {
      data: [
        {
          value: "1",
          label: "Level one 1",
          children: [
            {
              value: "1-1",
              label: "Level two 1-1",
              children: [
                {
                  value: "1-1-1",
                  label: "Level three 1-1-1",
                },
              ],
            },
          ],
        },
        {
          value: "2",
          label: "Level one 2",
          children: [
            {
              value: "2-1",
              label: "Level two 2-1",
              children: [
                {
                  value: "2-1-1",
                  label: "Level three 2-1-1",
                },
              ],
            },
            {
              value: "2-2",
              label: "Level two 2-2",
              children: [
                {
                  value: "2-2-1",
                  label: "Level three 2-2-1",
                },
              ],
            },
          ],
        },
        {
          value: "3",
          label: "Level one 3",
          children: [
            {
              value: "3-1",
              label: "Level two 3-1",
              children: [
                {
                  value: "3-1-1",
                  label: "Level three 3-1-1",
                },
              ],
            },
            {
              value: "3-2",
              label: "Level two 3-2",
              children: [
                {
                  value: "3-2-1",
                  label: "Level three 3-2-1",
                },
              ],
            },
          ],
        },
      ],
    },
    initValue: "2-1",
  },

  // {
  //   key: "transfer",
  //   label: "穿梭框",
  //   type: "transfer",
  //   required: true,
  //   full: true,
  //   props: {
  //     data: (() => {
  //       const data = [];
  //       for (let i = 1; i <= 15; i++) {
  //         data.push({
  //           key: i,
  //           label: `Option ${i}`,
  //           disabled: i % 4 === 0,
  //         });
  //       }
  //       return data;
  //     })(),
  //   },
  // },

  // {
  //   key: "upload",
  //   label: "上传",
  //   type: "upload",
  //   required: true,
  //   full: true,
  //   props: {
  //     action: "http://localhost:8081",
  //   },
  // },
  // {
  //   key: "calendar",
  //   label: "日历",
  //   type: "calendar",
  //   required: true,
  // },
  {
    key: "test",
    label: "测试",
    // type: Test,
    disabled(data) {
      return data.textarea === "2";
    },
    hide(arg0) {
      return arg0.textarea === "22";
    },
    initValue: "测试1",
  },
  {
    key: "textarea",
    label: "备注",
    type: "textarea",
    required: true,
    full: true,
    props: {
      maxlength: 100,
      showWordLimit: true,
    },
    disabled(arg0) {
      return arg0["m-select"] === "1";
    },
    initValue: "mark",
  },
  {
    key: "m-select",
    label: "我的下拉框",
    type: "m-select",
    required: true,
    opts: "d",
    initValue: "1",
    props: {
      // options:'zlzl',
      // opts: "getOption",
      // dd:'fdsf'
    },
  },
]);

function submit() {
  RRormRef.value?.validate?.();
}

function getFieldValueByKey() {
  const age = RRormRef.value?.getFieldValueByKey?.("name");
  console.log(age);
}

function getFieldConfigyKey() {
  const age = RRormRef.value?.getFieldConfigByKey?.("age");
  console.log(age);
}

function getFieldsValue() {
  const res = RRormRef.value?.getFieldsValue?.(["name", "age"]);
  console.log(res);
}

function getFieldsConfig() {
  const res = RRormRef.value?.getFieldsConfig?.();
  console.log(res);
}

function setFieldValue() {
  RRormRef.value?.setFieldValue?.({
    name: "zlzlzl",
    age1: "zlzlzl",
  });
}

function setField() {
  RRormRef.value?.setField?.({
    name: {
      label: "明细111",
      events: {
        // blur(e) {
        //   console.log(e.target.value);
        // },
        change() {
          console.log("change");
        },
      },
      compSlots: {
        prefix() {
          return h("span", "prefix1");
        },
        suffix() {
          return h(
            ElButton,
            {
              type: "primary",
              onClick() {
                console.log(formData.value);
              },
            },
            () => "查看"
          );
        },
      },
    },
    age1: {
      label: "年龄111",
    },
  });
}

function scrollToField() {
  RRormRef.value?.scrollToField?.("textarea");
}

function resetFields() {
  RRormRef.value?.resetFields?.();
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
