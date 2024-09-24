export interface CursorDomOperator {
    createDom(args: CreateDomArgs): boolean
}

export type CreateDomArgs = {
    parentDom: string,
    tagName: keyof HTMLElementTagNameMap,
    specifiedType: DomSpecifiedType,
    specifiedName: string
}

export type DomSpecifiedType = 'id' | 'className'