import { RFormCommonProps, RFormItemProps } from '../..';

export interface FormItemSlotProps {
  /**表单项配置 */
  formItem: RFormItemProps;

  /**表单数据 */
  formData: RFormCommonProps['formData'];

  /**插槽 */
  slots: {
    [key: string]: any;
  };
}
