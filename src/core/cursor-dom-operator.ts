export interface CursorDomOperator {
    createDom(args: CreateDomArgs): boolean
    addEventListener(domName: string, event: AddableEvent): boolean
    moveDom(targetDom: string, position: { x: number, y: number }): void
    hiddenDom(targetDom: string): void
    showDom(targetDom: string): void
    isVisibleDom(targetDom: string): boolean
}

export type AddableEvent = MouseMoveEvent | MouseOutEvent | MouseEnterEvent

type MouseMoveEvent = {
    type: 'mousemove'
    listener: (x: number, y: number) => void
}

type MouseOutEvent = {
    type: 'mouseleave',
    listener: () => void
}

type MouseEnterEvent = {
    type: 'mouseenter',
    listener: () => void
}

export type CreateDomArgs = {
    parentDom: string,
    tagName: keyof HTMLElementTagNameMap,
    specifiedType: DomSpecifiedType,
    specifiedName: string,
    style?: Partial<CSSStyleDeclaration>
}

export type DomSpecifiedType = 'id' | 'className'
