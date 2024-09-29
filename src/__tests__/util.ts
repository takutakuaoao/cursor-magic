export function fireMouseEvent(dom: string, type: 'click' | 'mousemove' | 'mouseout' | 'mouseleave' | 'mouseenter', options?: MouseEventInit) {
    document.querySelector(dom)?.dispatchEvent(new MouseEvent(type, options))
}