<template>
  <table v-if="orgData.title">
    <tr>
      <td
        :colspan="
          Array.isArray(orgData.children) ? orgData.children.length * 2 : 1
        "
        :class="{
          parentLevel: isChildren(),
          extend: isChildren() && orgData.extend,
        }"
      >
        <div class="node">
          <div class="container" @click="$emit('click-node', orgData)">
            <div class="title" :class="orgData.titleClass || []">
              {{ orgData.title }}
            </div>
            <div
              class="content"
              v-if="isMember()"
              :class="orgData.contentClass || []"
            >
              <div
                class="content-item"
                v-for="(member, index) in orgData.member"
                @click.stop="$emit('click-node', member)"
              >
                <div class="item-box">
                  <p class="item-title">{{ member.name }}</p>
                  <p class="item-add">{{ member.add }}</p>
                </div>
                <div class="avat" v-if="member.image_url">
                  <img :src="member.image_url" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="extend_arrow"
          v-if="isChildren()"
          @click="setToggleExtend(orgData, !orgData.extend)"
        ></div>
      </td>
    </tr>
    <tr
      v-if="isChildren()"
      :style="{ visibility: orgData.extend ? 'visible' : 'hidden' }"
    >
      <td
        v-for="(children, index) in orgData.children"
        :key="index"
        colspan="2"
        class="childLevel"
      >
        <OrganizationChart
          :data="children"
          @click-node="$emit('click-node', $event)"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import "../assets/style.css";
export default {
  name: "OrganizationChart",
  props: ["data"],
  data() {
    return {
      orgData: {},
    };
  },
  watch: {
    data: {
      handler: function (Props) {
        const extendKey = function (orgData) {
          orgData.extend = true;
          if (Array.isArray(orgData.children)) {
            orgData.children.forEach((c) => {
              extendKey(c);
            });
          }
          return orgData;
        };
        if (Props) {
          this.orgData = extendKey(Props);
        }
      },
      immediate: true,
    },
  },
  methods: {
    setToggleExtend: function (orgData, extend) {
      orgData.extend = extend;
      Array.isArray(orgData.children) &&
        orgData.children.forEach((c) => {
          this.setToggleExtend(c, extend);
        });
      this.$forceUpdate();
    },
    isChildren: function () {
      return (
        Array.isArray(this.orgData.children) && this.orgData.children.length
      );
    },
    isMember: function () {
      return Array.isArray(this.orgData.member) && this.orgData.member.length;
    },
  },
};
</script>
