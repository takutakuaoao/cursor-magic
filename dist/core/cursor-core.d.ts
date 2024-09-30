import { CursorDomOperator } from "./cursor-dom-operator";
export type CursorCoreOptions = {
    cursorID?: string;
    cursorAreaDom?: string;
    cursorSize?: number;
    cursorStyle?: CustomableCursorStyle;
};
type CustomableCursorStyle = Partial<Omit<CSSStyleDeclaration, 'width' | 'height' | 'top' | 'left' | 'absolute'>>;
export declare class CursorCore {
    private operator;
    private options?;
    private cursorID;
    private cursorAreaDom;
    private cursorSize;
    private cursorStyle;
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
    private makeStyle;
    private calculateCursorPosition;
}
export declare const ErrorMessages: {
    failedCreateCursor: string;
};
export {};
//# sourceMappingURL=cursor-core.d.ts.map