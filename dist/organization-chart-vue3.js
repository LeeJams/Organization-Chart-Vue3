import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, normalizeClass as l, normalizeStyle as u, openBlock as d, reactive as f, renderList as p, resolveComponent as m, toDisplayString as h, watch as g, withModifiers as _ } from "vue";
//#region src/components/RenderSlotContent.ts
var v = c({
	name: "RenderSlotContent",
	props: { render: {
		type: Function,
		required: !0
	} },
	setup(e) {
		return () => e.render();
	}
});
//#endregion
//#region src/utils/tree.ts
function y(e) {
	return [e.id ?? "root"];
}
function b(e, t, n) {
	return [...e, t.id ?? String(n)];
}
function x(e, t) {
	return e.id ?? t.join(".");
}
function S(e, t, n) {
	return t.id ?? `${e}:member:${n}`;
}
function C(e, t, n) {
	return [...e, t.id ?? `member-${n}`];
}
//#endregion
//#region src/components/OrganizationChartNode.vue?vue&type=script&lang.ts
var w = c({
	name: "OrganizationChartNodeView",
	components: { RenderSlotContent: v },
	props: {
		node: {
			type: Object,
			required: !0
		},
		depth: {
			type: Number,
			required: !0
		},
		path: {
			type: Array,
			required: !0
		},
		expandedState: {
			type: Object,
			required: !0
		},
		nodeTitleSlot: {
			type: Function,
			default: void 0
		},
		memberSlot: {
			type: Function,
			default: void 0
		}
	},
	emits: {
		toggle: (e) => !0,
		"click-node": (e) => !0,
		select: (e) => !0
	},
	setup(e, { emit: n }) {
		let r = t(() => Array.isArray(e.node.children) && e.node.children.length > 0), i = t(() => Array.isArray(e.node.member) && e.node.member.length > 0), a = t(() => r.value ? (e.node.children?.length ?? 0) * 2 : 1), o = t(() => x(e.node, e.path)), s = t(() => r.value ? e.expandedState[o.value] !== !1 : !1), c = () => ({
			kind: "node",
			node: e.node,
			id: e.node.id,
			path: e.path
		}), l = () => {
			n("click-node", e.node), n("select", c());
		}, u = (t, r) => {
			n("click-node", t), n("select", {
				kind: "member",
				node: e.node,
				member: t,
				id: t.id ?? e.node.id,
				path: C(e.path, t, r)
			});
		}, d = () => {
			n("toggle", {
				node: e.node,
				path: e.path,
				value: !s.value
			});
		}, f = (t, n) => b(e.path, t, n);
		return {
			childColspan: a,
			getKeyForChild: (e, t) => x(e, f(e, t)),
			getKeyForMember: (e, t) => S(o.value, e, t),
			getPathForChild: f,
			handleMemberClick: u,
			handleNodeClick: l,
			hasChildren: r,
			hasMembers: i,
			isExpanded: s,
			toggleNode: d
		};
	}
}), T = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, E = {
	key: 0,
	class: "org-table"
}, D = ["colspan"], O = { class: "org-node" }, k = ["onClick"], A = { class: "item-box" }, j = { class: "item-title" }, M = { class: "item-add" }, N = {
	key: 0,
	class: "avat"
}, P = ["src", "alt"], F = ["aria-label"];
function I(t, c, f, g, v, y) {
	let b = m("RenderSlotContent"), x = m("OrganizationChartNodeView");
	return t.node.title ? (d(), i("table", E, [a("tbody", null, [a("tr", null, [a("td", {
		colspan: t.childColspan,
		class: l({
			"org-parent-level": t.hasChildren,
			"org-extend": t.hasChildren && t.isExpanded
		})
	}, [a("div", O, [a("div", {
		class: "org-container",
		onClick: c[0] ||= (...e) => t.handleNodeClick && t.handleNodeClick(...e)
	}, [a("div", { class: l(["org-title", t.node.titleClass || []]) }, [t.nodeTitleSlot ? (d(), n(b, {
		key: 0,
		render: () => t.nodeTitleSlot?.({
			node: t.node,
			depth: t.depth,
			path: t.path
		})
	}, null, 8, ["render"])) : (d(), i(e, { key: 1 }, [o(h(t.node.title), 1)], 64))], 2), t.hasMembers ? (d(), i("div", {
		key: 0,
		class: l(["org-content", t.node.contentClass || []])
	}, [(d(!0), i(e, null, p(t.node.member, (o, s) => (d(), i("div", {
		key: t.getKeyForMember(o, s),
		class: "org-content-item",
		onClick: _((e) => t.handleMemberClick(o, s), ["stop"])
	}, [t.memberSlot ? (d(), n(b, {
		key: 0,
		render: () => t.memberSlot?.({
			node: t.node,
			member: o,
			depth: t.depth,
			path: t.path
		})
	}, null, 8, ["render"])) : (d(), i(e, { key: 1 }, [a("div", A, [a("p", j, h(o.name), 1), a("p", M, h(o.add), 1)]), o.image_url ? (d(), i("div", N, [a("img", {
		src: o.image_url,
		alt: o.name ? `${o.name} avatar` : "Member avatar"
	}, null, 8, P)])) : r("", !0)], 64))], 8, k))), 128))], 2)) : r("", !0)])]), t.hasChildren ? (d(), i("button", {
		key: 0,
		type: "button",
		class: "org-extend-arrow",
		"aria-label": t.isExpanded ? "Collapse node" : "Expand node",
		onClick: c[1] ||= _((...e) => t.toggleNode && t.toggleNode(...e), ["stop"])
	}, null, 8, F)) : r("", !0)], 10, D)]), t.hasChildren ? (d(), i("tr", {
		key: 0,
		style: u({ visibility: t.isExpanded ? "visible" : "hidden" })
	}, [(d(!0), i(e, null, p(t.node.children, (e, n) => (d(), i("td", {
		key: t.getKeyForChild(e, n),
		colspan: "2",
		class: "org-child-level"
	}, [s(x, {
		node: e,
		depth: t.depth + 1,
		path: t.getPathForChild(e, n),
		"expanded-state": t.expandedState,
		"node-title-slot": t.nodeTitleSlot,
		"member-slot": t.memberSlot,
		onToggle: c[2] ||= (e) => t.$emit("toggle", e),
		onClickNode: c[3] ||= (e) => t.$emit("click-node", e),
		onSelect: c[4] ||= (e) => t.$emit("select", e)
	}, null, 8, [
		"node",
		"depth",
		"path",
		"expanded-state",
		"node-title-slot",
		"member-slot"
	])]))), 128))], 4)) : r("", !0)])])) : r("", !0);
}
//#endregion
//#region src/components/OrganizationChart.vue?vue&type=script&lang.ts
var L = c({
	name: "OrganizationChart",
	components: { OrganizationChartNodeView: /* @__PURE__ */ T(w, [["render", I]]) },
	props: {
		data: {
			type: Object,
			required: !0
		},
		defaultExpandAll: {
			type: Boolean,
			default: !0
		}
	},
	emits: {
		"click-node": (e) => !0,
		select: (e) => !0
	},
	setup(e, { emit: n }) {
		let r = f({}), i = t(() => y(e.data));
		return g([() => e.data, () => e.defaultExpandAll], () => {
			let t = /* @__PURE__ */ new Set(), n = (i, a) => {
				let o = x(i, a);
				t.add(o), o in r || (r[o] = e.defaultExpandAll), i.children?.forEach((e, t) => {
					n(e, b(a, e, t));
				});
			};
			n(e.data, y(e.data)), Object.keys(r).forEach((e) => {
				t.has(e) || delete r[e];
			});
		}, {
			deep: !0,
			immediate: !0
		}), {
			emitLegacySelect: (e) => {
				n("click-node", e);
			},
			emitSelect: (e) => {
				n("select", e);
			},
			expandedState: r,
			rootPath: i,
			toggleNode: ({ node: e, path: t, value: n }) => {
				let i = (e, t) => {
					r[x(e, t)] = n, e.children?.forEach((e, n) => {
						i(e, b(t, e, n));
					});
				};
				i(e, t);
			}
		};
	}
});
//#endregion
//#region src/components/OrganizationChart.vue
function R(e, t, r, i, a, o) {
	let s = m("OrganizationChartNodeView");
	return d(), n(s, {
		node: e.data,
		depth: 0,
		path: e.rootPath,
		"expanded-state": e.expandedState,
		"node-title-slot": e.$slots["node-title"],
		"member-slot": e.$slots.member,
		onToggle: e.toggleNode,
		onClickNode: e.emitLegacySelect,
		onSelect: e.emitSelect
	}, null, 8, [
		"node",
		"path",
		"expanded-state",
		"node-title-slot",
		"member-slot",
		"onToggle",
		"onClickNode",
		"onSelect"
	]);
}
//#endregion
//#region src/index.ts
var z = /* @__PURE__ */ T(L, [["render", R]]);
//#endregion
export { z as default };
