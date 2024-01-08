import { ComponentPublicInstance, defineComponent } from 'vue';

export default defineComponent({
  name: 'ExtendSlot',
  render(ctx: ComponentPublicInstance) {
    const renderFn = ctx.$attrs.render as unknown as Function;
    if (renderFn) {
      return renderFn();
    }
  },
});
