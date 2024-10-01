export function fireMouseEvent(dom: string, type: 'click' | 'mousemove' | 'mouseout' | 'mouseleave' | 'mouseenter', options?: MouseEventInit) {
    document.querySelector(dom)?.dispatchEvent(new MouseEvent(type, options))
}

export function insertNewDom(domTag: string, attribute?: { name: string, value: string }, isHidden?: true): HTMLElement {
    const newElm = document.createElement(domTag)

    if (attribute) {
        newElm.setAttribute(attribute.name, attribute.value)
    }

    if (isHidden) {
        newElm.style.display = 'none'
    }

    document.body.appendChild(newElm)

    return newElm
}

type CSSPropertyName = string
type CSSStyleValue = string

export function setDomStyle(dom: HTMLElement, style: [CSSPropertyName, CSSStyleValue][]): HTMLElement {
    style.forEach(([key, value]) => {
        dom.style.setProperty(key, value)
    })

    return dom
}

export function createNewDOM(domTag: string, attribute?: { name: string, value: string }, isHidden?: true): HTMLElement {
    const newElm = document.createElement(domTag)

    if (attribute) {
        newElm.setAttribute(attribute.name, attribute.value)
    }

    if (isHidden) {
        newElm.style.display = 'none'
    }

    return newElm
}

export function appendBody(dom: HTMLElement): void {
    document.body.appendChild(dom)
}
