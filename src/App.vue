<template>
  <r-form :fields="fieldConfigs" :formData="formData" ref="RRormRef">
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
  <el-button type="primary" @click="submit">提交</el-button>
</template>

<script setup lang="ts">
// import { ElSelectV2 } from 'element-plus';
import { h, ref } from 'vue';
import { ElButton } from 'element-plus';

// const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

// const value = ref("Option 99999");
// const options = Array.from({ length: 100000 }).map((_, idx) => ({
//   value: `Option ${idx + 1}`,
//   label: `${initials[idx % 10]}${idx}`,
// }));

const formData = ref({});
const RRormRef = ref(null);

setTimeout(() => {
  formData.value = {
    age: 18,
    // class: "n1",
    // checkbox: ['cn'],
  };
}, 200);

const fieldConfigs = ref<RFormItemProps[]>([
  {
    key: 'name',
    label: '姓名',
    required: true,
    rules: [
      // {
      //   required: true,
      //   message: '姓名1不能为空！',
      // },
    ],
    props: {
      placeholder: '请输入姓名',
    },
    events: {},
    compSlots: {
      prefix() {
        return h('span', 'prefix');
      },
      suffix() {
        return h(
          ElButton,
          {
            type: 'primary',
            onClick() {
              console.log(formData.value);
            },
          },
          () => '查看'
        );
      },
    },
  },
  {
    key: 'age',
    label: '年龄',
    type: 'input',
    hide: true,
  },
  {
    key: 'age1',
    label: '年龄',
    type: 'input',
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
    key: 'age2',
    label: '年龄',
    type: 'input',
    // slot: "slot-age2",
    required: true,
  },
  {
    key: 'class',
    label: '班级',
    // hide: true,
    type: 'select',
    // disabled: true,
    // initValue: 'n2',
    required: true,
    rules: [
      {
        required: true,
        message: '班级不能为空！',
      },
    ],
    options: [
      { label: '1班', value: 'n1' },
      { label: '2班', value: 'n2' },
    ],
    props: {},
    events: {},
  },
  {
    key: 'searchSuggest',
    label: '搜索建议',
    type: 'autocomplete',
    required: true,
    props: {
      'fetch-suggestions': (q: string, cb: Function) => {
        console.log(q);
        const arr = [
          { value: 'vue', link: 'https://github.com/vuejs/vue' },
          { value: 'element', link: 'https://github.com/ElemeFE/element' },
        ];
        cb(arr.filter((item) => item.value.indexOf(q) > -1));
      },
    },
  },
  {
    key: 'input-number',
    label: '数字输入框',
    type: 'input-number',
    required: true,
    props: {},
  },

  {
    key: 'date',
    label: '日期选择',
    type: 'date',
    required: true,
    props: {
      type: 'daterange',
    },
  },

  {
    key: 'radio',
    label: '单选框',
    type: 'radio',
    required: true,
    // initValue: 'n1',
    options: [
      { label: '选项1', value: 'n1' },
      { label: '选项2', value: 'n2' },
    ],
    props: {
      border: true,
      // disabled: true,
      // type: 'button',
    },
  },

  {
    key: 'rate',
    label: '评分',
    type: 'rate',
    required: true,
    props: {},
  },

  {
    key: 'slider',
    label: '滑块',
    type: 'slider',
    required: true,
    props: {
      'show-input': true,
    },
  },

  {
    key: 'switch',
    label: '开关',
    type: 'switch',
    required: true,
    props: {
      'active-text': '是',
      'inactive-text': '否',
    },
  },

  {
    key: 'transfer',
    label: '穿梭框',
    type: 'transfer',
    required: true,
    props: {
      data: (() => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `Option ${i}`,
            disabled: i % 4 === 0,
          });
        }
        return data;
      })(),
    },
  },

  {
    key: 'upload',
    label: '上传',
    type: 'upload',
    required: true,
    props: {},
    compSlots: {
      default() {
        return h(
          ElButton,
          {
            type: 'primary',
          },
          () => '上传文件'
        );
      },
    },
  },

  {
    key: 'cascader',
    label: '级联选择器',
    type: 'cascader',
    required: true,
    props: {},
    options: [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'consistency',
                label: 'Consistency',
              },
              {
                value: 'feedback',
                label: 'Feedback',
              },
              {
                value: 'efficiency',
                label: 'Efficiency',
              },
              {
                value: 'controllability',
                label: 'Controllability',
              },
            ],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'side nav',
                label: 'Side Navigation',
              },
              {
                value: 'top nav',
                label: 'Top Navigation',
              },
            ],
          },
        ],
      },
      {
        value: 'component',
        label: 'Component',
        children: [
          {
            value: 'basic',
            label: 'Basic',
            children: [
              {
                value: 'layout',
                label: 'Layout',
              },
              {
                value: 'color',
                label: 'Color',
              },
              {
                value: 'typography',
                label: 'Typography',
              },
              {
                value: 'icon',
                label: 'Icon',
              },
              {
                value: 'button',
                label: 'Button',
              },
            ],
          },
          {
            value: 'form',
            label: 'Form',
            children: [
              {
                value: 'radio',
                label: 'Radio',
              },
              {
                value: 'checkbox',
                label: 'Checkbox',
              },
              {
                value: 'input',
                label: 'Input',
              },
              {
                value: 'input-number',
                label: 'InputNumber',
              },
              {
                value: 'select',
                label: 'Select',
              },
              {
                value: 'cascader',
                label: 'Cascader',
              },
              {
                value: 'switch',
                label: 'Switch',
              },
              {
                value: 'slider',
                label: 'Slider',
              },
              {
                value: 'time-picker',
                label: 'TimePicker',
              },
              {
                value: 'date-picker',
                label: 'DatePicker',
              },
              {
                value: 'datetime-picker',
                label: 'DateTimePicker',
              },
              {
                value: 'upload',
                label: 'Upload',
              },
              {
                value: 'rate',
                label: 'Rate',
              },
              {
                value: 'form',
                label: 'Form',
              },
            ],
          },
          {
            value: 'data',
            label: 'Data',
            children: [
              {
                value: 'table',
                label: 'Table',
              },
              {
                value: 'tag',
                label: 'Tag',
              },
              {
                value: 'progress',
                label: 'Progress',
              },
              {
                value: 'tree',
                label: 'Tree',
              },
              {
                value: 'pagination',
                label: 'Pagination',
              },
              {
                value: 'badge',
                label: 'Badge',
              },
            ],
          },
          {
            value: 'notice',
            label: 'Notice',
            children: [
              {
                value: 'alert',
                label: 'Alert',
              },
              {
                value: 'loading',
                label: 'Loading',
              },
              {
                value: 'message',
                label: 'Message',
              },
              {
                value: 'message-box',
                label: 'MessageBox',
              },
              {
                value: 'notification',
                label: 'Notification',
              },
            ],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'menu',
                label: 'Menu',
              },
              {
                value: 'tabs',
                label: 'Tabs',
              },
              {
                value: 'breadcrumb',
                label: 'Breadcrumb',
              },
              {
                value: 'dropdown',
                label: 'Dropdown',
              },
              {
                value: 'steps',
                label: 'Steps',
              },
            ],
          },
          {
            value: 'others',
            label: 'Others',
            children: [
              {
                value: 'dialog',
                label: 'Dialog',
              },
              {
                value: 'tooltip',
                label: 'Tooltip',
              },
              {
                value: 'popover',
                label: 'Popover',
              },
              {
                value: 'card',
                label: 'Card',
              },
              {
                value: 'carousel',
                label: 'Carousel',
              },
              {
                value: 'collapse',
                label: 'Collapse',
              },
            ],
          },
        ],
      },
      {
        value: 'resource',
        label: 'Resource',
        children: [
          {
            value: 'axure',
            label: 'Axure Components',
          },
          {
            value: 'sketch',
            label: 'Sketch Templates',
          },
          {
            value: 'docs',
            label: 'Design Documentation',
          },
        ],
      },
    ],
  },

  {
    key: 'checkbox',
    label: '复选框',
    type: 'checkbox',
    required: true,
    options: [
      { label: '中文', value: 'cn' },
      { label: '英文', value: 'en' },
    ],
    props: {
      // type: 'button',
      border: true,
    },
  },

  {
    key: 'color',
    label: '颜色选择',
    type: 'color',
    required: true,
  },
]);

function submit() {
  console.log(RRormRef.value);
}
</script>

<style></style>
