import { CursorClickEffect } from "../cursor-click-effects/cursor-click-effect";
import { CursorStyle } from "../cursor-core";
import { CursorDomOperator } from "../cursor-dom-operator";

type ClickedEffectStyle = Partial<CursorStyle>

export class ClickEffectNotReturnOriginalStyle implements CursorClickEffect {
    constructor(private clickedStyle: ClickedEffectStyle, private operator: CursorDomOperator) { }

    fireClickEffect(targetDom: string): void {
        this.operator.setStyle(targetDom, this.clickedStyle)
    }
}
