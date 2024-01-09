import { defineComponent, useAttrs, h } from "vue";
import { RFormCommonProps } from "../..";

interface FormItemSlotProps {
  /**表单项配置 */
  formItem: RFormItemProps;

  /**表单数据 */
  formData: RFormCommonProps["formData"];

  /**插槽 */
  slots: {
    [key: string]: any;
  };
}

export default defineComponent<FormItemSlotProps>({
  name: "FormItemSlot",
  render() {
    const attrs = useAttrs() as unknown as FormItemSlotProps;
    const slotName = attrs?.formItem?.slot;
    const data = attrs?.formItem;

    const params = {
      data,
      key: data.key,
      formData: attrs.formData,
    };
    if (slotName) {
      return h("div", attrs.slots[slotName](params));
    }
  },
});
