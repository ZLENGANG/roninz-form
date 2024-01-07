import type { ElForm, FormRules } from 'element-plus';

type GridCount = {
  /** 一行列数 */
  '--grid-count'?: number;
};

/**通用表单属性 */
export interface RFormCommonProps {
  /**表单样式 */
  style?: Partial<CSSStyleDeclaration> & GridCount;

  /**表单尺寸 */
  size?: 'small' | 'medium' | 'large' | '';

  /**表单验证规则 */
  rules?: FormRules;

  /**是否内联布局 */
  inline?: boolean;

  /**表单标签位置 */
  'label-position'?: 'left' | 'right' | 'top';

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

  /**
   * 表单布局
   * - inline - 水平布局
   * - vertical - 垂直布局
   */
  layout?: 'inline' | 'vertical';
}

/**详情表单组件属性 */
export interface RReadonlyViewProps extends RFormCommonProps {}

/**编辑表单组件属性 */
export interface RFormViewProps extends RFormCommonProps {}
