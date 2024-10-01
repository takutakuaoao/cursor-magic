var n = Object.defineProperty;
var u = (t, e, r) => e in t ? n(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var i = (t, e, r) => u(t, typeof e != "symbol" ? e + "" : e, r);
class a {
  fireClickEffect(e) {
    console.log(`Click event of ${e} is fired.`);
  }
}
class l {
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
    i(this, "cursorClickEffect");
    this.operator = e, this.options = r, r && (this.cursorID = r.cursorID ?? this.cursorID, this.cursorAreaDom = r.cursorAreaDom ?? this.cursorAreaDom, this.cursorSize = r.cursorSize ?? this.cursorSize, this.cursorStyle = r.cursorStyle ? { ...this.cursorStyle, ...r.cursorStyle } : this.cursorStyle), this.cursorClickEffect = (r == null ? void 0 : r.cursorClickEffect) ?? new a();
  }
  createCursor() {
    if (!this.operator.createDom({
      parentDom: this.cursorAreaDom,
      tagName: "div",
      specifiedType: "id",
      specifiedName: this.cursorID,
      style: this.makeStyle()
    }))
      throw new Error(h.failedCreateCursor);
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
    var e;
    (e = this.cursorClickEffect) == null || e.fireClickEffect(`#${this.cursorID}`);
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
const h = {
  failedCreateCursor: "Failed create cursorMagic dom"
};
function f(t) {
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
      r.type === "mousemove" && o instanceof MouseEvent && r.listener(o.clientX, o.clientY), r.type === "mouseleave" && r.listener(), r.type === "mouseenter" && r.listener(), r.type === "click" && r.listener();
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
  isVisibleDom(e) {
    const r = this.findParentDom(e);
    return r === null ? !1 : r.style.display !== "none";
  }
  setStyle(e, r) {
    const s = this.findParentDom(e);
    s && this.setDomStyle(s, r);
  }
  getDomStyle(e, r) {
  }
  createEmptyNewDom(e, r, s) {
    const o = document.createElement(e), c = r === "id" ? "id" : "class";
    return o.setAttribute(c, s), o;
  }
  findParentDom(e) {
    return document.querySelector(e);
  }
  setDomStyle(e, r) {
    for (const [s, o] of Object.entries(r))
      typeof o == "string" && e.style.setProperty(f(s), o);
    return e;
  }
}
function D(t) {
  const e = new l(new m(), t);
  e.createCursor(), e.setMouseMoveEvent((r, s) => {
    e.updatedMousePosition({ x: r, y: s });
  }), e.setMouseLeaveEvent(() => e.hiddenCursorPointer()), e.setMouseEnterEvent(() => e.showCursorPointer()), e.setMouseClickEvent(() => e.fireClickCursorPointer());
}
export {
  D as createCursorMagic
};
