var u = Object.defineProperty;
var a = (t, e, r) => e in t ? u(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var i = (t, e, r) => a(t, typeof e != "symbol" ? e + "" : e, r);
class c {
  constructor(e, r) {
    i(this, "cursorID", "cursorMagic");
    i(this, "cursorAreaDom", "body");
    i(this, "cursorSize", 30);
    i(this, "cursorStyle", {
      transition: "0.2s",
      transitionTimingFunction: "ease-out",
      backgroundColor: "#7a7a7ae3",
      borderRadius: "100%"
    });
    this.operator = e, this.options = r, r && (this.cursorID = r.cursorID ?? this.cursorID, this.cursorAreaDom = r.cursorAreaDom ?? this.cursorAreaDom, this.cursorSize = r.cursorSize ?? this.cursorSize, this.cursorStyle = r.cursorStyle ? { ...this.cursorStyle, ...r.cursorStyle } : this.cursorStyle);
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
    this.operator.moveDom(`#${this.cursorID}`, this.calculateCursorPosition(e));
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
function h(t) {
  return t = t.replace(/^ *?[A-Z]/, function(e) {
    return e.toLowerCase();
  }), t = t.replace(/_/g, "-"), t = t.replace(/ *?[A-Z]/g, function(e, r) {
    return "-" + e.replace(/ /g, "").toLowerCase();
  }), t;
}
class m {
  createDom(e) {
    const r = this.findParentDom(e.parentDom);
    if (r === null)
      return !1;
    const s = this.createEmptyNewDom(e.tagName, e.specifiedType, e.specifiedName);
    return e.style && this.setDomStyle(s, e.style), r.insertBefore(s, r.firstChild), !0;
  }
  addEventListener(e, r) {
    const s = this.findParentDom(e);
    return s === null ? !1 : (s.addEventListener(r.type, (o) => {
      r.type === "mousemove" && o instanceof MouseEvent && r.listener(o.clientX, o.clientY), r.type === "mouseleave" && r.listener(), r.type === "mouseenter" && r.listener();
    }), !0);
  }
  moveDom(e, r) {
    const s = this.findParentDom(e);
    s !== null && (s.style.left = `${r.x}px`, s.style.top = `${r.y}px`);
  }
  hiddenDom(e) {
    const r = this.findParentDom(e);
    r !== null && (r.style.display = "none");
  }
  showDom(e) {
    const r = this.findParentDom(e);
    r !== null && (r.style.display = "block");
  }
  createEmptyNewDom(e, r, s) {
    const o = document.createElement(e), n = r === "id" ? "id" : "class";
    return o.setAttribute(n, s), o;
  }
  findParentDom(e) {
    return document.querySelector(e);
  }
  setDomStyle(e, r) {
    for (const [s, o] of Object.entries(r))
      typeof o == "string" && e.style.setProperty(h(s), o);
    return e;
  }
}
function p(t) {
  const e = new c(new m(), t);
  e.createCursor(), e.setMouseMoveEvent((r, s) => {
    e.updatedMousePosition({ x: r, y: s });
  }), e.setMouseLeaveEvent(() => e.hiddenCursorPointer()), e.setMouseEnterEvent(() => e.showCursorPointer());
}
export {
  p as createCursorMagic
};
