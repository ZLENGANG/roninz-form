import { useAttrs, defineComponent } from "vue";

interface RenderSlotProps {
  /**渲染函数 */
  render: Function;
}

export default defineComponent<RenderSlotProps>({
  name: "CompSlot",
  render() {
    const attrs = useAttrs();
    const renderFn = attrs.render as unknown as Function;
    if (renderFn) {
      return renderFn();
    }
  },
});
