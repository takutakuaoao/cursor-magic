import { CursorCore } from "./cursor-core";
import { CursorHTMLDomOperator } from "./cursor-html-dom-operator";

export function createCursorMagic() {
    const cursor = new CursorCore(new CursorHTMLDomOperator())
    cursor.createCursor()
    cursor.setMouseMoveEvent((x: number, y: number) => {
        cursor.updatedMousePosition({ x: x, y: y })
    })
}