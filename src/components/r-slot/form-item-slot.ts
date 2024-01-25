import { defineComponent, useAttrs, h } from 'vue';
import { FormItemSlotProps } from './type';

export default defineComponent<FormItemSlotProps>({
  name: 'FormItemSlot',
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
      return h('div', attrs.slots[slotName](params));
    }
  },
});
