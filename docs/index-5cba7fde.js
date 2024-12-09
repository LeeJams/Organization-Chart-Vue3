(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const i of r)
      if (i.type === "childList")
        for (const o of i.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const i = {};
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : r.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const i = n(r);
    fetch(r.href, i);
  }
})();
function En(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const K = {},
  qe = [],
  ae = () => {},
  xr = () => !1,
  yr = /^on[^a-z]/,
  Lt = (e) => yr.test(e),
  Cn = (e) => e.startsWith("onUpdate:"),
  q = Object.assign,
  wn = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Er = Object.prototype.hasOwnProperty,
  S = (e, t) => Er.call(e, t),
  A = Array.isArray,
  ke = (e) => jt(e) === "[object Map]",
  Os = (e) => jt(e) === "[object Set]",
  M = (e) => typeof e == "function",
  W = (e) => typeof e == "string",
  vn = (e) => typeof e == "symbol",
  H = (e) => e !== null && typeof e == "object",
  Ts = (e) => H(e) && M(e.then) && M(e.catch),
  As = Object.prototype.toString,
  jt = (e) => As.call(e),
  Cr = (e) => jt(e).slice(8, -1),
  Ps = (e) => jt(e) === "[object Object]",
  On = (e) => W(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  At = En(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Kt = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  wr = /-(\w)/g,
  ye = Kt((e) => e.replace(wr, (t, n) => (n ? n.toUpperCase() : ""))),
  vr = /\B([A-Z])/g,
  Ge = Kt((e) => e.replace(vr, "-$1").toLowerCase()),
  Ht = Kt((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Zt = Kt((e) => (e ? `on${Ht(e)}` : "")),
  Ft = (e, t) => !Object.is(e, t),
  Qt = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Nt = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Or = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Vn;
const ln = () =>
  Vn ||
  (Vn =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function Bt(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = W(s) ? Mr(s) : Bt(s);
      if (r) for (const i in r) t[i] = r[i];
    }
    return t;
  } else {
    if (W(e)) return e;
    if (H(e)) return e;
  }
}
const Tr = /;(?![^(]*\))/g,
  Ar = /:([^]+)/,
  Pr = /\/\*[^]*?\*\//g;
function Mr(e) {
  const t = {};
  return (
    e
      .replace(Pr, "")
      .split(Tr)
      .forEach((n) => {
        if (n) {
          const s = n.split(Ar);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function Ve(e) {
  let t = "";
  if (W(e)) t = e;
  else if (A(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ve(e[n]);
      s && (t += s + " ");
    }
  else if (H(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Ir =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Fr = En(Ir);
function Ms(e) {
  return !!e || e === "";
}
const Gt = (e) =>
    W(e)
      ? e
      : e == null
      ? ""
      : A(e) || (H(e) && (e.toString === As || !M(e.toString)))
      ? JSON.stringify(e, Is, 2)
      : String(e),
  Is = (e, t) =>
    t && t.__v_isRef
      ? Is(e, t.value)
      : ke(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {}
          ),
        }
      : Os(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : H(t) && !A(t) && !Ps(t)
      ? String(t)
      : t;
let oe;
class Nr {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = oe),
      !t && oe && (this.index = (oe.scopes || (oe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = oe;
      try {
        return (oe = this), t();
      } finally {
        oe = n;
      }
    }
  }
  on() {
    oe = this;
  }
  off() {
    oe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Sr(e, t = oe) {
  t && t.active && t.effects.push(e);
}
function Rr() {
  return oe;
}
const Tn = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Fs = (e) => (e.w & Ie) > 0,
  Ns = (e) => (e.n & Ie) > 0,
  Dr = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ie;
  },
  Lr = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        Fs(r) && !Ns(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~Ie),
          (r.n &= ~Ie);
      }
      t.length = n;
    }
  },
  cn = new WeakMap();
let lt = 0,
  Ie = 1;
const fn = 30;
let ce;
const He = Symbol(""),
  un = Symbol("");
class An {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Sr(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ce,
      n = Pe;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ce),
        (ce = this),
        (Pe = !0),
        (Ie = 1 << ++lt),
        lt <= fn ? Dr(this) : Yn(this),
        this.fn()
      );
    } finally {
      lt <= fn && Lr(this),
        (Ie = 1 << --lt),
        (ce = this.parent),
        (Pe = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ce === this
      ? (this.deferStop = !0)
      : this.active &&
        (Yn(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Yn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Pe = !0;
const Ss = [];
function et() {
  Ss.push(Pe), (Pe = !1);
}
function tt() {
  const e = Ss.pop();
  Pe = e === void 0 ? !0 : e;
}
function ne(e, t, n) {
  if (Pe && ce) {
    let s = cn.get(e);
    s || cn.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = Tn())), Rs(r);
  }
}
function Rs(e, t) {
  let n = !1;
  lt <= fn ? Ns(e) || ((e.n |= Ie), (n = !Fs(e))) : (n = !e.has(ce)),
    n && (e.add(ce), ce.deps.push(e));
}
function we(e, t, n, s, r, i) {
  const o = cn.get(e);
  if (!o) return;
  let c = [];
  if (t === "clear") c = [...o.values()];
  else if (n === "length" && A(e)) {
    const u = Number(s);
    o.forEach((a, m) => {
      (m === "length" || m >= u) && c.push(a);
    });
  } else
    switch ((n !== void 0 && c.push(o.get(n)), t)) {
      case "add":
        A(e)
          ? On(n) && c.push(o.get("length"))
          : (c.push(o.get(He)), ke(e) && c.push(o.get(un)));
        break;
      case "delete":
        A(e) || (c.push(o.get(He)), ke(e) && c.push(o.get(un)));
        break;
      case "set":
        ke(e) && c.push(o.get(He));
        break;
    }
  if (c.length === 1) c[0] && an(c[0]);
  else {
    const u = [];
    for (const a of c) a && u.push(...a);
    an(Tn(u));
  }
}
function an(e, t) {
  const n = A(e) ? e : [...e];
  for (const s of n) s.computed && Xn(s);
  for (const s of n) s.computed || Xn(s);
}
function Xn(e, t) {
  (e !== ce || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const jr = En("__proto__,__v_isRef,__isVue"),
  Ds = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(vn)
  ),
  Kr = Pn(),
  Hr = Pn(!1, !0),
  Br = Pn(!0),
  Zn = Ur();
function Ur() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = R(this);
        for (let i = 0, o = this.length; i < o; i++) ne(s, "get", i + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(R)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        et();
        const s = R(this)[t].apply(this, n);
        return tt(), s;
      };
    }),
    e
  );
}
function $r(e) {
  const t = R(this);
  return ne(t, "has", e), t.hasOwnProperty(e);
}
function Pn(e = !1, t = !1) {
  return function (s, r, i) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && i === (e ? (t ? ri : Bs) : t ? Hs : Ks).get(s))
      return s;
    const o = A(s);
    if (!e) {
      if (o && S(Zn, r)) return Reflect.get(Zn, r, i);
      if (r === "hasOwnProperty") return $r;
    }
    const c = Reflect.get(s, r, i);
    return (vn(r) ? Ds.has(r) : jr(r)) || (e || ne(s, "get", r), t)
      ? c
      : ee(c)
      ? o && On(r)
        ? c
        : c.value
      : H(c)
      ? e
        ? Us(c)
        : Fn(c)
      : c;
  };
}
const Wr = Ls(),
  zr = Ls(!0);
function Ls(e = !1) {
  return function (n, s, r, i) {
    let o = n[s];
    if (at(o) && ee(o) && !ee(r)) return !1;
    if (
      !e &&
      (!dn(r) && !at(r) && ((o = R(o)), (r = R(r))), !A(n) && ee(o) && !ee(r))
    )
      return (o.value = r), !0;
    const c = A(n) && On(s) ? Number(s) < n.length : S(n, s),
      u = Reflect.set(n, s, r, i);
    return (
      n === R(i) && (c ? Ft(r, o) && we(n, "set", s, r) : we(n, "add", s, r)), u
    );
  };
}
function Jr(e, t) {
  const n = S(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && we(e, "delete", t, void 0), s;
}
function qr(e, t) {
  const n = Reflect.has(e, t);
  return (!vn(t) || !Ds.has(t)) && ne(e, "has", t), n;
}
function kr(e) {
  return ne(e, "iterate", A(e) ? "length" : He), Reflect.ownKeys(e);
}
const js = { get: Kr, set: Wr, deleteProperty: Jr, has: qr, ownKeys: kr },
  Vr = {
    get: Br,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Yr = q({}, js, { get: Hr, set: zr }),
  Mn = (e) => e,
  Ut = (e) => Reflect.getPrototypeOf(e);
function Et(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = R(e),
    i = R(t);
  n || (t !== i && ne(r, "get", t), ne(r, "get", i));
  const { has: o } = Ut(r),
    c = s ? Mn : n ? Rn : Sn;
  if (o.call(r, t)) return c(e.get(t));
  if (o.call(r, i)) return c(e.get(i));
  e !== r && e.get(t);
}
function Ct(e, t = !1) {
  const n = this.__v_raw,
    s = R(n),
    r = R(e);
  return (
    t || (e !== r && ne(s, "has", e), ne(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function wt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ne(R(e), "iterate", He), Reflect.get(e, "size", e)
  );
}
function Qn(e) {
  e = R(e);
  const t = R(this);
  return Ut(t).has.call(t, e) || (t.add(e), we(t, "add", e, e)), this;
}
function Gn(e, t) {
  t = R(t);
  const n = R(this),
    { has: s, get: r } = Ut(n);
  let i = s.call(n, e);
  i || ((e = R(e)), (i = s.call(n, e)));
  const o = r.call(n, e);
  return (
    n.set(e, t), i ? Ft(t, o) && we(n, "set", e, t) : we(n, "add", e, t), this
  );
}
function es(e) {
  const t = R(this),
    { has: n, get: s } = Ut(t);
  let r = n.call(t, e);
  r || ((e = R(e)), (r = n.call(t, e))), s && s.call(t, e);
  const i = t.delete(e);
  return r && we(t, "delete", e, void 0), i;
}
function ts() {
  const e = R(this),
    t = e.size !== 0,
    n = e.clear();
  return t && we(e, "clear", void 0, void 0), n;
}
function vt(e, t) {
  return function (s, r) {
    const i = this,
      o = i.__v_raw,
      c = R(o),
      u = t ? Mn : e ? Rn : Sn;
    return (
      !e && ne(c, "iterate", He), o.forEach((a, m) => s.call(r, u(a), u(m), i))
    );
  };
}
function Ot(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      i = R(r),
      o = ke(i),
      c = e === "entries" || (e === Symbol.iterator && o),
      u = e === "keys" && o,
      a = r[e](...s),
      m = n ? Mn : t ? Rn : Sn;
    return (
      !t && ne(i, "iterate", u ? un : He),
      {
        next() {
          const { value: E, done: w } = a.next();
          return w
            ? { value: E, done: w }
            : { value: c ? [m(E[0]), m(E[1])] : m(E), done: w };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Te(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Xr() {
  const e = {
      get(i) {
        return Et(this, i);
      },
      get size() {
        return wt(this);
      },
      has: Ct,
      add: Qn,
      set: Gn,
      delete: es,
      clear: ts,
      forEach: vt(!1, !1),
    },
    t = {
      get(i) {
        return Et(this, i, !1, !0);
      },
      get size() {
        return wt(this);
      },
      has: Ct,
      add: Qn,
      set: Gn,
      delete: es,
      clear: ts,
      forEach: vt(!1, !0),
    },
    n = {
      get(i) {
        return Et(this, i, !0);
      },
      get size() {
        return wt(this, !0);
      },
      has(i) {
        return Ct.call(this, i, !0);
      },
      add: Te("add"),
      set: Te("set"),
      delete: Te("delete"),
      clear: Te("clear"),
      forEach: vt(!0, !1),
    },
    s = {
      get(i) {
        return Et(this, i, !0, !0);
      },
      get size() {
        return wt(this, !0);
      },
      has(i) {
        return Ct.call(this, i, !0);
      },
      add: Te("add"),
      set: Te("set"),
      delete: Te("delete"),
      clear: Te("clear"),
      forEach: vt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = Ot(i, !1, !1)),
        (n[i] = Ot(i, !0, !1)),
        (t[i] = Ot(i, !1, !0)),
        (s[i] = Ot(i, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [Zr, Qr, Gr, ei] = Xr();
function In(e, t) {
  const n = t ? (e ? ei : Gr) : e ? Qr : Zr;
  return (s, r, i) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(S(n, r) && r in s ? n : s, r, i);
}
const ti = { get: In(!1, !1) },
  ni = { get: In(!1, !0) },
  si = { get: In(!0, !1) },
  Ks = new WeakMap(),
  Hs = new WeakMap(),
  Bs = new WeakMap(),
  ri = new WeakMap();
function ii(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function oi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ii(Cr(e));
}
function Fn(e) {
  return at(e) ? e : Nn(e, !1, js, ti, Ks);
}
function li(e) {
  return Nn(e, !1, Yr, ni, Hs);
}
function Us(e) {
  return Nn(e, !0, Vr, si, Bs);
}
function Nn(e, t, n, s, r) {
  if (!H(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = r.get(e);
  if (i) return i;
  const o = oi(e);
  if (o === 0) return e;
  const c = new Proxy(e, o === 2 ? s : n);
  return r.set(e, c), c;
}
function Ye(e) {
  return at(e) ? Ye(e.__v_raw) : !!(e && e.__v_isReactive);
}
function at(e) {
  return !!(e && e.__v_isReadonly);
}
function dn(e) {
  return !!(e && e.__v_isShallow);
}
function $s(e) {
  return Ye(e) || at(e);
}
function R(e) {
  const t = e && e.__v_raw;
  return t ? R(t) : e;
}
function Ws(e) {
  return Nt(e, "__v_skip", !0), e;
}
const Sn = (e) => (H(e) ? Fn(e) : e),
  Rn = (e) => (H(e) ? Us(e) : e);
function ci(e) {
  Pe && ce && ((e = R(e)), Rs(e.dep || (e.dep = Tn())));
}
function fi(e, t) {
  e = R(e);
  const n = e.dep;
  n && an(n);
}
function ee(e) {
  return !!(e && e.__v_isRef === !0);
}
function ui(e) {
  return ee(e) ? e.value : e;
}
const ai = {
  get: (e, t, n) => ui(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return ee(r) && !ee(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function zs(e) {
  return Ye(e) ? e : new Proxy(e, ai);
}
class di {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new An(t, () => {
        this._dirty || ((this._dirty = !0), fi(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = R(this);
    return (
      ci(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function hi(e, t, n = !1) {
  let s, r;
  const i = M(e);
  return (
    i ? ((s = e), (r = ae)) : ((s = e.get), (r = e.set)),
    new di(s, r, i || !r, n)
  );
}
function Me(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (i) {
    $t(i, t, n);
  }
  return r;
}
function de(e, t, n, s) {
  if (M(e)) {
    const i = Me(e, t, n, s);
    return (
      i &&
        Ts(i) &&
        i.catch((o) => {
          $t(o, t, n);
        }),
      i
    );
  }
  const r = [];
  for (let i = 0; i < e.length; i++) r.push(de(e[i], t, n, s));
  return r;
}
function $t(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy,
      c = n;
    for (; i; ) {
      const a = i.ec;
      if (a) {
        for (let m = 0; m < a.length; m++) if (a[m](e, o, c) === !1) return;
      }
      i = i.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Me(u, null, 10, [e, o, c]);
      return;
    }
  }
  pi(e, n, r, s);
}
function pi(e, t, n, s = !0) {
  console.error(e);
}
let dt = !1,
  hn = !1;
const X = [];
let xe = 0;
const Xe = [];
let Ce = null,
  je = 0;
const Js = Promise.resolve();
let Dn = null;
function gi(e) {
  const t = Dn || Js;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function mi(e) {
  let t = xe + 1,
    n = X.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    ht(X[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function Ln(e) {
  (!X.length || !X.includes(e, dt && e.allowRecurse ? xe + 1 : xe)) &&
    (e.id == null ? X.push(e) : X.splice(mi(e.id), 0, e), qs());
}
function qs() {
  !dt && !hn && ((hn = !0), (Dn = Js.then(Vs)));
}
function _i(e) {
  const t = X.indexOf(e);
  t > xe && X.splice(t, 1);
}
function bi(e) {
  A(e)
    ? Xe.push(...e)
    : (!Ce || !Ce.includes(e, e.allowRecurse ? je + 1 : je)) && Xe.push(e),
    qs();
}
function ns(e, t = dt ? xe + 1 : 0) {
  for (; t < X.length; t++) {
    const n = X[t];
    n && n.pre && (X.splice(t, 1), t--, n());
  }
}
function ks(e) {
  if (Xe.length) {
    const t = [...new Set(Xe)];
    if (((Xe.length = 0), Ce)) {
      Ce.push(...t);
      return;
    }
    for (Ce = t, Ce.sort((n, s) => ht(n) - ht(s)), je = 0; je < Ce.length; je++)
      Ce[je]();
    (Ce = null), (je = 0);
  }
}
const ht = (e) => (e.id == null ? 1 / 0 : e.id),
  xi = (e, t) => {
    const n = ht(e) - ht(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Vs(e) {
  (hn = !1), (dt = !0), X.sort(xi);
  const t = ae;
  try {
    for (xe = 0; xe < X.length; xe++) {
      const n = X[xe];
      n && n.active !== !1 && Me(n, null, 14);
    }
  } finally {
    (xe = 0),
      (X.length = 0),
      ks(),
      (dt = !1),
      (Dn = null),
      (X.length || Xe.length) && Vs();
  }
}
function yi(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || K;
  let r = n;
  const i = t.startsWith("update:"),
    o = i && t.slice(7);
  if (o && o in s) {
    const m = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: E, trim: w } = s[m] || K;
    w && (r = n.map((P) => (W(P) ? P.trim() : P))), E && (r = n.map(Or));
  }
  let c,
    u = s[(c = Zt(t))] || s[(c = Zt(ye(t)))];
  !u && i && (u = s[(c = Zt(Ge(t)))]), u && de(u, e, 6, r);
  const a = s[c + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[c]) return;
    (e.emitted[c] = !0), de(a, e, 6, r);
  }
}
function Ys(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const i = e.emits;
  let o = {},
    c = !1;
  if (!M(e)) {
    const u = (a) => {
      const m = Ys(a, t, !0);
      m && ((c = !0), q(o, m));
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  return !i && !c
    ? (H(e) && s.set(e, null), null)
    : (A(i) ? i.forEach((u) => (o[u] = null)) : q(o, i),
      H(e) && s.set(e, o),
      o);
}
function Wt(e, t) {
  return !e || !Lt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      S(e, t[0].toLowerCase() + t.slice(1)) || S(e, Ge(t)) || S(e, t));
}
let fe = null,
  Xs = null;
function St(e) {
  const t = fe;
  return (fe = e), (Xs = (e && e.type.__scopeId) || null), t;
}
function Ei(e, t = fe, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && ps(-1);
    const i = St(t);
    let o;
    try {
      o = e(...r);
    } finally {
      St(i), s._d && ps(1);
    }
    return o;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function en(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: i,
    propsOptions: [o],
    slots: c,
    attrs: u,
    emit: a,
    render: m,
    renderCache: E,
    data: w,
    setupState: P,
    ctx: U,
    inheritAttrs: N,
  } = e;
  let z, k;
  const V = St(e);
  try {
    if (n.shapeFlag & 4) {
      const I = r || s;
      (z = be(m.call(I, I, E, i, P, w, U))), (k = u);
    } else {
      const I = t;
      (z = be(
        I.length > 1 ? I(i, { attrs: u, slots: c, emit: a }) : I(i, null)
      )),
        (k = t.props ? u : Ci(u));
    }
  } catch (I) {
    (ut.length = 0), $t(I, e, 1), (z = he(Ue));
  }
  let Y = z;
  if (k && N !== !1) {
    const I = Object.keys(k),
      { shapeFlag: Oe } = Y;
    I.length && Oe & 7 && (o && I.some(Cn) && (k = wi(k, o)), (Y = Ze(Y, k)));
  }
  return (
    n.dirs && ((Y = Ze(Y)), (Y.dirs = Y.dirs ? Y.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (Y.transition = n.transition),
    (z = Y),
    St(V),
    z
  );
}
const Ci = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Lt(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  wi = (e, t) => {
    const n = {};
    for (const s in e) (!Cn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function vi(e, t, n) {
  const { props: s, children: r, component: i } = e,
    { props: o, children: c, patchFlag: u } = t,
    a = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return s ? ss(s, o, a) : !!o;
    if (u & 8) {
      const m = t.dynamicProps;
      for (let E = 0; E < m.length; E++) {
        const w = m[E];
        if (o[w] !== s[w] && !Wt(a, w)) return !0;
      }
    }
  } else
    return (r || c) && (!c || !c.$stable)
      ? !0
      : s === o
      ? !1
      : s
      ? o
        ? ss(s, o, a)
        : !0
      : !!o;
  return !1;
}
function ss(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !Wt(n, i)) return !0;
  }
  return !1;
}
function Oi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ti = (e) => e.__isSuspense;
function Ai(e, t) {
  t && t.pendingBranch
    ? A(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : bi(e);
}
const Tt = {};
function tn(e, t, n) {
  return Zs(e, t, n);
}
function Zs(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o } = K
) {
  var c;
  const u = Rr() === ((c = J) == null ? void 0 : c.scope) ? J : null;
  let a,
    m = !1,
    E = !1;
  if (
    (ee(e)
      ? ((a = () => e.value), (m = dn(e)))
      : Ye(e)
      ? ((a = () => e), (s = !0))
      : A(e)
      ? ((E = !0),
        (m = e.some((I) => Ye(I) || dn(I))),
        (a = () =>
          e.map((I) => {
            if (ee(I)) return I.value;
            if (Ye(I)) return Je(I);
            if (M(I)) return Me(I, u, 2);
          })))
      : M(e)
      ? t
        ? (a = () => Me(e, u, 2))
        : (a = () => {
            if (!(u && u.isUnmounted)) return w && w(), de(e, u, 3, [P]);
          })
      : (a = ae),
    t && s)
  ) {
    const I = a;
    a = () => Je(I());
  }
  let w,
    P = (I) => {
      w = V.onStop = () => {
        Me(I, u, 4);
      };
    },
    U;
  if (gt)
    if (
      ((P = ae),
      t ? n && de(t, u, 3, [a(), E ? [] : void 0, P]) : a(),
      r === "sync")
    ) {
      const I = Oo();
      U = I.__watcherHandles || (I.__watcherHandles = []);
    } else return ae;
  let N = E ? new Array(e.length).fill(Tt) : Tt;
  const z = () => {
    if (V.active)
      if (t) {
        const I = V.run();
        (s || m || (E ? I.some((Oe, nt) => Ft(Oe, N[nt])) : Ft(I, N))) &&
          (w && w(),
          de(t, u, 3, [I, N === Tt ? void 0 : E && N[0] === Tt ? [] : N, P]),
          (N = I));
      } else V.run();
  };
  z.allowRecurse = !!t;
  let k;
  r === "sync"
    ? (k = z)
    : r === "post"
    ? (k = () => te(z, u && u.suspense))
    : ((z.pre = !0), u && (z.id = u.uid), (k = () => Ln(z)));
  const V = new An(a, k);
  t
    ? n
      ? z()
      : (N = V.run())
    : r === "post"
    ? te(V.run.bind(V), u && u.suspense)
    : V.run();
  const Y = () => {
    V.stop(), u && u.scope && wn(u.scope.effects, V);
  };
  return U && U.push(Y), Y;
}
function Pi(e, t, n) {
  const s = this.proxy,
    r = W(e) ? (e.includes(".") ? Qs(s, e) : () => s[e]) : e.bind(s, s);
  let i;
  M(t) ? (i = t) : ((i = t.handler), (n = t));
  const o = J;
  Qe(this);
  const c = Zs(r, i.bind(s), n);
  return o ? Qe(o) : Be(), c;
}
function Qs(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function Je(e, t) {
  if (!H(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ee(e))) Je(e.value, t);
  else if (A(e)) for (let n = 0; n < e.length; n++) Je(e[n], t);
  else if (Os(e) || ke(e))
    e.forEach((n) => {
      Je(n, t);
    });
  else if (Ps(e)) for (const n in e) Je(e[n], t);
  return e;
}
function De(e, t, n, s) {
  const r = e.dirs,
    i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const c = r[o];
    i && (c.oldValue = i[o].value);
    let u = c.dir[s];
    u && (et(), de(u, n, 8, [e.el, c, e, t]), tt());
  }
}
const Pt = (e) => !!e.type.__asyncLoader,
  Gs = (e) => e.type.__isKeepAlive;
function Mi(e, t) {
  er(e, "a", t);
}
function Ii(e, t) {
  er(e, "da", t);
}
function er(e, t, n = J) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((zt(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Gs(r.parent.vnode) && Fi(s, t, n, r), (r = r.parent);
  }
}
function Fi(e, t, n, s) {
  const r = zt(t, e, s, !0);
  tr(() => {
    wn(s[t], r);
  }, n);
}
function zt(e, t, n = J, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          et(), Qe(n);
          const c = de(t, n, e, o);
          return Be(), tt(), c;
        });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const ve =
    (e) =>
    (t, n = J) =>
      (!gt || e === "sp") && zt(e, (...s) => t(...s), n),
  Ni = ve("bm"),
  Si = ve("m"),
  Ri = ve("bu"),
  Di = ve("u"),
  Li = ve("bum"),
  tr = ve("um"),
  ji = ve("sp"),
  Ki = ve("rtg"),
  Hi = ve("rtc");
function Bi(e, t = J) {
  zt("ec", e, t);
}
const nr = "components";
function sr(e, t) {
  return $i(nr, e, !0, t) || e;
}
const Ui = Symbol.for("v-ndc");
function $i(e, t, n = !0, s = !1) {
  const r = fe || J;
  if (r) {
    const i = r.type;
    if (e === nr) {
      const c = Eo(i, !1);
      if (c && (c === t || c === ye(t) || c === Ht(ye(t)))) return i;
    }
    const o = rs(r[e] || i[e], t) || rs(r.appContext[e], t);
    return !o && s ? i : o;
  }
}
function rs(e, t) {
  return e && (e[t] || e[ye(t)] || e[Ht(ye(t))]);
}
function is(e, t, n, s) {
  let r;
  const i = n && n[s];
  if (A(e) || W(e)) {
    r = new Array(e.length);
    for (let o = 0, c = e.length; o < c; o++)
      r[o] = t(e[o], o, void 0, i && i[o]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let o = 0; o < e; o++) r[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (H(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (o, c) => t(o, c, void 0, i && i[c]));
    else {
      const o = Object.keys(e);
      r = new Array(o.length);
      for (let c = 0, u = o.length; c < u; c++) {
        const a = o[c];
        r[c] = t(e[a], a, c, i && i[c]);
      }
    }
  else r = [];
  return n && (n[s] = r), r;
}
const pn = (e) => (e ? (pr(e) ? Un(e) || e.proxy : pn(e.parent)) : null),
  ft = q(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => pn(e.parent),
    $root: (e) => pn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => jn(e),
    $forceUpdate: (e) => e.f || (e.f = () => Ln(e.update)),
    $nextTick: (e) => e.n || (e.n = gi.bind(e.proxy)),
    $watch: (e) => Pi.bind(e),
  }),
  nn = (e, t) => e !== K && !e.__isScriptSetup && S(e, t),
  Wi = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: i,
        accessCache: o,
        type: c,
        appContext: u,
      } = e;
      let a;
      if (t[0] !== "$") {
        const P = o[t];
        if (P !== void 0)
          switch (P) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (nn(s, t)) return (o[t] = 1), s[t];
          if (r !== K && S(r, t)) return (o[t] = 2), r[t];
          if ((a = e.propsOptions[0]) && S(a, t)) return (o[t] = 3), i[t];
          if (n !== K && S(n, t)) return (o[t] = 4), n[t];
          gn && (o[t] = 0);
        }
      }
      const m = ft[t];
      let E, w;
      if (m) return t === "$attrs" && ne(e, "get", t), m(e);
      if ((E = c.__cssModules) && (E = E[t])) return E;
      if (n !== K && S(n, t)) return (o[t] = 4), n[t];
      if (((w = u.config.globalProperties), S(w, t))) return w[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: i } = e;
      return nn(r, t)
        ? ((r[t] = n), !0)
        : s !== K && S(s, t)
        ? ((s[t] = n), !0)
        : S(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: i,
        },
      },
      o
    ) {
      let c;
      return (
        !!n[o] ||
        (e !== K && S(e, o)) ||
        nn(t, o) ||
        ((c = i[0]) && S(c, o)) ||
        S(s, o) ||
        S(ft, o) ||
        S(r.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : S(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function os(e) {
  return A(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let gn = !0;
function zi(e) {
  const t = jn(e),
    n = e.proxy,
    s = e.ctx;
  (gn = !1), t.beforeCreate && ls(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: i,
    methods: o,
    watch: c,
    provide: u,
    inject: a,
    created: m,
    beforeMount: E,
    mounted: w,
    beforeUpdate: P,
    updated: U,
    activated: N,
    deactivated: z,
    beforeDestroy: k,
    beforeUnmount: V,
    destroyed: Y,
    unmounted: I,
    render: Oe,
    renderTracked: nt,
    renderTriggered: mt,
    errorCaptured: Fe,
    serverPrefetch: kt,
    expose: Ne,
    inheritAttrs: st,
    components: _t,
    directives: bt,
    filters: Vt,
  } = t;
  if ((a && Ji(a, s, null), o))
    for (const B in o) {
      const L = o[B];
      M(L) && (s[B] = L.bind(n));
    }
  if (r) {
    const B = r.call(n, n);
    H(B) && (e.data = Fn(B));
  }
  if (((gn = !0), i))
    for (const B in i) {
      const L = i[B],
        Se = M(L) ? L.bind(n, n) : M(L.get) ? L.get.bind(n, n) : ae,
        xt = !M(L) && M(L.set) ? L.set.bind(n) : ae,
        Re = wo({ get: Se, set: xt });
      Object.defineProperty(s, B, {
        enumerable: !0,
        configurable: !0,
        get: () => Re.value,
        set: (pe) => (Re.value = pe),
      });
    }
  if (c) for (const B in c) rr(c[B], s, n, B);
  if (u) {
    const B = M(u) ? u.call(n) : u;
    Reflect.ownKeys(B).forEach((L) => {
      Zi(L, B[L]);
    });
  }
  m && ls(m, e, "c");
  function Z(B, L) {
    A(L) ? L.forEach((Se) => B(Se.bind(n))) : L && B(L.bind(n));
  }
  if (
    (Z(Ni, E),
    Z(Si, w),
    Z(Ri, P),
    Z(Di, U),
    Z(Mi, N),
    Z(Ii, z),
    Z(Bi, Fe),
    Z(Hi, nt),
    Z(Ki, mt),
    Z(Li, V),
    Z(tr, I),
    Z(ji, kt),
    A(Ne))
  )
    if (Ne.length) {
      const B = e.exposed || (e.exposed = {});
      Ne.forEach((L) => {
        Object.defineProperty(B, L, {
          get: () => n[L],
          set: (Se) => (n[L] = Se),
        });
      });
    } else e.exposed || (e.exposed = {});
  Oe && e.render === ae && (e.render = Oe),
    st != null && (e.inheritAttrs = st),
    _t && (e.components = _t),
    bt && (e.directives = bt);
}
function Ji(e, t, n = ae) {
  A(e) && (e = mn(e));
  for (const s in e) {
    const r = e[s];
    let i;
    H(r)
      ? "default" in r
        ? (i = Mt(r.from || s, r.default, !0))
        : (i = Mt(r.from || s))
      : (i = Mt(r)),
      ee(i)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (o) => (i.value = o),
          })
        : (t[s] = i);
  }
}
function ls(e, t, n) {
  de(A(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function rr(e, t, n, s) {
  const r = s.includes(".") ? Qs(n, s) : () => n[s];
  if (W(e)) {
    const i = t[e];
    M(i) && tn(r, i);
  } else if (M(e)) tn(r, e.bind(n));
  else if (H(e))
    if (A(e)) e.forEach((i) => rr(i, t, n, s));
    else {
      const i = M(e.handler) ? e.handler.bind(n) : t[e.handler];
      M(i) && tn(r, i, e);
    }
}
function jn(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    c = i.get(t);
  let u;
  return (
    c
      ? (u = c)
      : !r.length && !n && !s
      ? (u = t)
      : ((u = {}), r.length && r.forEach((a) => Rt(u, a, o, !0)), Rt(u, t, o)),
    H(t) && i.set(t, u),
    u
  );
}
function Rt(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && Rt(e, i, n, !0), r && r.forEach((o) => Rt(e, o, n, !0));
  for (const o in t)
    if (!(s && o === "expose")) {
      const c = qi[o] || (n && n[o]);
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const qi = {
  data: cs,
  props: fs,
  emits: fs,
  methods: ct,
  computed: ct,
  beforeCreate: Q,
  created: Q,
  beforeMount: Q,
  mounted: Q,
  beforeUpdate: Q,
  updated: Q,
  beforeDestroy: Q,
  beforeUnmount: Q,
  destroyed: Q,
  unmounted: Q,
  activated: Q,
  deactivated: Q,
  errorCaptured: Q,
  serverPrefetch: Q,
  components: ct,
  directives: ct,
  watch: Vi,
  provide: cs,
  inject: ki,
};
function cs(e, t) {
  return t
    ? e
      ? function () {
          return q(
            M(e) ? e.call(this, this) : e,
            M(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function ki(e, t) {
  return ct(mn(e), mn(t));
}
function mn(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Q(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ct(e, t) {
  return e ? q(Object.create(null), e, t) : t;
}
function fs(e, t) {
  return e
    ? A(e) && A(t)
      ? [...new Set([...e, ...t])]
      : q(Object.create(null), os(e), os(t ?? {}))
    : t;
}
function Vi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = q(Object.create(null), e);
  for (const s in t) n[s] = Q(e[s], t[s]);
  return n;
}
function ir() {
  return {
    app: null,
    config: {
      isNativeTag: xr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Yi = 0;
function Xi(e, t) {
  return function (s, r = null) {
    M(s) || (s = q({}, s)), r != null && !H(r) && (r = null);
    const i = ir(),
      o = new Set();
    let c = !1;
    const u = (i.app = {
      _uid: Yi++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: To,
      get config() {
        return i.config;
      },
      set config(a) {},
      use(a, ...m) {
        return (
          o.has(a) ||
            (a && M(a.install)
              ? (o.add(a), a.install(u, ...m))
              : M(a) && (o.add(a), a(u, ...m))),
          u
        );
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), u;
      },
      component(a, m) {
        return m ? ((i.components[a] = m), u) : i.components[a];
      },
      directive(a, m) {
        return m ? ((i.directives[a] = m), u) : i.directives[a];
      },
      mount(a, m, E) {
        if (!c) {
          const w = he(s, r);
          return (
            (w.appContext = i),
            m && t ? t(w, a) : e(w, a, E),
            (c = !0),
            (u._container = a),
            (a.__vue_app__ = u),
            Un(w.component) || w.component.proxy
          );
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, m) {
        return (i.provides[a] = m), u;
      },
      runWithContext(a) {
        Dt = u;
        try {
          return a();
        } finally {
          Dt = null;
        }
      },
    });
    return u;
  };
}
let Dt = null;
function Zi(e, t) {
  if (J) {
    let n = J.provides;
    const s = J.parent && J.parent.provides;
    s === n && (n = J.provides = Object.create(s)), (n[e] = t);
  }
}
function Mt(e, t, n = !1) {
  const s = J || fe;
  if (s || Dt) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : Dt._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && M(t) ? t.call(s && s.proxy) : t;
  }
}
function Qi(e, t, n, s = !1) {
  const r = {},
    i = {};
  Nt(i, qt, 1), (e.propsDefaults = Object.create(null)), or(e, t, r, i);
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
  n ? (e.props = s ? r : li(r)) : e.type.props ? (e.props = r) : (e.props = i),
    (e.attrs = i);
}
function Gi(e, t, n, s) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    c = R(r),
    [u] = e.propsOptions;
  let a = !1;
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const m = e.vnode.dynamicProps;
      for (let E = 0; E < m.length; E++) {
        let w = m[E];
        if (Wt(e.emitsOptions, w)) continue;
        const P = t[w];
        if (u)
          if (S(i, w)) P !== i[w] && ((i[w] = P), (a = !0));
          else {
            const U = ye(w);
            r[U] = _n(u, c, U, P, e, !1);
          }
        else P !== i[w] && ((i[w] = P), (a = !0));
      }
    }
  } else {
    or(e, t, r, i) && (a = !0);
    let m;
    for (const E in c)
      (!t || (!S(t, E) && ((m = Ge(E)) === E || !S(t, m)))) &&
        (u
          ? n &&
            (n[E] !== void 0 || n[m] !== void 0) &&
            (r[E] = _n(u, c, E, void 0, e, !0))
          : delete r[E]);
    if (i !== c) for (const E in i) (!t || !S(t, E)) && (delete i[E], (a = !0));
  }
  a && we(e, "set", "$attrs");
}
function or(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1,
    c;
  if (t)
    for (let u in t) {
      if (At(u)) continue;
      const a = t[u];
      let m;
      r && S(r, (m = ye(u)))
        ? !i || !i.includes(m)
          ? (n[m] = a)
          : ((c || (c = {}))[m] = a)
        : Wt(e.emitsOptions, u) ||
          ((!(u in s) || a !== s[u]) && ((s[u] = a), (o = !0)));
    }
  if (i) {
    const u = R(n),
      a = c || K;
    for (let m = 0; m < i.length; m++) {
      const E = i[m];
      n[E] = _n(r, u, E, a[E], e, !S(a, E));
    }
  }
  return o;
}
function _n(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const c = S(o, "default");
    if (c && s === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && M(u)) {
        const { propsDefaults: a } = r;
        n in a ? (s = a[n]) : (Qe(r), (s = a[n] = u.call(null, t)), Be());
      } else s = u;
    }
    o[0] &&
      (i && !c ? (s = !1) : o[1] && (s === "" || s === Ge(n)) && (s = !0));
  }
  return s;
}
function lr(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const i = e.props,
    o = {},
    c = [];
  let u = !1;
  if (!M(e)) {
    const m = (E) => {
      u = !0;
      const [w, P] = lr(E, t, !0);
      q(o, w), P && c.push(...P);
    };
    !n && t.mixins.length && t.mixins.forEach(m),
      e.extends && m(e.extends),
      e.mixins && e.mixins.forEach(m);
  }
  if (!i && !u) return H(e) && s.set(e, qe), qe;
  if (A(i))
    for (let m = 0; m < i.length; m++) {
      const E = ye(i[m]);
      us(E) && (o[E] = K);
    }
  else if (i)
    for (const m in i) {
      const E = ye(m);
      if (us(E)) {
        const w = i[m],
          P = (o[E] = A(w) || M(w) ? { type: w } : q({}, w));
        if (P) {
          const U = hs(Boolean, P.type),
            N = hs(String, P.type);
          (P[0] = U > -1),
            (P[1] = N < 0 || U < N),
            (U > -1 || S(P, "default")) && c.push(E);
        }
      }
    }
  const a = [o, c];
  return H(e) && s.set(e, a), a;
}
function us(e) {
  return e[0] !== "$";
}
function as(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function ds(e, t) {
  return as(e) === as(t);
}
function hs(e, t) {
  return A(t) ? t.findIndex((n) => ds(n, e)) : M(t) && ds(t, e) ? 0 : -1;
}
const cr = (e) => e[0] === "_" || e === "$stable",
  Kn = (e) => (A(e) ? e.map(be) : [be(e)]),
  eo = (e, t, n) => {
    if (t._n) return t;
    const s = Ei((...r) => Kn(t(...r)), n);
    return (s._c = !1), s;
  },
  fr = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (cr(r)) continue;
      const i = e[r];
      if (M(i)) t[r] = eo(r, i, s);
      else if (i != null) {
        const o = Kn(i);
        t[r] = () => o;
      }
    }
  },
  ur = (e, t) => {
    const n = Kn(t);
    e.slots.default = () => n;
  },
  to = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = R(t)), Nt(t, "_", n)) : fr(t, (e.slots = {}));
    } else (e.slots = {}), t && ur(e, t);
    Nt(e.slots, qt, 1);
  },
  no = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let i = !0,
      o = K;
    if (s.shapeFlag & 32) {
      const c = t._;
      c
        ? n && c === 1
          ? (i = !1)
          : (q(r, t), !n && c === 1 && delete r._)
        : ((i = !t.$stable), fr(t, r)),
        (o = t);
    } else t && (ur(e, t), (o = { default: 1 }));
    if (i) for (const c in r) !cr(c) && !(c in o) && delete r[c];
  };
function bn(e, t, n, s, r = !1) {
  if (A(e)) {
    e.forEach((w, P) => bn(w, t && (A(t) ? t[P] : t), n, s, r));
    return;
  }
  if (Pt(s) && !r) return;
  const i = s.shapeFlag & 4 ? Un(s.component) || s.component.proxy : s.el,
    o = r ? null : i,
    { i: c, r: u } = e,
    a = t && t.r,
    m = c.refs === K ? (c.refs = {}) : c.refs,
    E = c.setupState;
  if (
    (a != null &&
      a !== u &&
      (W(a)
        ? ((m[a] = null), S(E, a) && (E[a] = null))
        : ee(a) && (a.value = null)),
    M(u))
  )
    Me(u, c, 12, [o, m]);
  else {
    const w = W(u),
      P = ee(u);
    if (w || P) {
      const U = () => {
        if (e.f) {
          const N = w ? (S(E, u) ? E[u] : m[u]) : u.value;
          r
            ? A(N) && wn(N, i)
            : A(N)
            ? N.includes(i) || N.push(i)
            : w
            ? ((m[u] = [i]), S(E, u) && (E[u] = m[u]))
            : ((u.value = [i]), e.k && (m[e.k] = u.value));
        } else
          w
            ? ((m[u] = o), S(E, u) && (E[u] = o))
            : P && ((u.value = o), e.k && (m[e.k] = o));
      };
      o ? ((U.id = -1), te(U, n)) : U();
    }
  }
}
const te = Ai;
function so(e) {
  return ro(e);
}
function ro(e, t) {
  const n = ln();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: c,
      createComment: u,
      setText: a,
      setElementText: m,
      parentNode: E,
      nextSibling: w,
      setScopeId: P = ae,
      insertStaticContent: U,
    } = e,
    N = (
      l,
      f,
      d,
      p = null,
      h = null,
      b = null,
      y = !1,
      _ = null,
      x = !!f.dynamicChildren
    ) => {
      if (l === f) return;
      l && !it(l, f) && ((p = yt(l)), pe(l, h, b, !0), (l = null)),
        f.patchFlag === -2 && ((x = !1), (f.dynamicChildren = null));
      const { type: g, ref: v, shapeFlag: C } = f;
      switch (g) {
        case Jt:
          z(l, f, d, p);
          break;
        case Ue:
          k(l, f, d, p);
          break;
        case sn:
          l == null && V(f, d, p, y);
          break;
        case re:
          _t(l, f, d, p, h, b, y, _, x);
          break;
        default:
          C & 1
            ? Oe(l, f, d, p, h, b, y, _, x)
            : C & 6
            ? bt(l, f, d, p, h, b, y, _, x)
            : (C & 64 || C & 128) && g.process(l, f, d, p, h, b, y, _, x, $e);
      }
      v != null && h && bn(v, l && l.ref, b, f || l, !f);
    },
    z = (l, f, d, p) => {
      if (l == null) s((f.el = c(f.children)), d, p);
      else {
        const h = (f.el = l.el);
        f.children !== l.children && a(h, f.children);
      }
    },
    k = (l, f, d, p) => {
      l == null ? s((f.el = u(f.children || "")), d, p) : (f.el = l.el);
    },
    V = (l, f, d, p) => {
      [l.el, l.anchor] = U(l.children, f, d, p, l.el, l.anchor);
    },
    Y = ({ el: l, anchor: f }, d, p) => {
      let h;
      for (; l && l !== f; ) (h = w(l)), s(l, d, p), (l = h);
      s(f, d, p);
    },
    I = ({ el: l, anchor: f }) => {
      let d;
      for (; l && l !== f; ) (d = w(l)), r(l), (l = d);
      r(f);
    },
    Oe = (l, f, d, p, h, b, y, _, x) => {
      (y = y || f.type === "svg"),
        l == null ? nt(f, d, p, h, b, y, _, x) : kt(l, f, h, b, y, _, x);
    },
    nt = (l, f, d, p, h, b, y, _) => {
      let x, g;
      const { type: v, props: C, shapeFlag: O, transition: T, dirs: F } = l;
      if (
        ((x = l.el = o(l.type, b, C && C.is, C)),
        O & 8
          ? m(x, l.children)
          : O & 16 &&
            Fe(l.children, x, null, p, h, b && v !== "foreignObject", y, _),
        F && De(l, null, p, "created"),
        mt(x, l, l.scopeId, y, p),
        C)
      ) {
        for (const D in C)
          D !== "value" &&
            !At(D) &&
            i(x, D, null, C[D], b, l.children, p, h, Ee);
        "value" in C && i(x, "value", null, C.value),
          (g = C.onVnodeBeforeMount) && me(g, p, l);
      }
      F && De(l, null, p, "beforeMount");
      const j = (!h || (h && !h.pendingBranch)) && T && !T.persisted;
      j && T.beforeEnter(x),
        s(x, f, d),
        ((g = C && C.onVnodeMounted) || j || F) &&
          te(() => {
            g && me(g, p, l), j && T.enter(x), F && De(l, null, p, "mounted");
          }, h);
    },
    mt = (l, f, d, p, h) => {
      if ((d && P(l, d), p)) for (let b = 0; b < p.length; b++) P(l, p[b]);
      if (h) {
        let b = h.subTree;
        if (f === b) {
          const y = h.vnode;
          mt(l, y, y.scopeId, y.slotScopeIds, h.parent);
        }
      }
    },
    Fe = (l, f, d, p, h, b, y, _, x = 0) => {
      for (let g = x; g < l.length; g++) {
        const v = (l[g] = _ ? Ae(l[g]) : be(l[g]));
        N(null, v, f, d, p, h, b, y, _);
      }
    },
    kt = (l, f, d, p, h, b, y) => {
      const _ = (f.el = l.el);
      let { patchFlag: x, dynamicChildren: g, dirs: v } = f;
      x |= l.patchFlag & 16;
      const C = l.props || K,
        O = f.props || K;
      let T;
      d && Le(d, !1),
        (T = O.onVnodeBeforeUpdate) && me(T, d, f, l),
        v && De(f, l, d, "beforeUpdate"),
        d && Le(d, !0);
      const F = h && f.type !== "foreignObject";
      if (
        (g
          ? Ne(l.dynamicChildren, g, _, d, p, F, b)
          : y || L(l, f, _, null, d, p, F, b, !1),
        x > 0)
      ) {
        if (x & 16) st(_, f, C, O, d, p, h);
        else if (
          (x & 2 && C.class !== O.class && i(_, "class", null, O.class, h),
          x & 4 && i(_, "style", C.style, O.style, h),
          x & 8)
        ) {
          const j = f.dynamicProps;
          for (let D = 0; D < j.length; D++) {
            const $ = j[D],
              ie = C[$],
              We = O[$];
            (We !== ie || $ === "value") &&
              i(_, $, ie, We, h, l.children, d, p, Ee);
          }
        }
        x & 1 && l.children !== f.children && m(_, f.children);
      } else !y && g == null && st(_, f, C, O, d, p, h);
      ((T = O.onVnodeUpdated) || v) &&
        te(() => {
          T && me(T, d, f, l), v && De(f, l, d, "updated");
        }, p);
    },
    Ne = (l, f, d, p, h, b, y) => {
      for (let _ = 0; _ < f.length; _++) {
        const x = l[_],
          g = f[_],
          v =
            x.el && (x.type === re || !it(x, g) || x.shapeFlag & 70)
              ? E(x.el)
              : d;
        N(x, g, v, null, p, h, b, y, !0);
      }
    },
    st = (l, f, d, p, h, b, y) => {
      if (d !== p) {
        if (d !== K)
          for (const _ in d)
            !At(_) && !(_ in p) && i(l, _, d[_], null, y, f.children, h, b, Ee);
        for (const _ in p) {
          if (At(_)) continue;
          const x = p[_],
            g = d[_];
          x !== g && _ !== "value" && i(l, _, g, x, y, f.children, h, b, Ee);
        }
        "value" in p && i(l, "value", d.value, p.value);
      }
    },
    _t = (l, f, d, p, h, b, y, _, x) => {
      const g = (f.el = l ? l.el : c("")),
        v = (f.anchor = l ? l.anchor : c(""));
      let { patchFlag: C, dynamicChildren: O, slotScopeIds: T } = f;
      T && (_ = _ ? _.concat(T) : T),
        l == null
          ? (s(g, d, p), s(v, d, p), Fe(f.children, d, v, h, b, y, _, x))
          : C > 0 && C & 64 && O && l.dynamicChildren
          ? (Ne(l.dynamicChildren, O, d, h, b, y, _),
            (f.key != null || (h && f === h.subTree)) && ar(l, f, !0))
          : L(l, f, d, v, h, b, y, _, x);
    },
    bt = (l, f, d, p, h, b, y, _, x) => {
      (f.slotScopeIds = _),
        l == null
          ? f.shapeFlag & 512
            ? h.ctx.activate(f, d, p, y, x)
            : Vt(f, d, p, h, b, y, x)
          : $n(l, f, x);
    },
    Vt = (l, f, d, p, h, b, y) => {
      const _ = (l.component = mo(l, p, h));
      if ((Gs(l) && (_.ctx.renderer = $e), _o(_), _.asyncDep)) {
        if ((h && h.registerDep(_, Z), !l.el)) {
          const x = (_.subTree = he(Ue));
          k(null, x, f, d);
        }
        return;
      }
      Z(_, l, f, d, h, b, y);
    },
    $n = (l, f, d) => {
      const p = (f.component = l.component);
      if (vi(l, f, d))
        if (p.asyncDep && !p.asyncResolved) {
          B(p, f, d);
          return;
        } else (p.next = f), _i(p.update), p.update();
      else (f.el = l.el), (p.vnode = f);
    },
    Z = (l, f, d, p, h, b, y) => {
      const _ = () => {
          if (l.isMounted) {
            let { next: v, bu: C, u: O, parent: T, vnode: F } = l,
              j = v,
              D;
            Le(l, !1),
              v ? ((v.el = F.el), B(l, v, y)) : (v = F),
              C && Qt(C),
              (D = v.props && v.props.onVnodeBeforeUpdate) && me(D, T, v, F),
              Le(l, !0);
            const $ = en(l),
              ie = l.subTree;
            (l.subTree = $),
              N(ie, $, E(ie.el), yt(ie), l, h, b),
              (v.el = $.el),
              j === null && Oi(l, $.el),
              O && te(O, h),
              (D = v.props && v.props.onVnodeUpdated) &&
                te(() => me(D, T, v, F), h);
          } else {
            let v;
            const { el: C, props: O } = f,
              { bm: T, m: F, parent: j } = l,
              D = Pt(f);
            if (
              (Le(l, !1),
              T && Qt(T),
              !D && (v = O && O.onVnodeBeforeMount) && me(v, j, f),
              Le(l, !0),
              C && Xt)
            ) {
              const $ = () => {
                (l.subTree = en(l)), Xt(C, l.subTree, l, h, null);
              };
              D
                ? f.type.__asyncLoader().then(() => !l.isUnmounted && $())
                : $();
            } else {
              const $ = (l.subTree = en(l));
              N(null, $, d, p, l, h, b), (f.el = $.el);
            }
            if ((F && te(F, h), !D && (v = O && O.onVnodeMounted))) {
              const $ = f;
              te(() => me(v, j, $), h);
            }
            (f.shapeFlag & 256 ||
              (j && Pt(j.vnode) && j.vnode.shapeFlag & 256)) &&
              l.a &&
              te(l.a, h),
              (l.isMounted = !0),
              (f = d = p = null);
          }
        },
        x = (l.effect = new An(_, () => Ln(g), l.scope)),
        g = (l.update = () => x.run());
      (g.id = l.uid), Le(l, !0), g();
    },
    B = (l, f, d) => {
      f.component = l;
      const p = l.vnode.props;
      (l.vnode = f),
        (l.next = null),
        Gi(l, f.props, p, d),
        no(l, f.children, d),
        et(),
        ns(),
        tt();
    },
    L = (l, f, d, p, h, b, y, _, x = !1) => {
      const g = l && l.children,
        v = l ? l.shapeFlag : 0,
        C = f.children,
        { patchFlag: O, shapeFlag: T } = f;
      if (O > 0) {
        if (O & 128) {
          xt(g, C, d, p, h, b, y, _, x);
          return;
        } else if (O & 256) {
          Se(g, C, d, p, h, b, y, _, x);
          return;
        }
      }
      T & 8
        ? (v & 16 && Ee(g, h, b), C !== g && m(d, C))
        : v & 16
        ? T & 16
          ? xt(g, C, d, p, h, b, y, _, x)
          : Ee(g, h, b, !0)
        : (v & 8 && m(d, ""), T & 16 && Fe(C, d, p, h, b, y, _, x));
    },
    Se = (l, f, d, p, h, b, y, _, x) => {
      (l = l || qe), (f = f || qe);
      const g = l.length,
        v = f.length,
        C = Math.min(g, v);
      let O;
      for (O = 0; O < C; O++) {
        const T = (f[O] = x ? Ae(f[O]) : be(f[O]));
        N(l[O], T, d, null, h, b, y, _, x);
      }
      g > v ? Ee(l, h, b, !0, !1, C) : Fe(f, d, p, h, b, y, _, x, C);
    },
    xt = (l, f, d, p, h, b, y, _, x) => {
      let g = 0;
      const v = f.length;
      let C = l.length - 1,
        O = v - 1;
      for (; g <= C && g <= O; ) {
        const T = l[g],
          F = (f[g] = x ? Ae(f[g]) : be(f[g]));
        if (it(T, F)) N(T, F, d, null, h, b, y, _, x);
        else break;
        g++;
      }
      for (; g <= C && g <= O; ) {
        const T = l[C],
          F = (f[O] = x ? Ae(f[O]) : be(f[O]));
        if (it(T, F)) N(T, F, d, null, h, b, y, _, x);
        else break;
        C--, O--;
      }
      if (g > C) {
        if (g <= O) {
          const T = O + 1,
            F = T < v ? f[T].el : p;
          for (; g <= O; )
            N(null, (f[g] = x ? Ae(f[g]) : be(f[g])), d, F, h, b, y, _, x), g++;
        }
      } else if (g > O) for (; g <= C; ) pe(l[g], h, b, !0), g++;
      else {
        const T = g,
          F = g,
          j = new Map();
        for (g = F; g <= O; g++) {
          const se = (f[g] = x ? Ae(f[g]) : be(f[g]));
          se.key != null && j.set(se.key, g);
        }
        let D,
          $ = 0;
        const ie = O - F + 1;
        let We = !1,
          Jn = 0;
        const rt = new Array(ie);
        for (g = 0; g < ie; g++) rt[g] = 0;
        for (g = T; g <= C; g++) {
          const se = l[g];
          if ($ >= ie) {
            pe(se, h, b, !0);
            continue;
          }
          let ge;
          if (se.key != null) ge = j.get(se.key);
          else
            for (D = F; D <= O; D++)
              if (rt[D - F] === 0 && it(se, f[D])) {
                ge = D;
                break;
              }
          ge === void 0
            ? pe(se, h, b, !0)
            : ((rt[ge - F] = g + 1),
              ge >= Jn ? (Jn = ge) : (We = !0),
              N(se, f[ge], d, null, h, b, y, _, x),
              $++);
        }
        const qn = We ? io(rt) : qe;
        for (D = qn.length - 1, g = ie - 1; g >= 0; g--) {
          const se = F + g,
            ge = f[se],
            kn = se + 1 < v ? f[se + 1].el : p;
          rt[g] === 0
            ? N(null, ge, d, kn, h, b, y, _, x)
            : We && (D < 0 || g !== qn[D] ? Re(ge, d, kn, 2) : D--);
        }
      }
    },
    Re = (l, f, d, p, h = null) => {
      const { el: b, type: y, transition: _, children: x, shapeFlag: g } = l;
      if (g & 6) {
        Re(l.component.subTree, f, d, p);
        return;
      }
      if (g & 128) {
        l.suspense.move(f, d, p);
        return;
      }
      if (g & 64) {
        y.move(l, f, d, $e);
        return;
      }
      if (y === re) {
        s(b, f, d);
        for (let C = 0; C < x.length; C++) Re(x[C], f, d, p);
        s(l.anchor, f, d);
        return;
      }
      if (y === sn) {
        Y(l, f, d);
        return;
      }
      if (p !== 2 && g & 1 && _)
        if (p === 0) _.beforeEnter(b), s(b, f, d), te(() => _.enter(b), h);
        else {
          const { leave: C, delayLeave: O, afterLeave: T } = _,
            F = () => s(b, f, d),
            j = () => {
              C(b, () => {
                F(), T && T();
              });
            };
          O ? O(b, F, j) : j();
        }
      else s(b, f, d);
    },
    pe = (l, f, d, p = !1, h = !1) => {
      const {
        type: b,
        props: y,
        ref: _,
        children: x,
        dynamicChildren: g,
        shapeFlag: v,
        patchFlag: C,
        dirs: O,
      } = l;
      if ((_ != null && bn(_, null, d, l, !0), v & 256)) {
        f.ctx.deactivate(l);
        return;
      }
      const T = v & 1 && O,
        F = !Pt(l);
      let j;
      if ((F && (j = y && y.onVnodeBeforeUnmount) && me(j, f, l), v & 6))
        br(l.component, d, p);
      else {
        if (v & 128) {
          l.suspense.unmount(d, p);
          return;
        }
        T && De(l, null, f, "beforeUnmount"),
          v & 64
            ? l.type.remove(l, f, d, h, $e, p)
            : g && (b !== re || (C > 0 && C & 64))
            ? Ee(g, f, d, !1, !0)
            : ((b === re && C & 384) || (!h && v & 16)) && Ee(x, f, d),
          p && Wn(l);
      }
      ((F && (j = y && y.onVnodeUnmounted)) || T) &&
        te(() => {
          j && me(j, f, l), T && De(l, null, f, "unmounted");
        }, d);
    },
    Wn = (l) => {
      const { type: f, el: d, anchor: p, transition: h } = l;
      if (f === re) {
        _r(d, p);
        return;
      }
      if (f === sn) {
        I(l);
        return;
      }
      const b = () => {
        r(d), h && !h.persisted && h.afterLeave && h.afterLeave();
      };
      if (l.shapeFlag & 1 && h && !h.persisted) {
        const { leave: y, delayLeave: _ } = h,
          x = () => y(d, b);
        _ ? _(l.el, b, x) : x();
      } else b();
    },
    _r = (l, f) => {
      let d;
      for (; l !== f; ) (d = w(l)), r(l), (l = d);
      r(f);
    },
    br = (l, f, d) => {
      const { bum: p, scope: h, update: b, subTree: y, um: _ } = l;
      p && Qt(p),
        h.stop(),
        b && ((b.active = !1), pe(y, l, f, d)),
        _ && te(_, f),
        te(() => {
          l.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          l.asyncDep &&
          !l.asyncResolved &&
          l.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    Ee = (l, f, d, p = !1, h = !1, b = 0) => {
      for (let y = b; y < l.length; y++) pe(l[y], f, d, p, h);
    },
    yt = (l) =>
      l.shapeFlag & 6
        ? yt(l.component.subTree)
        : l.shapeFlag & 128
        ? l.suspense.next()
        : w(l.anchor || l.el),
    zn = (l, f, d) => {
      l == null
        ? f._vnode && pe(f._vnode, null, null, !0)
        : N(f._vnode || null, l, f, null, null, null, d),
        ns(),
        ks(),
        (f._vnode = l);
    },
    $e = {
      p: N,
      um: pe,
      m: Re,
      r: Wn,
      mt: Vt,
      mc: Fe,
      pc: L,
      pbc: Ne,
      n: yt,
      o: e,
    };
  let Yt, Xt;
  return (
    t && ([Yt, Xt] = t($e)), { render: zn, hydrate: Yt, createApp: Xi(zn, Yt) }
  );
}
function Le({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function ar(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (A(s) && A(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let c = r[i];
      c.shapeFlag & 1 &&
        !c.dynamicChildren &&
        ((c.patchFlag <= 0 || c.patchFlag === 32) &&
          ((c = r[i] = Ae(r[i])), (c.el = o.el)),
        n || ar(o, c)),
        c.type === Jt && (c.el = o.el);
    }
}
function io(e) {
  const t = e.slice(),
    n = [0];
  let s, r, i, o, c;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const a = e[s];
    if (a !== 0) {
      if (((r = n[n.length - 1]), e[r] < a)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        (c = (i + o) >> 1), e[n[c]] < a ? (i = c + 1) : (o = c);
      a < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s));
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o]);
  return n;
}
const oo = (e) => e.__isTeleport,
  re = Symbol.for("v-fgt"),
  Jt = Symbol.for("v-txt"),
  Ue = Symbol.for("v-cmt"),
  sn = Symbol.for("v-stc"),
  ut = [];
let ue = null;
function le(e = !1) {
  ut.push((ue = e ? null : []));
}
function lo() {
  ut.pop(), (ue = ut[ut.length - 1] || null);
}
let pt = 1;
function ps(e) {
  pt += e;
}
function dr(e) {
  return (
    (e.dynamicChildren = pt > 0 ? ue || qe : null),
    lo(),
    pt > 0 && ue && ue.push(e),
    e
  );
}
function _e(e, t, n, s, r, i) {
  return dr(G(e, t, n, s, r, i, !0));
}
function co(e, t, n, s, r) {
  return dr(he(e, t, n, s, r, !0));
}
function fo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function it(e, t) {
  return e.type === t.type && e.key === t.key;
}
const qt = "__vInternal",
  hr = ({ key: e }) => e ?? null,
  It = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? W(e) || ee(e) || M(e)
        ? { i: fe, r: e, k: t, f: !!n }
        : e
      : null
  );
function G(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  i = e === re ? 0 : 1,
  o = !1,
  c = !1
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && hr(t),
    ref: t && It(t),
    scopeId: Xs,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: fe,
  };
  return (
    c
      ? (Hn(u, n), i & 128 && e.normalize(u))
      : n && (u.shapeFlag |= W(n) ? 8 : 16),
    pt > 0 &&
      !o &&
      ue &&
      (u.patchFlag > 0 || i & 6) &&
      u.patchFlag !== 32 &&
      ue.push(u),
    u
  );
}
const he = uo;
function uo(e, t = null, n = null, s = 0, r = null, i = !1) {
  if (((!e || e === Ui) && (e = Ue), fo(e))) {
    const c = Ze(e, t, !0);
    return (
      n && Hn(c, n),
      pt > 0 &&
        !i &&
        ue &&
        (c.shapeFlag & 6 ? (ue[ue.indexOf(e)] = c) : ue.push(c)),
      (c.patchFlag |= -2),
      c
    );
  }
  if ((Co(e) && (e = e.__vccOpts), t)) {
    t = ao(t);
    let { class: c, style: u } = t;
    c && !W(c) && (t.class = Ve(c)),
      H(u) && ($s(u) && !A(u) && (u = q({}, u)), (t.style = Bt(u)));
  }
  const o = W(e) ? 1 : Ti(e) ? 128 : oo(e) ? 64 : H(e) ? 4 : M(e) ? 2 : 0;
  return G(e, t, n, s, r, o, i, !0);
}
function ao(e) {
  return e ? ($s(e) || qt in e ? q({}, e) : e) : null;
}
function Ze(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: i, children: o } = e,
    c = t ? ho(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && hr(c),
    ref:
      t && t.ref ? (n && r ? (A(r) ? r.concat(It(t)) : [r, It(t)]) : It(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== re ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ze(e.ssContent),
    ssFallback: e.ssFallback && Ze(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function xn(e = " ", t = 0) {
  return he(Jt, null, e, t);
}
function ot(e = "", t = !1) {
  return t ? (le(), co(Ue, null, e)) : he(Ue, null, e);
}
function be(e) {
  return e == null || typeof e == "boolean"
    ? he(Ue)
    : A(e)
    ? he(re, null, e.slice())
    : typeof e == "object"
    ? Ae(e)
    : he(Jt, null, String(e));
}
function Ae(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ze(e);
}
function Hn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (A(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Hn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(qt in t)
        ? (t._ctx = fe)
        : r === 3 &&
          fe &&
          (fe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    M(t)
      ? ((t = { default: t, _ctx: fe }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [xn(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function ho(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Ve([t.class, s.class]));
      else if (r === "style") t.style = Bt([t.style, s.style]);
      else if (Lt(r)) {
        const i = t[r],
          o = s[r];
        o &&
          i !== o &&
          !(A(i) && i.includes(o)) &&
          (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function me(e, t, n, s = null) {
  de(e, t, 7, [n, s]);
}
const po = ir();
let go = 0;
function mo(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || po,
    i = {
      uid: go++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Nr(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: lr(s, r),
      emitsOptions: Ys(s, r),
      emit: null,
      emitted: null,
      propsDefaults: K,
      inheritAttrs: s.inheritAttrs,
      ctx: K,
      data: K,
      props: K,
      attrs: K,
      slots: K,
      refs: K,
      setupState: K,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = yi.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let J = null,
  Bn,
  ze,
  gs = "__VUE_INSTANCE_SETTERS__";
(ze = ln()[gs]) || (ze = ln()[gs] = []),
  ze.push((e) => (J = e)),
  (Bn = (e) => {
    ze.length > 1 ? ze.forEach((t) => t(e)) : ze[0](e);
  });
const Qe = (e) => {
    Bn(e), e.scope.on();
  },
  Be = () => {
    J && J.scope.off(), Bn(null);
  };
function pr(e) {
  return e.vnode.shapeFlag & 4;
}
let gt = !1;
function _o(e, t = !1) {
  gt = t;
  const { props: n, children: s } = e.vnode,
    r = pr(e);
  Qi(e, n, r, t), to(e, s);
  const i = r ? bo(e, t) : void 0;
  return (gt = !1), i;
}
function bo(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Ws(new Proxy(e.ctx, Wi)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? yo(e) : null);
    Qe(e), et();
    const i = Me(s, e, 0, [e.props, r]);
    if ((tt(), Be(), Ts(i))) {
      if ((i.then(Be, Be), t))
        return i
          .then((o) => {
            ms(e, o, t);
          })
          .catch((o) => {
            $t(o, e, 0);
          });
      e.asyncDep = i;
    } else ms(e, i, t);
  } else gr(e, t);
}
function ms(e, t, n) {
  M(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : H(t) && (e.setupState = zs(t)),
    gr(e, n);
}
let _s;
function gr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && _s && !s.render) {
      const r = s.template || jn(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config,
          { delimiters: c, compilerOptions: u } = s,
          a = q(q({ isCustomElement: i, delimiters: c }, o), u);
        s.render = _s(r, a);
      }
    }
    e.render = s.render || ae;
  }
  Qe(e), et(), zi(e), tt(), Be();
}
function xo(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return ne(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function yo(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return xo(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Un(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(zs(Ws(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in ft) return ft[n](e);
        },
        has(t, n) {
          return n in t || n in ft;
        },
      }))
    );
}
function Eo(e, t = !0) {
  return M(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Co(e) {
  return M(e) && "__vccOpts" in e;
}
const wo = (e, t) => hi(e, t, gt),
  vo = Symbol.for("v-scx"),
  Oo = () => Mt(vo),
  To = "3.3.4",
  Ao = "http://www.w3.org/2000/svg",
  Ke = typeof document < "u" ? document : null,
  bs = Ke && Ke.createElement("template"),
  Po = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? Ke.createElementNS(Ao, e)
        : Ke.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => Ke.createTextNode(e),
    createComment: (e) => Ke.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ke.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, i) {
      const o = n ? n.previousSibling : t.lastChild;
      if (r && (r === i || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === i || !(r = r.nextSibling));

        );
      else {
        bs.innerHTML = s ? `<svg>${e}</svg>` : e;
        const c = bs.content;
        if (s) {
          const u = c.firstChild;
          for (; u.firstChild; ) c.appendChild(u.firstChild);
          c.removeChild(u);
        }
        t.insertBefore(c, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Mo(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Io(e, t, n) {
  const s = e.style,
    r = W(n);
  if (n && !r) {
    if (t && !W(t)) for (const i in t) n[i] == null && yn(s, i, "");
    for (const i in n) yn(s, i, n[i]);
  } else {
    const i = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = i);
  }
}
const xs = /\s*!important$/;
function yn(e, t, n) {
  if (A(n)) n.forEach((s) => yn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = Fo(e, t);
    xs.test(n)
      ? e.setProperty(Ge(s), n.replace(xs, ""), "important")
      : (e[s] = n);
  }
}
const ys = ["Webkit", "Moz", "ms"],
  rn = {};
function Fo(e, t) {
  const n = rn[t];
  if (n) return n;
  let s = ye(t);
  if (s !== "filter" && s in e) return (rn[t] = s);
  s = Ht(s);
  for (let r = 0; r < ys.length; r++) {
    const i = ys[r] + s;
    if (i in e) return (rn[t] = i);
  }
  return t;
}
const Es = "http://www.w3.org/1999/xlink";
function No(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Es, t.slice(6, t.length))
      : e.setAttributeNS(Es, t, n);
  else {
    const i = Fr(t);
    n == null || (i && !Ms(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : n);
  }
}
function So(e, t, n, s, r, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, r, i), (e[t] = n ?? "");
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && !c.includes("-")) {
    e._value = n;
    const a = c === "OPTION" ? e.getAttribute("value") : e.value,
      m = n ?? "";
    a !== m && (e.value = m), n == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean"
      ? (n = Ms(n))
      : n == null && a === "string"
      ? ((n = ""), (u = !0))
      : a === "number" && ((n = 0), (u = !0));
  }
  try {
    e[t] = n;
  } catch {}
  u && e.removeAttribute(t);
}
function Ro(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Do(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Lo(e, t, n, s, r = null) {
  const i = e._vei || (e._vei = {}),
    o = i[t];
  if (s && o) o.value = s;
  else {
    const [c, u] = jo(t);
    if (s) {
      const a = (i[t] = Bo(s, r));
      Ro(e, c, a, u);
    } else o && (Do(e, c, o, u), (i[t] = void 0));
  }
}
const Cs = /(?:Once|Passive|Capture)$/;
function jo(e) {
  let t;
  if (Cs.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Cs)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Ge(e.slice(2)), t];
}
let on = 0;
const Ko = Promise.resolve(),
  Ho = () => on || (Ko.then(() => (on = 0)), (on = Date.now()));
function Bo(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    de(Uo(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Ho()), n;
}
function Uo(e, t) {
  if (A(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const ws = /^on[a-z]/,
  $o = (e, t, n, s, r = !1, i, o, c, u) => {
    t === "class"
      ? Mo(e, s, r)
      : t === "style"
      ? Io(e, n, s)
      : Lt(t)
      ? Cn(t) || Lo(e, t, n, s, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Wo(e, t, s, r)
        )
      ? So(e, t, s, i, o, c, u)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        No(e, t, s, r));
  };
function Wo(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && ws.test(t) && M(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (ws.test(t) && W(n))
    ? !1
    : t in e;
}
const zo = ["ctrl", "shift", "alt", "meta"],
  Jo = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => zo.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  qo =
    (e, t) =>
    (n, ...s) => {
      for (let r = 0; r < t.length; r++) {
        const i = Jo[t[r]];
        if (i && i(n, t)) return;
      }
      return e(n, ...s);
    },
  ko = q({ patchProp: $o }, Po);
let vs;
function Vo() {
  return vs || (vs = so(ko));
}
const Yo = (...e) => {
  const t = Vo().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Xo(s);
      if (!r) return;
      const i = t._component;
      !M(i) && !i.render && !i.template && (i.template = r.innerHTML),
        (r.innerHTML = "");
      const o = n(r, !1, r instanceof SVGElement);
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        o
      );
    }),
    t
  );
};
function Xo(e) {
  return W(e) ? document.querySelector(e) : e;
}
const mr = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  Zo = {
    name: "OrganizationChart",
    props: ["data"],
    data() {
      return { orgData: {} };
    },
    watch: {
      data: {
        handler: function (e) {
          const t = function (n) {
            return (
              (n.extend = !0),
              Array.isArray(n.children) &&
                n.children.forEach((s) => {
                  t(s);
                }),
              n
            );
          };
          e && (this.orgData = t(e));
        },
        immediate: !0,
      },
    },
    methods: {
      setToggleExtend: function (e, t) {
        (e.extend = t),
          Array.isArray(e.children) &&
            e.children.forEach((n) => {
              this.setToggleExtend(n, t);
            }),
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
  },
  Qo = { key: 0, class: "org-table" },
  Go = ["colspan"],
  el = { class: "org-node" },
  tl = ["onClick"],
  nl = { class: "item-box" },
  sl = { class: "item-title" },
  rl = { class: "item-add" },
  il = { key: 0, class: "avat" },
  ol = ["src"];
function ll(e, t, n, s, r, i) {
  const o = sr("OrganizationChart", !0);
  return r.orgData.title
    ? (le(),
      _e("table", Qo, [
        G("tr", null, [
          G(
            "td",
            {
              colspan: Array.isArray(r.orgData.children)
                ? r.orgData.children.length * 2
                : 1,
              class: Ve({
                "org-parent-level": i.isChildren(),
                "org-extend": i.isChildren() && r.orgData.extend,
              }),
            },
            [
              G("div", el, [
                G(
                  "div",
                  {
                    class: "org-container",
                    onClick:
                      t[0] || (t[0] = (c) => e.$emit("click-node", r.orgData)),
                  },
                  [
                    G(
                      "div",
                      { class: Ve(["org-title", r.orgData.titleClass || []]) },
                      Gt(r.orgData.title),
                      3
                    ),
                    i.isMember()
                      ? (le(),
                        _e(
                          "div",
                          {
                            key: 0,
                            class: Ve([
                              "org-content",
                              r.orgData.contentClass || [],
                            ]),
                          },
                          [
                            (le(!0),
                            _e(
                              re,
                              null,
                              is(
                                r.orgData.member,
                                (c, u) => (
                                  le(),
                                  _e(
                                    "div",
                                    {
                                      class: "org-content-item",
                                      onClick: qo(
                                        (a) => e.$emit("click-node", c),
                                        ["stop"]
                                      ),
                                    },
                                    [
                                      G("div", nl, [
                                        G("p", sl, Gt(c.name), 1),
                                        G("p", rl, Gt(c.add), 1),
                                      ]),
                                      c.image_url
                                        ? (le(),
                                          _e("div", il, [
                                            G(
                                              "img",
                                              { src: c.image_url },
                                              null,
                                              8,
                                              ol
                                            ),
                                          ]))
                                        : ot("", !0),
                                    ],
                                    8,
                                    tl
                                  )
                                )
                              ),
                              256
                            )),
                          ],
                          2
                        ))
                      : ot("", !0),
                  ]
                ),
              ]),
              i.isChildren()
                ? (le(),
                  _e("div", {
                    key: 0,
                    class: "org-extend-arrow",
                    onClick:
                      t[1] ||
                      (t[1] = (c) =>
                        i.setToggleExtend(r.orgData, !r.orgData.extend)),
                  }))
                : ot("", !0),
            ],
            10,
            Go
          ),
        ]),
        i.isChildren()
          ? (le(),
            _e(
              "tr",
              {
                key: 0,
                style: Bt({
                  visibility: r.orgData.extend ? "visible" : "hidden",
                }),
              },
              [
                (le(!0),
                _e(
                  re,
                  null,
                  is(
                    r.orgData.children,
                    (c, u) => (
                      le(),
                      _e(
                        "td",
                        { key: u, colspan: "2", class: "org-child-level" },
                        [
                          he(
                            o,
                            {
                              data: c,
                              onClickNode:
                                t[2] ||
                                (t[2] = (a) => e.$emit("click-node", a)),
                            },
                            null,
                            8,
                            ["data"]
                          ),
                        ]
                      )
                    )
                  ),
                  128
                )),
              ],
              4
            ))
          : ot("", !0),
      ]))
    : ot("", !0);
}
const cl = mr(Zo, [["render", ll]]);
const fl = {
    name: "app",
    components: { OrganizationChart: cl },
    data() {
      return {
        orgData: {
          title: "CEO",
          member: [
            {
              name: "Oliver",
              image_url:
                "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
            },
          ],
          children: [
            {
              title: "MANAGEMENT",
              member: [
                {
                  name: "Jake",
                  add: "Junior Staff",
                  image_url:
                    "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
                },
                {
                  name: "Noah",
                  add: "Senior Staff",
                  image_url:
                    "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
                },
                {
                  name: "James",
                  add: "Senior Manager",
                  image_url:
                    "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
                },
              ],
            },
            {
              title: "DEVELOPMENT",
              member: [
                {
                  name: "Emma",
                  add: "CTO",
                  image_url:
                    "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
                },
              ],
              children: [
                {
                  title: "FRONTEND",
                  titleClass: "frontend-title",
                  contentClass: "frontend-content",
                  member: [
                    { name: "David", add: "Senior Staff" },
                    { name: "Ava", add: "Senior Staff" },
                    { name: "Sophia", add: "Senior Staff" },
                  ],
                },
                {
                  title: "BACKEND",
                  titleClass: "backend-title",
                  contentClass: "backend-content",
                  member: [
                    { name: "Kyle", add: "Senior Staff" },
                    { name: "Richard", add: "Senior Staff" },
                    { name: "Daniel", add: "Senior Staff" },
                  ],
                },
              ],
            },
            {
              title: "DESIGN",
              member: [{ name: "Jacob", add: "Senior Staff" }],
            },
            { title: "MARKETING" },
            {
              title: "SALES",
              children: [{ title: "SALES A TEAM" }, { title: "SALES B TEAM" }],
            },
          ],
        },
      };
    },
    methods: {
      clickNode: function (e) {
        console.log(e);
      },
    },
  },
  ul = G(
    "footer",
    { class: "foot" },
    [
      G("p", null, [
        xn(" Blog "),
        G(
          "a",
          { href: "https://leejams.github.io/", target: "_blank" },
          "LeeJam"
        ),
        xn(" Github "),
        G(
          "a",
          {
            href: "https://github.com/LeeJams/Organization-Chart-Vue3",
            target: "_blank",
          },
          "Organization-Chart-Vue3"
        ),
      ]),
    ],
    -1
  );
function al(e, t, n, s, r, i) {
  const o = sr("OrganizationChart");
  return (
    le(),
    _e(
      re,
      null,
      [
        he(o, { data: r.orgData, onClickNode: i.clickNode }, null, 8, [
          "data",
          "onClickNode",
        ]),
        ul,
      ],
      64
    )
  );
}
const dl = mr(fl, [["render", al]]);
Yo(dl).mount("#app");
