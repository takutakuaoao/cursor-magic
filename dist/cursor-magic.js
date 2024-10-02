var u = Object.defineProperty;
var a = (s, e, t) => e in s ? u(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var i = (s, e, t) => a(s, typeof e != "symbol" ? e + "" : e, t);
class c {
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
    this.operator = e, this.options = t, t && (this.cursorID = t.cursorID ?? this.cursorID, this.cursorAreaDom = t.cursorAreaDom ?? this.cursorAreaDom, this.cursorSize = t.cursorSize ?? this.cursorSize, this.cursorStyle = t.cursorStyle ? { ...this.cursorStyle, ...t.cursorStyle } : this.cursorStyle);
  }
  createCursor() {
    if (!this.operator.createDom({
      parentDom: this.cursorAreaDom,
      tagName: "div",
      specifiedType: "id",
      specifiedName: this.cursorID,
      style: this.makeStyle()
    }))
      throw new Error(l.failedCreateCursor);
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
  makeStyle() {
    return {
      width: `${this.cursorSize}px`,
      height: `${this.cursorSize}px`,
      position: "absolute",
      top: "0px",
      left: "0px",
      pointerEvents: "none",
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
const l = {
  failedCreateCursor: "Failed create cursorMagic dom"
};
function h(s) {
  return s = s.replace(/^ *?[A-Z]/, function(e) {
    return e.toLowerCase();
  }), s = s.replace(/_/g, "-"), s = s.replace(/ *?[A-Z]/g, function(e, t) {
    return "-" + e.replace(/ /g, "").toLowerCase();
  }), s;
}
class m {
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
    o && setTimeout(function(n) {
      n.setDomStyle(o, t);
    }, r, this);
  }
  getDomStyle(e, t) {
    const r = this.findParentDom(e);
    if (r !== null)
      return r.style.getPropertyValue(t);
  }
  createEmptyNewDom(e, t, r) {
    const o = document.createElement(e), n = t === "id" ? "id" : "class";
    return o.setAttribute(n, r), o;
  }
  findParentDom(e) {
    return document.querySelector(e);
  }
  setDomStyle(e, t) {
    for (const [r, o] of Object.entries(t))
      typeof o == "string" && e.style.setProperty(h(r), o);
    return e;
  }
}
function y(s) {
  d({ ...s });
}
function d(s) {
  const e = new c(new m(), s);
  e.createCursor(), e.setMouseMoveEvent((t, r) => {
    e.updatedMousePosition({ x: t, y: r });
  }), e.setMouseLeaveEvent(() => e.hiddenCursorPointer()), e.setMouseEnterEvent(() => e.showCursorPointer());
}
export {
  y as createCursorMagic,
  d as initCursorMagic
};
