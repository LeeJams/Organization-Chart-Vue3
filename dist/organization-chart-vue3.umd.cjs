(function(e,a){typeof exports=="object"&&typeof module<"u"?module.exports=a(require("vue")):typeof define=="function"&&define.amd?define(["vue"],a):(e=typeof globalThis<"u"?globalThis:e||self,e.OrganizationChart=a(e.Vue))})(this,function(e){"use strict";const a="",m=(r,n)=>{const o=r.__vccOpts||r;for(const[s,t]of n)o[s]=t;return o},g={name:"OrganizationChart",props:["data"],data(){return{orgData:{}}},watch:{data:{handler:function(r){const n=function(o){return o.extend=!0,Array.isArray(o.children)&&o.children.forEach(s=>{n(s)}),o};r&&(this.orgData=n(r))},immediate:!0}},methods:{setToggleExtend:function(r,n){r.extend=n,Array.isArray(r.children)&&r.children.forEach(o=>{this.setToggleExtend(o,n)}),this.$forceUpdate()},isChildren:function(){return Array.isArray(this.orgData.children)&&this.orgData.children.length},isMember:function(){return Array.isArray(this.orgData.member)&&this.orgData.member.length}}},h={key:0,class:"org-table"},k=["colspan"],p={class:"org-node"},f=["onClick"],y={class:"item-box"},C={class:"item-title"},E={class:"item-add"},_={key:0,class:"avat"},B=["src"];function D(r,n,o,s,t,l){const N=e.resolveComponent("OrganizationChart",!0);return t.orgData.title?(e.openBlock(),e.createElementBlock("table",h,[e.createElementVNode("tr",null,[e.createElementVNode("td",{colspan:Array.isArray(t.orgData.children)?t.orgData.children.length*2:1,class:e.normalizeClass({"org-parent-level":l.isChildren(),"org-extend":l.isChildren()&&t.orgData.extend})},[e.createElementVNode("div",p,[e.createElementVNode("div",{class:"org-container",onClick:n[0]||(n[0]=i=>r.$emit("click-node",t.orgData))},[e.createElementVNode("div",{class:e.normalizeClass(["org-title",t.orgData.titleClass||[]])},e.toDisplayString(t.orgData.title),3),l.isMember()?(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass(["org-content",t.orgData.contentClass||[]])},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.orgData.member,(i,c)=>(e.openBlock(),e.createElementBlock("div",{class:"org-content-item",onClick:e.withModifiers(d=>r.$emit("click-node",i),["stop"])},[e.createElementVNode("div",y,[e.createElementVNode("p",C,e.toDisplayString(i.name),1),e.createElementVNode("p",E,e.toDisplayString(i.add),1)]),i.image_url?(e.openBlock(),e.createElementBlock("div",_,[e.createElementVNode("img",{src:i.image_url},null,8,B)])):e.createCommentVNode("",!0)],8,f))),256))],2)):e.createCommentVNode("",!0)])]),l.isChildren()?(e.openBlock(),e.createElementBlock("div",{key:0,class:"org-extend-arrow",onClick:n[1]||(n[1]=i=>l.setToggleExtend(t.orgData,!t.orgData.extend))})):e.createCommentVNode("",!0)],10,k)]),l.isChildren()?(e.openBlock(),e.createElementBlock("tr",{key:0,style:e.normalizeStyle({visibility:t.orgData.extend?"visible":"hidden"})},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.orgData.children,(i,c)=>(e.openBlock(),e.createElementBlock("td",{key:c,colspan:"2",class:"org-child-level"},[e.createVNode(N,{data:i,onClickNode:n[2]||(n[2]=d=>r.$emit("click-node",d))},null,8,["data"])]))),128))],4)):e.createCommentVNode("",!0)])):e.createCommentVNode("",!0)}return m(g,[["render",D]])});
