var u = Object.defineProperty;
var l = (s, e, t) => e in s ? u(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var i = (s, e, t) => l(s, typeof e != "symbol" ? e + "" : e, t);
class a {
  constructor(e, t) {
    this.operator = e, this.clickedStyle = t;
  }
  fireClickEffect(e) {
    const t = this.getOriginalStyle(e);
    this.operator.setStyle(e, this.clickedStyle), this.operator.lazySetStyle(e, t, 300);
  }
  getOriginalStyle(e) {
    const t = {};
    for (const [r, o] of this.toObjectEntriesCursorStyle(this.clickedStyle)) {
      const c = this.operator.getDomStyle(e, r);
      t[r] = c;
    }
    return t;
  }
  toObjectEntriesCursorStyle(e) {
    return Object.entries(e);
  }
}
class h {
  fireClickEffect(e) {
  }
}
class f {
  constructor(e, t) {
    i(this, "cursorID", "cursorMagic");
    i(this, "cursorAreaDom", "body");
    i(this, "cursorSize", 50);
    i(this, "cursorStyle", {
      transition: "0.2s",
      transitionTimingFunction: "ease-out",
      border: "1px solid #b8b8b8",
      borderRadius: "100%"
    });
    i(this, "cursorClickEffect");
    this.operator = e, this.options = t, t && (this.cursorID = t.cursorID ?? this.cursorID, this.cursorAreaDom = t.cursorAreaDom ?? this.cursorAreaDom, this.cursorSize = t.cursorSize ?? this.cursorSize, this.cursorStyle = t.cursorStyle ? { ...this.cursorStyle, ...t.cursorStyle } : this.cursorStyle), this.cursorClickEffect = (t == null ? void 0 : t.cursorClickEffect) ?? new h();
  }
  createCursor() {
    if (!this.operator.createDom({
      parentDom: this.cursorAreaDom,
      tagName: "div",
      specifiedType: "id",
      specifiedName: this.cursorID,
      style: this.makeStyle()
    }))
      throw new Error(m.failedCreateCursor);
    this.operator.hiddenDom(`#${this.cursorID}`);
  }
  setMouseMoveEvent(e) {
    this.operator.addEventListener(this.cursorAreaDom, {
      type: "mousemove",
      listener: e
    });
  }
  setMouseLeaveEvent(e) {
    this.operator.addEventListener(this.cursorAreaDom, {
      type: "mouseleave",
      listener: e
    });
  }
  updatedMousePosition(e) {
    this.operator.isVisibleDom(`#${this.cursorID}`) || this.operator.showDom(`#${this.cursorID}`), this.operator.moveDom(`#${this.cursorID}`, this.calculateCursorPosition(e));
  }
  hiddenCursorPointer() {
    this.operator.hiddenDom(`#${this.cursorID}`);
  }
  setMouseEnterEvent(e) {
    this.operator.addEventListener(
      this.cursorAreaDom,
      {
        type: "mouseenter",
        listener: e
      }
    );
  }
  showCursorPointer() {
    this.operator.showDom(`#${this.cursorID}`);
  }
  setMouseClickEvent(e) {
    this.operator.addEventListener(`#${this.cursorID}`, {
      type: "click",
      listener: e
    });
  }
  fireClickCursorPointer() {
    this.cursorClickEffect.fireClickEffect(`#${this.cursorID}`);
  }
  makeStyle() {
    return {
      width: `${this.cursorSize}px`,
      height: `${this.cursorSize}px`,
      position: "absolute",
      top: "0px",
      left: "0px",
      ...this.cursorStyle
    };
  }
  calculateCursorPosition(e) {
    return {
      x: e.x - this.cursorSize / 2,
      y: e.y - this.cursorSize / 2
    };
  }
}
const m = {
  failedCreateCursor: "Failed create cursorMagic dom"
};
function y(s) {
  return s = s.replace(/^ *?[A-Z]/, function(e) {
    return e.toLowerCase();
  }), s = s.replace(/_/g, "-"), s = s.replace(/ *?[A-Z]/g, function(e, t) {
    return "-" + e.replace(/ /g, "").toLowerCase();
  }), s;
}
class n {
  createDom(e) {
    const t = this.findParentDom(e.parentDom);
    if (t === null)
      return !1;
    const r = this.createEmptyNewDom(e.tagName, e.specifiedType, e.specifiedName);
    return e.style && this.setDomStyle(r, e.style), t.insertBefore(r, t.firstChild), !0;
  }
  addEventListener(e, t) {
    const r = this.findParentDom(e);
    return r === null ? !1 : (r.addEventListener(t.type, (o) => {
      t.type === "mousemove" && o instanceof MouseEvent && t.listener(o.clientX, o.clientY), t.type === "mouseleave" && t.listener(), t.type === "mouseenter" && t.listener(), t.type === "click" && t.listener();
    }), !0);
  }
  moveDom(e, t) {
    const r = this.findParentDom(e);
    r !== null && (r.style.left = `${t.x}px`, r.style.top = `${t.y}px`);
  }
  hiddenDom(e) {
    const t = this.findParentDom(e);
    t !== null && (t.style.display = "none");
  }
  showDom(e) {
    const t = this.findParentDom(e);
    t !== null && (t.style.display = "block");
  }
  isVisibleDom(e) {
    const t = this.findParentDom(e);
    return t === null ? !1 : t.style.display !== "none";
  }
  setStyle(e, t) {
    const r = this.findParentDom(e);
    r && this.setDomStyle(r, t);
  }
  lazySetStyle(e, t, r) {
    const o = this.findParentDom(e);
    o && setTimeout(function(c) {
      c.setDomStyle(o, t);
    }, r, this);
  }
  getDomStyle(e, t) {
    const r = this.findParentDom(e);
    if (r !== null)
      return r.style.getPropertyValue(t);
  }
  createEmptyNewDom(e, t, r) {
    const o = document.createElement(e), c = t === "id" ? "id" : "class";
    return o.setAttribute(c, r), o;
  }
  findParentDom(e) {
    return document.querySelector(e);
  }
  setDomStyle(e, t) {
    for (const [r, o] of Object.entries(t))
      typeof o == "string" && e.style.setProperty(y(r), o);
    return e;
  }
}
function p(s) {
  const e = s != null && s.useClickEffect ? new a(new n(), {
    transform: "scale(1.25)"
  }) : void 0;
  d({ ...s, cursorClickEffect: e });
}
function d(s) {
  const e = new f(new n(), s);
  e.createCursor(), e.setMouseMoveEvent((t, r) => {
    e.updatedMousePosition({ x: t, y: r });
  }), e.setMouseLeaveEvent(() => e.hiddenCursorPointer()), e.setMouseEnterEvent(() => e.showCursorPointer()), e.setMouseClickEvent(() => e.fireClickCursorPointer());
}
export {
  p as createCursorMagic,
  d as initCursorMagic
};
