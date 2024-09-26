export interface CursorDomOperator {
    createDom(args: CreateDomArgs): boolean
    addEventListener(domName: string, eventType: 'mousemove', eventListener: (x: number, y: number) => void): boolean
    moveDom(targetDom: string, position: { x: number, y: number }): void
}

export type CreateDomArgs = {
    parentDom: string,
    tagName: keyof HTMLElementTagNameMap,
    specifiedType: DomSpecifiedType,
    specifiedName: string,
    style?: Partial<CSSStyleDeclaration>
}

export type DomSpecifiedType = 'id' | 'className'