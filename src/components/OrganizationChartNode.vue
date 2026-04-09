<template>
  <table v-if="node.title" class="org-table">
    <tbody>
      <tr>
        <td
          :colspan="childColspan"
          :class="{
            ['org-parent-level']: hasChildren,
            ['org-extend']: hasChildren && isExpanded,
          }"
        >
          <div class="org-node">
            <div class="org-container" @click="handleNodeClick">
              <div class="org-title" :class="node.titleClass || []">
                <RenderSlotContent
                  v-if="nodeTitleSlot"
                  :render="() => nodeTitleSlot?.({ node, depth, path })"
                />
                <template v-else>
                  {{ node.title }}
                </template>
              </div>
              <div
                v-if="hasMembers"
                class="org-content"
                :class="node.contentClass || []"
              >
                <div
                  v-for="(member, index) in node.member"
                  :key="getKeyForMember(member, index)"
                  class="org-content-item"
                  @click.stop="handleMemberClick(member, index)"
                >
                  <RenderSlotContent
                    v-if="memberSlot"
                    :render="() => memberSlot?.({ node, member, depth, path })"
                  />
                  <template v-else>
                    <div class="item-box">
                      <p class="item-title">{{ member.name }}</p>
                      <p class="item-add">{{ member.add }}</p>
                    </div>
                    <div v-if="member.image_url" class="avat">
                      <img
                        :src="member.image_url"
                        :alt="member.name ? `${member.name} avatar` : 'Member avatar'"
                      />
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <button
            v-if="hasChildren"
            type="button"
            class="org-extend-arrow"
            :aria-label="isExpanded ? 'Collapse node' : 'Expand node'"
            @click.stop="toggleNode"
          />
        </td>
      </tr>
      <tr v-if="hasChildren" :style="{ visibility: isExpanded ? 'visible' : 'hidden' }">
        <td
          v-for="(child, index) in node.children"
          :key="getKeyForChild(child, index)"
          colspan="2"
          class="org-child-level"
        >
          <OrganizationChartNodeView
            :node="child"
            :depth="depth + 1"
            :path="getPathForChild(child, index)"
            :expanded-state="expandedState"
            :node-title-slot="nodeTitleSlot"
            :member-slot="memberSlot"
            @toggle="$emit('toggle', $event)"
            @click-node="$emit('click-node', $event)"
            @select="$emit('select', $event)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType, type Slot } from "vue";
import RenderSlotContent from "./RenderSlotContent";
import type {
  OrganizationChartMemberSlotProps,
  OrganizationChartMember,
  OrganizationChartNode,
  OrganizationChartSelectPayload,
  OrganizationChartTogglePayload,
  OrganizationChartTitleSlotProps,
} from "../types";
import {
  getChildPath,
  getMemberKey,
  getMemberPath,
  getNodeKey,
} from "../utils/tree";

export default defineComponent({
  name: "OrganizationChartNodeView",
  components: {
    RenderSlotContent,
  },
  props: {
    node: {
      type: Object as PropType<OrganizationChartNode>,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
    path: {
      type: Array as PropType<string[]>,
      required: true,
    },
    expandedState: {
      type: Object as PropType<Record<string, boolean>>,
      required: true,
    },
    nodeTitleSlot: {
      type: Function as PropType<
        Slot<OrganizationChartTitleSlotProps> | undefined
      >,
      default: undefined,
    },
    memberSlot: {
      type: Function as PropType<
        Slot<OrganizationChartMemberSlotProps> | undefined
      >,
      default: undefined,
    },
  },
  emits: {
    toggle: (_payload: OrganizationChartTogglePayload) => true,
    "click-node": (_payload: OrganizationChartNode | OrganizationChartMember) =>
      true,
    select: (_payload: OrganizationChartSelectPayload) => true,
  },
  setup(props, { emit }) {
    const hasChildren = computed(
      () => Array.isArray(props.node.children) && props.node.children.length > 0
    );
    const hasMembers = computed(
      () => Array.isArray(props.node.member) && props.node.member.length > 0
    );
    const childColspan = computed(() =>
      hasChildren.value ? (props.node.children?.length ?? 0) * 2 : 1
    );
    const nodeKey = computed(() => getNodeKey(props.node, props.path));
    const isExpanded = computed(() =>
      hasChildren.value ? props.expandedState[nodeKey.value] !== false : false
    );

    const buildNodePayload = (): OrganizationChartSelectPayload => ({
      kind: "node",
      node: props.node,
      id: props.node.id,
      path: props.path,
    });

    const handleNodeClick = () => {
      emit("click-node", props.node);
      emit("select", buildNodePayload());
    };

    const handleMemberClick = (
      member: OrganizationChartMember,
      index: number
    ) => {
      emit("click-node", member);
      emit("select", {
        kind: "member",
        node: props.node,
        member,
        id: member.id ?? props.node.id,
        path: getMemberPath(props.path, member, index),
      });
    };

    const toggleNode = () => {
      emit("toggle", {
        node: props.node,
        path: props.path,
        value: !isExpanded.value,
      });
    };

    const getPathForChild = (child: OrganizationChartNode, index: number) =>
      getChildPath(props.path, child, index);

    const getKeyForChild = (child: OrganizationChartNode, index: number) =>
      getNodeKey(child, getPathForChild(child, index));

    const getKeyForMember = (
      member: OrganizationChartMember,
      index: number
    ) => getMemberKey(nodeKey.value, member, index);

    return {
      childColspan,
      getKeyForChild,
      getKeyForMember,
      getPathForChild,
      handleMemberClick,
      handleNodeClick,
      hasChildren,
      hasMembers,
      isExpanded,
      toggleNode,
    };
  },
});
</script>
