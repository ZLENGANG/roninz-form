/**通用表单属性 */
export interface RFormCommonProps {
  /**表单样式 */
  formStyle?: Partial<CSSStyleDeclaration>;

  /**表单配置 */
  formConfig: RFormItemProps[];
}

/**表单属性 */
export interface RFormProps extends RFormCommonProps {
  /** 是否已读 */
  readonly?: boolean;

  /**
   * 表单布局
   * - inline - 水平布局
   * - vertical - 垂直布局
   */
  layout?: "inline" | "vertical";
}

/**详情表单组件属性 */
export interface RReadonlyViewProps extends RFormCommonProps {}
