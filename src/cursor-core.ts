import { CursorDomOperator } from "./cursor-dom-operator";

type Options = {
    cursorID?: string
    cursorAreaDom?: string
}

export class CursorCore {
    private cursorID: string = 'cursorMagic'
    private cursorAreaDom: string = 'body'

    constructor(private operator: CursorDomOperator, private options?: Options) {
        if (options) {
            this.cursorID = options.cursorID ?? this.cursorID
            this.cursorAreaDom = options.cursorAreaDom ?? this.cursorAreaDom
        }
    }

    createCursor(): void {
        const result = this.operator.createDom({
            parentDom: this.cursorAreaDom,
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: this.cursorID
        })

        if (!result) {
            throw new Error(ErrorMessages.failedCreateCursor)
        }
    }

    setMouseMoveEvent(event: (x: number, y: number) => void): void {
        this.operator.addEventListener(this.cursorAreaDom, 'mousemove', event)
    }
}

export const ErrorMessages = {
    failedCreateCursor: 'Failed create cursorMagic dom'
}