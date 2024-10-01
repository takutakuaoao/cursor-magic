import { CursorStyle } from "../cursor-core";
import { CursorDomOperator } from "../cursor-dom-operator";
import { ClickedEffectStyle, CursorClickEffect } from "./cursor-click-effect";

export class CursorSpringClickEffect implements CursorClickEffect {
    constructor(private operator: CursorDomOperator, private clickedStyle: ClickedEffectStyle) { }

    fireClickEffect(targetDom: string): void {
        const originalStyle = this.getOriginalStyle(targetDom)

        this.operator.setStyle(targetDom, this.clickedStyle)
        this.operator.lazySetStyle(targetDom, originalStyle, 300)
    }

    private getOriginalStyle(targetDom: string): Partial<CursorStyle> {
        const originalStyle: Partial<CursorStyle> = {}

        for (const [key, _] of this.toObjectEntriesCursorStyle(this.clickedStyle)) {
            const originalStyleValue = this.operator.getDomStyle(targetDom, key)
            originalStyle[key] = originalStyleValue
        }

        return originalStyle
    }

    private toObjectEntriesCursorStyle(cursorStyle: ClickedEffectStyle): ObjectEntriesCursorStyle {
        return Object.entries(cursorStyle) as ObjectEntriesCursorStyle
    }
}

type ObjectEntriesCursorStyle = [keyof CursorStyle, string][]
