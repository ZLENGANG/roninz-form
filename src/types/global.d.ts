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
declare enum CompType {
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
  'input-number',

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
  'tree-select',
}

/**表单项配置 */
declare interface RFormItemProps {
  /**主键，必须唯一 */
  key: string;

  /**表单项名称 */
  label: string;

  /**表单项类型 */
  type?: keyof typeof CompType | string | import('vue').Component;

  /**是否隐藏 */
  hide?: boolean;

  /**栅格占位格数 */
  span?: number;

  /**是否占满一行 */
  full?: boolean;

  /**自定义样式名 */
  className?: string[];

  /**自定义样式对象 */
  style?: import('vue').StyleValue;

  /**初始值 */
  initValue?: any;

  /**是否禁用 */
  disabled?: boolean;

  /**下拉框等选项配置 */
  options?: any[];

  /**是否必填/必选 */
  required?: boolean;

  /**字段校验规则 */
  rules?: import('element-plus').FormItemRule[];

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
declare type AnyObject = {
  [key: string]: ModelValue;
};

/**自定义组件类型 */
declare type CustomCompType = {
  /**字段配置 */
  fieldConfig: RFormItemProps;
};

declare type RFormInstance = {
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
