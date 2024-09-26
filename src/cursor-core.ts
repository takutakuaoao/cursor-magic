import { CursorDomOperator } from "./cursor-dom-operator";

type Options = {
    cursorID?: string
    cursorAreaDom?: string
    cursorSize?: number
}

export class CursorCore {
    private cursorID: string = 'cursorMagic'
    private cursorAreaDom: string = 'body'
    private cursorSize: number = 30

    constructor(private operator: CursorDomOperator, private options?: Options) {
        if (options) {
            this.cursorID = options.cursorID ?? this.cursorID
            this.cursorAreaDom = options.cursorAreaDom ?? this.cursorAreaDom
            this.cursorSize = options.cursorSize ?? this.cursorSize
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

    updatedMousePosition(position: { x: number, y: number }): void {
        this.operator.moveDom(`#${this.cursorID}`, this.calculateCursorPosition(position))
    }
    private calculateCursorPosition(mousePosition: { x: number, y: number }): { x: number, y: number } {
        return {
            x: mousePosition.x - (this.cursorSize / 2),
            y: mousePosition.y - (this.cursorSize / 2)
        }
    }
}

export const ErrorMessages = {
    failedCreateCursor: 'Failed create cursorMagic dom'
}