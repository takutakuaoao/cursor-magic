export function fireMouseEvent(dom: string, type: 'click' | 'mousemove' | 'mouseout' | 'mouseleave' | 'mouseenter', options?: MouseEventInit) {
    const result = document.querySelector(dom)?.dispatchEvent(new MouseEvent(type, options))
}

export function insertNewDom(domTag: string, attribute?: { name: string, value: string }, isHidden?: true) {
    const newElm = document.createElement(domTag)

    if (attribute) {
        newElm.setAttribute(attribute.name, attribute.value)
    }

    if (isHidden) {
        newElm.style.display = 'none'
    }

    document.body.appendChild(newElm)
}
