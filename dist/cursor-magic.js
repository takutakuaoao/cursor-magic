var u = Object.defineProperty;
var a = (t, e, r) => e in t ? u(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var n = (t, e, r) => a(t, typeof e != "symbol" ? e + "" : e, r);
class c {
  constructor(e, r) {
    n(this, "cursorID", "cursorMagic");
    n(this, "cursorAreaDom", "body");
    n(this, "cursorSize", 30);
    this.operator = e, this.options = r, r && (this.cursorID = r.cursorID ?? this.cursorID, this.cursorAreaDom = r.cursorAreaDom ?? this.cursorAreaDom, this.cursorSize = r.cursorSize ?? this.cursorSize);
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
  }
  setMouseMoveEvent(e) {
    this.operator.addEventListener(this.cursorAreaDom, "mousemove", e);
  }
  updatedMousePosition(e) {
    this.operator.moveDom(`#${this.cursorID}`, this.calculateCursorPosition(e));
  }
  makeStyle() {
    return {
      width: `${this.cursorSize}px`,
      height: `${this.cursorSize}px`,
      transition: "0.2s",
      transitionTimingFunction: "ease-out",
      position: "absolute",
      top: "0px",
      left: "0px",
      backgroundColor: "#7a7a7ae3",
      borderRadius: "100%"
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
function m(t) {
  return t = t.replace(/^ *?[A-Z]/, function(e) {
    return e.toLowerCase();
  }), t = t.replace(/_/g, "-"), t = t.replace(/ *?[A-Z]/g, function(e, r) {
    return "-" + e.replace(/ /g, "").toLowerCase();
  }), t;
}
class f {
  createDom(e) {
    const r = this.findParentDom(e.parentDom);
    if (r === null)
      return !1;
    const o = this.createEmptyNewDom(e.tagName, e.specifiedType, e.specifiedName);
    return e.style && this.setDomStyle(o, e.style), r.insertBefore(o, r.firstChild), !0;
  }
  addEventListener(e, r, o) {
    const s = this.findParentDom(e);
    return s === null ? !1 : (s.addEventListener(r, (i) => {
      r === "mousemove" && i instanceof MouseEvent && o(i.clientX, i.clientY);
    }), !0);
  }
  moveDom(e, r) {
    const o = this.findParentDom(e);
    o !== null && o instanceof HTMLElement && (o.style.left = `${r.x}px`, o.style.top = `${r.y}px`);
  }
  createEmptyNewDom(e, r, o) {
    const s = document.createElement(e), i = r === "id" ? "id" : "class";
    return s.setAttribute(i, o), s;
  }
  findParentDom(e) {
    return document.querySelector(e);
  }
  setDomStyle(e, r) {
    for (const [o, s] of Object.entries(r))
      typeof s == "string" && e.style.setProperty(m(o), s);
    return e;
  }
}
function h() {
  const t = new c(new f());
  t.createCursor(), t.setMouseMoveEvent((e, r) => {
    t.updatedMousePosition({ x: e, y: r });
  });
}
export {
  h as createCursorMagic
};