/**表单项类型
 * | 类型 | 说明 |
 * | --- | --- |
 * | input | 文本框 |
 * | autocomplete | 自动补全输入框 |
 * | input-number | 数字输入框 |
 * | date | 日期选择 |
 * | radio | 单选框 |
 * | input-money | 金额输入框 |
 * | textarea | 文本域 |
 * | select | 下拉框 |
 * | checkbox | 复选框 |
 */
declare enum CompType {
  /**输入框 */
  input,

  /**自动补全输入框 */
  autocomplete,

  /**数字输入框 */
  "input-number",

  /**下拉框 */
  select,

  /**日期选择 */
  date,

  /**单选框 */
  radio,

  /**评分 */
  rate,

  /**滑块 */
  slider,

  /**开关 */
  switch,

  /**穿梭框 */
  transfer,

  /**文件上传 */
  upload,

  /**级联选择器 */
  cascader,

  /**复选框 */
  checkbox,
}

/**表单项配置 */
declare interface RFormItemProps {
  /**主键，必须唯一 */
  key: string;

  /**表单项名称 */
  label: string;

  /**表单项类型 */
  type?: keyof typeof CompType;

  /**是否隐藏 */
  hide?: boolean;

  /**栅格占位格数 */
  span?: number;

  /**是否占满一行 */
  full?: boolean;

  /**自定义样式名 */
  className?: string[];

  /**自定义样式对象 */
  style?: import("vue").StyleValue;

  /**初始值 */
  initValue?: any;

  /**是否禁用 */
  disabled?: boolean;

  /**下拉框等选项配置 */
  options?: any[];

  /**是否必填/必选 */
  required?: boolean;

  /**字段校验规则 */
  rules?: import("element-plus").FormItemRule[];

  /**组件属性 */
  props?: any;

  /**组件事件 */
  events?: any;

  /**表单项插槽 */
  slot?: string;

  /**渲染函数 */
  render?: Function;

  /**组件插槽 */
  compSlots?: any;

  [key: string]: any;
}

declare type ModelValue = boolean | string | number | any[];
