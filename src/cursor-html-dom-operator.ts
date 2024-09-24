import { CreateDomArgs, DomSpecifiedType } from "./cursor-dom-operator";

export class CursorHTMLDomOperator {
    createDom(args: CreateDomArgs): boolean {
        const parent = this.findParentDom(args.parentDom)

        if (parent === null) {
            return false
        }

        const newElm = this.createEmptyNewDom(args.tagName, args.specifiedType, args.specifiedName)

        parent.insertBefore(newElm, parent.firstChild)

        return true
    }

    private createEmptyNewDom(tagName: keyof HTMLElementTagNameMap, specifiedType: DomSpecifiedType, specifiedName: string) {
        const newElm = document.createElement(tagName)
        const attributeName = specifiedType === 'id' ? 'id' : 'class'

        newElm.setAttribute(attributeName, specifiedName)

        return newElm
    }

    private findParentDom(targetSelector: string) {
        return document.querySelector(targetSelector)
    }
}