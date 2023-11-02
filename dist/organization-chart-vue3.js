import { resolveComponent as C, openBlock as s, createElementBlock as o, createElementVNode as l, normalizeClass as h, toDisplayString as g, Fragment as _, renderList as y, withModifiers as f, createCommentVNode as c, normalizeStyle as k, createVNode as p } from "vue";
const D = (r, t) => {
  const n = r.__vccOpts || r;
  for (const [d, e] of t)
    n[d] = e;
  return n;
}, x = {
  name: "OrganizationChart",
  props: ["data"],
  data() {
    return {
      orgData: {}
    };
  },
  watch: {
    data: {
      handler: function(r) {
        const t = function(n) {
          return n.extend = !0, Array.isArray(n.children) && n.children.forEach((d) => {
            t(d);
          }), n;
        };
        r && (this.orgData = t(r));
      },
      immediate: !0
    }
  },
  methods: {
    setToggleExtend: function(r, t) {
      r.extend = t, Array.isArray(r.children) && r.children.forEach((n) => {
        this.setToggleExtend(n, t);
      }), this.$forceUpdate();
    },
    isChildren: function() {
      return Array.isArray(this.orgData.children) && this.orgData.children.length;
    },
    isMember: function() {
      return Array.isArray(this.orgData.member) && this.orgData.member.length;
    }
  }
}, A = { key: 0 }, E = ["colspan"], z = { class: "node" }, b = ["onClick"], O = { class: "item-box" }, N = { class: "item-title" }, w = { class: "item-add" }, L = {
  key: 0,
  class: "avat"
}, M = ["src"];
function T(r, t, n, d, e, a) {
  const v = C("OrganizationChart", !0);
  return e.orgData.title ? (s(), o("table", A, [
    l("tr", null, [
      l("td", {
        colspan: Array.isArray(e.orgData.children) ? e.orgData.children.length * 2 : 1,
        class: h({
          parentLevel: a.isChildren(),
          extend: a.isChildren() && e.orgData.extend
        })
      }, [
        l("div", z, [
          l("div", {
            class: "container",
            onClick: t[0] || (t[0] = (i) => r.$emit("click-node", e.orgData))
          }, [
            l("div", {
              class: h(["title", e.orgData.titleClass || []])
            }, g(e.orgData.title), 3),
            a.isMember() ? (s(), o("div", {
              key: 0,
              class: h(["content", e.orgData.contentClass || []])
            }, [
              (s(!0), o(_, null, y(e.orgData.member, (i, u) => (s(), o("div", {
                class: "content-item",
                onClick: f((m) => r.$emit("click-node", i), ["stop"])
              }, [
                l("div", O, [
                  l("p", N, g(i.name), 1),
                  l("p", w, g(i.add), 1)
                ]),
                i.image_url ? (s(), o("div", L, [
                  l("img", {
                    src: i.image_url
                  }, null, 8, M)
                ])) : c("", !0)
              ], 8, b))), 256))
            ], 2)) : c("", !0)
          ])
        ]),
        a.isChildren() ? (s(), o("div", {
          key: 0,
          class: "extend_arrow",
          onClick: t[1] || (t[1] = (i) => a.setToggleExtend(e.orgData, !e.orgData.extend))
        })) : c("", !0)
      ], 10, E)
    ]),
    a.isChildren() ? (s(), o("tr", {
      key: 0,
      style: k({ visibility: e.orgData.extend ? "visible" : "hidden" })
    }, [
      (s(!0), o(_, null, y(e.orgData.children, (i, u) => (s(), o("td", {
        key: u,
        colspan: "2",
        class: "childLevel"
      }, [
        p(v, {
          data: i,
          onClickNode: t[2] || (t[2] = (m) => r.$emit("click-node", m))
        }, null, 8, ["data"])
      ]))), 128))
    ], 4)) : c("", !0)
  ])) : c("", !0);
}
const B = /* @__PURE__ */ D(x, [["render", T]]);
export {
  B as default
};
