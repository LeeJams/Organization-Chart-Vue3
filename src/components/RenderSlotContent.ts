import { defineComponent, type PropType, type VNodeChild } from "vue";

export default defineComponent({
  name: "RenderSlotContent",
  props: {
    render: {
      type: Function as PropType<() => VNodeChild>,
      required: true,
    },
  },
  setup(props) {
    return () => props.render();
  },
});
