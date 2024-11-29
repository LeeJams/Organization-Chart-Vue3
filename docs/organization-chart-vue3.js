import { resolveComponent as C, openBlock as s, createElementBlock as l, createElementVNode as i, normalizeClass as g, toDisplayString as h, Fragment as y, renderList as _, withModifiers as f, createCommentVNode as c, normalizeStyle as k, createVNode as p } from "vue";
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
}, b = ["colspan"], E = { class: "org-node" }, z = ["onClick"], O = { class: "item-box" }, N = { class: "item-title" }, w = { class: "item-add" }, M = {
  key: 0,
  class: "avat"
}, T = ["src"];
function V(r, t, n, d, e, a) {
  const v = C("OrganizationChart", !0);
  return e.orgData.title ? (s(), l("table", A, [
    i("tbody", null, [
      i("tr", null, [
        i("td", {
          colspan: Array.isArray(e.orgData.children) ? e.orgData.children.length * 2 : 1,
          class: g({
            "org-parent-level": a.isChildren(),
            "org-extend": a.isChildren() && e.orgData.extend
          })
        }, [
          i("div", E, [
            i("div", {
              class: "org-container",
              onClick: t[0] || (t[0] = (o) => r.$emit("click-node", e.orgData))
            }, [
              i("div", {
                class: g(["org-title", e.orgData.titleClass || []])
              }, h(e.orgData.title), 3),
              a.isMember() ? (s(), l("div", {
                key: 0,
                class: g(["org-content", e.orgData.contentClass || []])
              }, [
                (s(!0), l(y, null, _(e.orgData.member, (o, u) => (s(), l("div", {
                  class: "org-content-item",
                  onClick: f((m) => r.$emit("click-node", o), ["stop"])
                }, [
                  i("div", O, [
                    i("p", N, h(o.name), 1),
                    i("p", w, h(o.add), 1)
                  ]),
                  o.image_url ? (s(), l("div", M, [
                    i("img", {
                      src: o.image_url
                    }, null, 8, T)
                  ])) : c("", !0)
                ], 8, z))), 256))
              ], 2)) : c("", !0)
            ])
          ]),
          a.isChildren() ? (s(), l("div", {
            key: 0,
            class: "org-extend-arrow",
            onClick: t[1] || (t[1] = (o) => a.setToggleExtend(e.orgData, !e.orgData.extend))
          })) : c("", !0)
        ], 10, b)
      ]),
      a.isChildren() ? (s(), l("tr", {
        key: 0,
        style: k({ visibility: e.orgData.extend ? "visible" : "hidden" })
      }, [
        (s(!0), l(y, null, _(e.orgData.children, (o, u) => (s(), l("td", {
          key: u,
          colspan: "2",
          class: "org-child-level"
        }, [
          p(v, {
            data: o,
            onClickNode: t[2] || (t[2] = (m) => r.$emit("click-node", m))
          }, null, 8, ["data"])
        ]))), 128))
      ], 4)) : c("", !0)
    ])
  ])) : c("", !0);
}
const S = /* @__PURE__ */ D(x, [["render", V]]);
export {
  S as default
};
