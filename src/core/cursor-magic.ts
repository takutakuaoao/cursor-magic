import { CursorSpringClickEffect } from "./cursor-click-effects/cursor-spring-click-effect";
import { CursorCore, CursorCoreOptions } from "./cursor-core";
import { CursorHTMLDomOperator } from "./cursor-html-dom-operator";

type ClientCursorMagicOptions = Omit<CursorCoreOptions, 'cursorClickEffect'> & {
    useClickEffect?: boolean
}

export function createCursorMagic(options?: ClientCursorMagicOptions) {
    const cursorClickEffect = options?.useClickEffect ? new CursorSpringClickEffect(new CursorHTMLDomOperator(), {
        transform: 'scale(1.25)'
    }) : undefined

    initCursorMagic({ ...options, cursorClickEffect: cursorClickEffect })
}

export function initCursorMagic(options?: CursorCoreOptions) {
    const cursor = new CursorCore(new CursorHTMLDomOperator(), options)

    cursor.createCursor()
    cursor.setMouseMoveEvent((x: number, y: number) => {
        cursor.updatedMousePosition({ x: x, y: y })
    })
    cursor.setMouseLeaveEvent(() => cursor.hiddenCursorPointer())
    cursor.setMouseEnterEvent(() => cursor.showCursorPointer())

    cursor.setMouseClickEvent(() => cursor.fireClickCursorPointer())
}
