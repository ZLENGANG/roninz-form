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
}