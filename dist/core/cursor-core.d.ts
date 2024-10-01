import { CursorDomOperator } from "./cursor-dom-operator";
import { CursorClickEffect } from "./cursor-click-effects/cursor-click-effect";
export type CursorCoreOptions = {
    cursorID?: string;
    cursorAreaDom?: string;
    cursorSize?: number;
    cursorStyle?: CustomableCursorStyle;
    cursorClickEffect?: CursorClickEffect;
};
export type CursorStyle = Omit<CSSStyleDeclaration, 'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty' | 'length' | number | keyof CSSRule | typeof Symbol.iterator>;
type CustomableCursorStyle = Partial<Omit<CSSStyleDeclaration, 'width' | 'height' | 'top' | 'left' | 'absolute'>>;
export declare class CursorCore {
    private operator;
    private options?;
    private cursorID;
    private cursorAreaDom;
    private cursorSize;
    private cursorStyle;
    private cursorClickEffect;
    constructor(operator: CursorDomOperator, options?: CursorCoreOptions | undefined);
    createCursor(): void;
    setMouseMoveEvent(event: (x: number, y: number) => void): void;
    setMouseLeaveEvent(event: () => void): void;
    updatedMousePosition(position: {
        x: number;
        y: number;
    }): void;
    hiddenCursorPointer(): void;
    setMouseEnterEvent(event: () => void): void;
    showCursorPointer(): void;
    setMouseClickEvent(event: () => void): void;
    fireClickCursorPointer(): void;
    private makeStyle;
    private calculateCursorPosition;
}
export declare const ErrorMessages: {
    failedCreateCursor: string;
};
export {};
//# sourceMappingURL=cursor-core.d.ts.map