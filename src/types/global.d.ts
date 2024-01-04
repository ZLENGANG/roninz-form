type GridCount = {
  /** 一行列数 */
  '--grid-count'?: number;
};

/**表单项配置 */
declare interface RFormItemProps {
  /**主键，必须唯一 */
  key: string;

  /**表单项名称 */
  label: string;

  /**表单项类型 */
  type?: string;

  /**是否隐藏 */
  hide?: boolean;

  /**栅格占位格数 */
  span?: number;

  /**是否占满一行 */
  full?: boolean;

  /**自定义样式名 */
  className?: string[];

  /**自定义样式对象 */
  style?: Partial<CSSStyleDeclaration> & GridCount;

  [key: string]: any;
}
