import { CursorDomOperator } from "../cursor-dom-operator";
import { ClickedEffectStyle, CursorClickEffect } from "./cursor-click-effect";
export declare class CursorSpringClickEffect implements CursorClickEffect {
    private operator;
    private clickedStyle;
    constructor(operator: CursorDomOperator, clickedStyle: ClickedEffectStyle);
    fireClickEffect(targetDom: string): void;
    private getOriginalStyle;
    private toObjectEntriesCursorStyle;
}
//# sourceMappingURL=cursor-spring-click-effect.d.ts.map