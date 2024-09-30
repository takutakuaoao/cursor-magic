import { CursorCore, CursorCoreOptions } from "./cursor-core";
import { CursorHTMLDomOperator } from "./cursor-html-dom-operator";

export function createCursorMagic(options?: CursorCoreOptions) {
    const cursor = new CursorCore(new CursorHTMLDomOperator(), options)

    cursor.createCursor()
    cursor.setMouseMoveEvent((x: number, y: number) => {
        cursor.updatedMousePosition({ x: x, y: y })
    })
    cursor.setMouseLeaveEvent(() => cursor.hiddenCursorPointer())
    cursor.setMouseEnterEvent(() => cursor.showCursorPointer())
}