export interface CursorDomOperator {
    createDom(args: CreateDomArgs): boolean
    addEventListener(domName: string, eventType: 'mousemove', eventListener: (x: number, y: number) => void): boolean
}

export type CreateDomArgs = {
    parentDom: string,
    tagName: keyof HTMLElementTagNameMap,
    specifiedType: DomSpecifiedType,
    specifiedName: string
}

export type DomSpecifiedType = 'id' | 'className'