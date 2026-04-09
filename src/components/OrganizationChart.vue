<template>
  <OrganizationChartNodeView
    :node="data"
    :depth="0"
    :path="rootPath"
    :expanded-state="expandedState"
    :node-title-slot="$slots['node-title']"
    :member-slot="$slots.member"
    @toggle="toggleNode"
    @click-node="emitLegacySelect"
    @select="emitSelect"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  watch,
  type PropType,
} from "vue";
import "../assets/style.css";
import OrganizationChartNodeView from "./OrganizationChartNode.vue";
import type {
  OrganizationChartMember,
  OrganizationChartNode,
  OrganizationChartSelectPayload,
  OrganizationChartTogglePayload,
} from "../types";
import { getChildPath, getNodeKey, getRootPath } from "../utils/tree";

export default defineComponent({
  name: "OrganizationChart",
  components: {
    OrganizationChartNodeView,
  },
  props: {
    data: {
      type: Object as PropType<OrganizationChartNode>,
      required: true,
    },
    defaultExpandAll: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    "click-node": (_payload: OrganizationChartNode | OrganizationChartMember) =>
      true,
    select: (_payload: OrganizationChartSelectPayload) => true,
  },
  setup(props, { emit }) {
    const expandedState = reactive<Record<string, boolean>>({});
    const rootPath = computed(() => getRootPath(props.data));

    const syncExpandedState = () => {
      const nextKeys = new Set<string>();

      const visit = (node: OrganizationChartNode, path: string[]) => {
        const key = getNodeKey(node, path);

        nextKeys.add(key);
        if (!(key in expandedState)) {
          expandedState[key] = props.defaultExpandAll;
        }

        node.children?.forEach((child, index) => {
          visit(child, getChildPath(path, child, index));
        });
      };

      visit(props.data, getRootPath(props.data));

      Object.keys(expandedState).forEach((key) => {
        if (!nextKeys.has(key)) {
          delete expandedState[key];
        }
      });
    };

    watch([() => props.data, () => props.defaultExpandAll], syncExpandedState, {
      deep: true,
      immediate: true,
    });

    const toggleNode = ({
      node,
      path,
      value,
    }: OrganizationChartTogglePayload) => {
      const applyToSubtree = (
        currentNode: OrganizationChartNode,
        currentPath: string[]
      ) => {
        expandedState[getNodeKey(currentNode, currentPath)] = value;
        currentNode.children?.forEach((child, index) => {
          applyToSubtree(child, getChildPath(currentPath, child, index));
        });
      };

      applyToSubtree(node, path);
    };

    const emitLegacySelect = (
      payload: OrganizationChartNode | OrganizationChartMember
    ) => {
      emit("click-node", payload);
    };

    const emitSelect = (payload: OrganizationChartSelectPayload) => {
      emit("select", payload);
    };

    return {
      emitLegacySelect,
      emitSelect,
      expandedState,
      rootPath,
      toggleNode,
    };
  },
});
</script>
