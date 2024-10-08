import { CursorDomOperator } from "./cursor-dom-operator";

export type CursorCoreOptions = {
    cursorID?: string
    cursorAreaDom?: string
    cursorSize?: number
    cursorStyle?: CustomableCursorStyle
}

export type CursorStyle = Omit<CSSStyleDeclaration, 'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty' | 'length' | number | keyof CSSRule | typeof Symbol.iterator>;

type CustomableCursorStyle = Partial<Omit<CSSStyleDeclaration, 'width' | 'height' | 'top' | 'left' | 'absolute'>>

export class CursorCore {
    private cursorID: string = 'cursorMagic'
    private cursorAreaDom: string = 'body'
    private cursorSize: number = 50
    private cursorStyle: CustomableCursorStyle = {
        transition: '0.2s',
        transitionTimingFunction: 'ease-out',
        border: '1px solid #b8b8b8',
        borderRadius: '100%'
    }

    constructor(private operator: CursorDomOperator, private options?: CursorCoreOptions) {
        if (options) {
            this.cursorID = options.cursorID ?? this.cursorID
            this.cursorAreaDom = options.cursorAreaDom ?? this.cursorAreaDom
            this.cursorSize = options.cursorSize ?? this.cursorSize
            this.cursorStyle = options.cursorStyle ? { ...this.cursorStyle, ...options.cursorStyle } : this.cursorStyle
        }
    }

    createCursor(): void {
        const result = this.operator.createDom({
            parentDom: this.cursorAreaDom,
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: this.cursorID,
            style: this.makeStyle()
        })

        if (!result) {
            throw new Error(ErrorMessages.failedCreateCursor)
        }

        this.operator.hiddenDom(`#${this.cursorID}`)
    }

    setMouseMoveEvent(event: (x: number, y: number) => void): void {
        this.operator.addEventListener(this.cursorAreaDom, {
            type: 'mousemove',
            listener: event
        })
    }

    setMouseLeaveEvent(event: () => void): void {
        this.operator.addEventListener(this.cursorAreaDom, {
            type: 'mouseleave',
            listener: event
        })
    }

    updatedMousePosition(position: { x: number, y: number }): void {
        if (!this.operator.isVisibleDom(`#${this.cursorID}`)) {
            this.operator.showDom(`#${this.cursorID}`)
        }
        this.operator.moveDom(`#${this.cursorID}`, this.calculateCursorPosition(position))
    }

    hiddenCursorPointer(): void {
        this.operator.hiddenDom(`#${this.cursorID}`)
    }

    setMouseEnterEvent(event: () => void): void {
        this.operator.addEventListener(
            this.cursorAreaDom,
            {
                type: "mouseenter",
                listener: event
            }
        )
    }

    showCursorPointer() {
        this.operator.showDom(`#${this.cursorID}`)
    }

    private makeStyle(): Partial<CSSStyleDeclaration> {
        return {
            width: `${this.cursorSize}px`,
            height: `${this.cursorSize}px`,
            position: 'absolute',
            top: '0px',
            left: '0px',
            pointerEvents: 'none',
            ...this.cursorStyle
        }
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
