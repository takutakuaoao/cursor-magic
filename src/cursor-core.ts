import { CursorDomOperator } from "./cursor-dom-operator";

export class CursorCore {
    constructor(private operator: CursorDomOperator) { }

    createCursor(): void {
        const result = this.operator.createDom({
            parentDom: 'body',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: 'cursorMagic'
        })

        if (!result) {
            throw new Error(ErrorMessages.failedCreateCursor)
        }
    }
}

export const ErrorMessages = {
    failedCreateCursor: 'Failed create cursorMagic dom'
}