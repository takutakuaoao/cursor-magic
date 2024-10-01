import { ClickedEffectStyle, CursorClickEffect } from "../cursor-click-effects/cursor-click-effect";
import { CursorDomOperator } from "../cursor-dom-operator";

export class ClickEffectNotReturnOriginalStyle implements CursorClickEffect {
    constructor(private clickedStyle: ClickedEffectStyle, private operator: CursorDomOperator) { }

    fireClickEffect(targetDom: string): void {
        this.operator.setStyle(targetDom, this.clickedStyle)
    }
}
