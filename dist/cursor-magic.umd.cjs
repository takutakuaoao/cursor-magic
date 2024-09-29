(function(o,s){typeof exports=="object"&&typeof module<"u"?s(exports):typeof define=="function"&&define.amd?define(["exports"],s):(o=typeof globalThis<"u"?globalThis:o||self,s(o.CursorMagic={}))})(this,function(o){"use strict";var m=Object.defineProperty;var f=(o,s,u)=>s in o?m(o,s,{enumerable:!0,configurable:!0,writable:!0,value:u}):o[s]=u;var a=(o,s,u)=>f(o,typeof s!="symbol"?s+"":s,u);class s{constructor(e,r){a(this,"cursorID","cursorMagic");a(this,"cursorAreaDom","body");a(this,"cursorSize",30);a(this,"cursorStyle",{transition:"0.2s",transitionTimingFunction:"ease-out",backgroundColor:"#7a7a7ae3",borderRadius:"100%"});this.operator=e,this.options=r,r&&(this.cursorID=r.cursorID??this.cursorID,this.cursorAreaDom=r.cursorAreaDom??this.cursorAreaDom,this.cursorSize=r.cursorSize??this.cursorSize,this.cursorStyle=r.cursorStyle?{...this.cursorStyle,...r.cursorStyle}:this.cursorStyle)}createCursor(){if(!this.operator.createDom({parentDom:this.cursorAreaDom,tagName:"div",specifiedType:"id",specifiedName:this.cursorID,style:this.makeStyle()}))throw new Error(u.failedCreateCursor)}setMouseMoveEvent(e){this.operator.addEventListener(this.cursorAreaDom,{type:"mousemove",listener:e})}setMouseLeaveEvent(e){this.operator.addEventListener(this.cursorAreaDom,{type:"mouseleave",listener:e})}updatedMousePosition(e){this.operator.moveDom(`#${this.cursorID}`,this.calculateCursorPosition(e))}hiddenCursorPointer(){this.operator.hiddenDom(`#${this.cursorID}`)}setMouseEnterEvent(e){this.operator.addEventListener(this.cursorAreaDom,{type:"mouseenter",listener:e})}showCursorPointer(){this.operator.showDom(`#${this.cursorID}`)}makeStyle(){return{width:`${this.cursorSize}px`,height:`${this.cursorSize}px`,position:"absolute",top:"0px",left:"0px",...this.cursorStyle}}calculateCursorPosition(e){return{x:e.x-this.cursorSize/2,y:e.y-this.cursorSize/2}}}const u={failedCreateCursor:"Failed create cursorMagic dom"};function c(i){return i=i.replace(/^ *?[A-Z]/,function(e){return e.toLowerCase()}),i=i.replace(/_/g,"-"),i=i.replace(/ *?[A-Z]/g,function(e,r){return"-"+e.replace(/ /g,"").toLowerCase()}),i}class l{createDom(e){const r=this.findParentDom(e.parentDom);if(r===null)return!1;const t=this.createEmptyNewDom(e.tagName,e.specifiedType,e.specifiedName);return e.style&&this.setDomStyle(t,e.style),r.insertBefore(t,r.firstChild),!0}addEventListener(e,r){const t=this.findParentDom(e);return t===null?!1:(t.addEventListener(r.type,n=>{r.type==="mousemove"&&n instanceof MouseEvent&&r.listener(n.clientX,n.clientY),r.type==="mouseleave"&&r.listener(),r.type==="mouseenter"&&r.listener()}),!0)}moveDom(e,r){const t=this.findParentDom(e);t!==null&&(t.style.left=`${r.x}px`,t.style.top=`${r.y}px`)}hiddenDom(e){const r=this.findParentDom(e);r!==null&&(r.style.display="none")}showDom(e){const r=this.findParentDom(e);r!==null&&(r.style.display="block")}createEmptyNewDom(e,r,t){const n=document.createElement(e),h=r==="id"?"id":"class";return n.setAttribute(h,t),n}findParentDom(e){return document.querySelector(e)}setDomStyle(e,r){for(const[t,n]of Object.entries(r))typeof n=="string"&&e.style.setProperty(c(t),n);return e}}function d(i){const e=new s(new l,i);e.createCursor(),e.setMouseMoveEvent((r,t)=>{e.updatedMousePosition({x:r,y:t})}),e.setMouseLeaveEvent(()=>e.hiddenCursorPointer()),e.setMouseEnterEvent(()=>e.showCursorPointer())}o.createCursorMagic=d,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
