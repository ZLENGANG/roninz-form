/**表单项配置 */
declare interface RFormItemProps {
  /**主键，必须唯一 */
  key: string;

  /**表单项名称 */
  label: string;

  /**表单项类型
   * | 类型 | 说明 |
   * | --- | --- |
   * | input | 文本框 |
   * | input-number | 数字输入框 |
   * | input-money | 金额输入框 |
   * | textarea | 文本域 |
   * | select | 下拉框 |
   * | checkbox | 复选框 |
   * | radio | 单选框 |
   * | date | 日期选择 |
   */
  type?:
    | "input"
    | "input-number"
    | "input-money"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "date";

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

  /**组件配置 */
  config?: any;

  [key: string]: any;
}
