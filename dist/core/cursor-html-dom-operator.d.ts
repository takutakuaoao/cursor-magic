import { AddableEvent, CreateDomArgs, CursorDomOperator } from "./cursor-dom-operator";
export declare class CursorHTMLDomOperator implements CursorDomOperator {
    createDom(args: CreateDomArgs): boolean;
    addEventListener(domName: string, event: AddableEvent): boolean;
    moveDom(targetDom: string, position: {
        x: number;
        y: number;
    }): void;
    hiddenDom(targetDom: string): void;
    showDom(targetDom: string): void;
    private createEmptyNewDom;
    private findParentDom;
    private setDomStyle;
}
//# sourceMappingURL=cursor-html-dom-operator.d.ts.map