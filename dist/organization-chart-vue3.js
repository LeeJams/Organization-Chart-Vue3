import { resolveComponent as C, openBlock as o, createElementBlock as s, createElementVNode as l, normalizeClass as g, toDisplayString as h, Fragment as y, renderList as _, withModifiers as f, createCommentVNode as c, normalizeStyle as k, createVNode as p } from "vue";
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
}, A = {
  key: 0,
  class: "org-table"
}, E = ["colspan"], b = { class: "org-node" }, z = ["onClick"], O = { class: "item-box" }, N = { class: "item-title" }, w = { class: "item-add" }, M = {
  key: 0,
  class: "avat"
}, T = ["src"];
function V(r, t, n, d, e, a) {
  const v = C("OrganizationChart", !0);
  return e.orgData.title ? (o(), s("table", A, [
    l("tr", null, [
      l("td", {
        colspan: Array.isArray(e.orgData.children) ? e.orgData.children.length * 2 : 1,
        class: g({
          "org-parent-level": a.isChildren(),
          "org-extend": a.isChildren() && e.orgData.extend
        })
      }, [
        l("div", b, [
          l("div", {
            class: "org-container",
            onClick: t[0] || (t[0] = (i) => r.$emit("click-node", e.orgData))
          }, [
            l("div", {
              class: g(["org-title", e.orgData.titleClass || []])
            }, h(e.orgData.title), 3),
            a.isMember() ? (o(), s("div", {
              key: 0,
              class: g(["org-content", e.orgData.contentClass || []])
            }, [
              (o(!0), s(y, null, _(e.orgData.member, (i, u) => (o(), s("div", {
                class: "org-content-item",
                onClick: f((m) => r.$emit("click-node", i), ["stop"])
              }, [
                l("div", O, [
                  l("p", N, h(i.name), 1),
                  l("p", w, h(i.add), 1)
                ]),
                i.image_url ? (o(), s("div", M, [
                  l("img", {
                    src: i.image_url
                  }, null, 8, T)
                ])) : c("", !0)
              ], 8, z))), 256))
            ], 2)) : c("", !0)
          ])
        ]),
        a.isChildren() ? (o(), s("div", {
          key: 0,
          class: "org-extend-arrow",
          onClick: t[1] || (t[1] = (i) => a.setToggleExtend(e.orgData, !e.orgData.extend))
        })) : c("", !0)
      ], 10, E)
    ]),
    a.isChildren() ? (o(), s("tr", {
      key: 0,
      style: k({ visibility: e.orgData.extend ? "visible" : "hidden" })
    }, [
      (o(!0), s(y, null, _(e.orgData.children, (i, u) => (o(), s("td", {
        key: u,
        colspan: "2",
        class: "org-child-level"
      }, [
        p(v, {
          data: i,
          onClickNode: t[2] || (t[2] = (m) => r.$emit("click-node", m))
        }, null, 8, ["data"])
      ]))), 128))
    ], 4)) : c("", !0)
  ])) : c("", !0);
}
const S = /* @__PURE__ */ D(x, [["render", V]]);
export {
  S as default
};
