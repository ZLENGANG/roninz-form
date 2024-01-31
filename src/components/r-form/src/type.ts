import type { ElForm } from "element-plus";
import { Component } from "vue";

type GridCount = {
  /** 一行列数 */
  "--grid-count"?: number;
};

/**通用表单属性 */
export interface RFormCommonProps {
  /**表单样式 */
  style?: Partial<CSSStyleDeclaration> & GridCount;

  /**表单尺寸 */
  size?: (typeof ElForm)["size"];

  /**是否内联布局 */
  inline?: (typeof ElForm)["inline"];

  /**表单标签位置 */
  "label-position"?: (typeof ElForm)["labelPosition"];

  /**表单标签宽度 */
  labelWidth?: (typeof ElForm)["labelWidth"];

  /**内联布局时一行展示列数 */
  column?: number;

  /**表单数据 */
  formData: {
    [key: string]: any;
  };

  /**表单字段 */
  fields: RFormItemProps[];

  disabled?: boolean;
}

/**表单属性 */
export interface RFormProps extends RFormCommonProps {
  /** 是否已读 */
  readonly?: boolean;
}

/**详情表单组件属性 */
export interface RReadonlyViewProps extends RFormCommonProps {}

/**编辑表单组件属性 */
export interface RFormViewProps extends RFormCommonProps {}

/**表单项类型
 * | 类型 | 说明 |
 * | --- | --- |
 * | autocomplete | 自动补全输入框 |
 * | cascader | 级联选择器 |
 * | checkbox | 复选框 |
 * | color | 颜色选择 |
 * | date | 日期选择 |
 * | input | 文本框 |
 * | textarea | 文本域 |
 * | input-number | 数字输入框 |
 * | radio | 单选框 |
 * | rate | 评分 |
 * | select | 下拉框 |
 * | slider | 滑块 |
 * | switch | 开关 |
 * | transfer | 穿梭框 |
 * | upload | 文件上传 |
 */
export enum CompType {
  /**自动补全输入框 */
  autocomplete,

  /**级联选择器 */
  cascader,

  /**复选框 */
  checkbox,

  /**颜色选择 */
  color,

  /**日期选择 */
  date,

  /**输入框 */
  input,

  /**文本域 */
  textarea,

  /**数字输入框 */
  "input-number",

  /**单选框 */
  radio,

  /**评分 */
  rate,

  /**下拉框 */
  select,

  /**滑块 */
  slider,

  /**开关 */
  switch,

  /**穿梭框 */
  transfer,

  /**文件上传 */
  upload,

  /**日历 */
  calendar,

  /**树形选择 */
  "tree-select",
}

/**表单项配置 */
export interface RFormItemProps {
  /**主键，必须唯一 */
  key: string;

  /**表单项名称 */
  label: string;

  /**表单项类型 */
  type?: keyof typeof CompType | string | import("vue").Component;

  /**是否隐藏 */
  hide?: boolean | ((arg0: AnyObject) => boolean);

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
  disabled?: boolean | ((arg0: AnyObject) => boolean);

  /**下拉框等选项配置 */
  options?: any[] | string;

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

/**表单项组件属性 */
export interface RFormComponentProps {
  value: any;
  formItem: RFormItemProps;
  formData: AnyObject;
  disabled: boolean;
}

/**表单实例 */
export type RFormInstance = {
  /**校验表单*/
  validate?: () => Promise<any> | undefined;

  /**滚动到指定字段*/
  scrollToField?: (key: string) => void;

  /**重置表单*/
  resetFields?: () => void;

  /**
   * 根据key获取表单项实例
   * @param key string
   * @returns RFormItemProps
   */
  getFieldConfigByKey?: (key: string) => RFormItemProps | undefined;

  /**
   * 根据key获取表单项值
   * @param key string
   * @returns ModelValue
   */
  getFieldValueByKey?: (key: string) => ModelValue;

  /**
   * 获取表单项配置，不传则获取所有表单项配置
   * @param keys string[]
   * @returns ModelValue
   */
  getFieldsConfig?: <T extends string[]>(
    keys?: T
  ) => { [key in T[number]]: RFormItemProps };

  /**
   * 获取表单项值，不传则获取所有表单项值
   * @param keys string[]
   * @returns ModelValue
   */
  getFieldsValue?: <T extends string[]>(
    keys?: T
  ) => { [key in T[number]]: ModelValue };

  /**
   * 设置字段的值
   * @param key string | AnyObject 字段名
   * @param value ModelValue 需要设置的值
   * @returns void
   */
  setFieldValue?: (key: string | AnyObject, value?: ModelValue) => void;

  /**
   * 设置字段
   * @param key string | AnyObject 字段名
   * @param config RFormItemProps 需要设置的字段属性
   * @returns void
   */
  setField?: (
    key: string | { [key: string]: Partial<RFormItemProps> },
    config?: Partial<RFormItemProps>
  ) => void;
};

/**自定义组件类型 */
export type CustomCompType = {
  /**字段配置 */
  fieldConfig: RFormItemProps;
};

export type FormComponents = Record<keyof typeof CompType | string, Component>;
