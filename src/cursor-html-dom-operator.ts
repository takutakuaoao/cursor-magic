import { CreateDomArgs, CursorDomOperator, DomSpecifiedType } from "./cursor-dom-operator";

export class CursorHTMLDomOperator implements CursorDomOperator {
    createDom(args: CreateDomArgs): boolean {
        const parent = this.findParentDom(args.parentDom)

        if (parent === null) {
            return false
        }

        const newElm = this.createEmptyNewDom(args.tagName, args.specifiedType, args.specifiedName)

        parent.insertBefore(newElm, parent.firstChild)

        return true
    }

    addEventListener(domName: string, eventType: 'mousemove', eventListener: (x: number, y: number) => void): boolean {
        const target = this.findParentDom(domName)

        if (target === null) {
            return false
        }

        target.addEventListener(eventType, (e) => {
            if (eventType === 'mousemove' && e instanceof MouseEvent) {
                eventListener(e.clientX, e.clientY)
            }
        })

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