import type { ElForm, FormRules } from "element-plus";

type GridCount = {
  /** 一行列数 */
  "--grid-count"?: number;
};

/**通用表单属性 */
export interface RFormCommonProps {
  /**表单样式 */
  style?: Partial<CSSStyleDeclaration> & GridCount;

  /**表单尺寸 */
  size?: ElForm["size"];

  /**表单验证规则 */
  // rules?: FormRules;

  /**是否内联布局 */
  inline?: ElForm["inline"];

  /**表单标签位置 */
  "label-position"?: ElForm["labelPosition"];

  /**表单标签宽度 */
  labelWidth?: ElForm["labelWidth"];

  /**表单数据 */
  formData: {
    [key: string]: any;
  };

  /**表单字段 */
  fields: RFormItemProps[];
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

/**表单项组件属性 */
export interface RFormComponentProps {
  value: any;
  formItem: RFormItemProps;
}
