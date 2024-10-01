import { AddableEvent, CreateDomArgs, CursorDomOperator, DomSpecifiedType } from "./cursor-dom-operator";
import { toKebabCase } from "./utils";

export class CursorHTMLDomOperator implements CursorDomOperator {
    createDom(args: CreateDomArgs): boolean {
        const parent = this.findParentDom(args.parentDom)

        if (parent === null) {
            return false
        }

        const newElm = this.createEmptyNewDom(args.tagName, args.specifiedType, args.specifiedName)

        if (args.style) {
            this.setDomStyle(newElm, args.style)
        }

        parent.insertBefore(newElm, parent.firstChild)

        return true
    }

    addEventListener(
        domName: string,
        event: AddableEvent
    ): boolean {
        const target = this.findParentDom(domName)

        if (target === null) {
            return false
        }

        target.addEventListener(event.type, (e) => {
            if (event.type === 'mousemove' && e instanceof MouseEvent) {
                event.listener(e.clientX, e.clientY)
            }

            if (event.type === 'mouseleave') {
                event.listener()
            }

            if (event.type === 'mouseenter') {
                event.listener()
            }

            if (event.type === 'click') {
                event.listener()
            }
        })

        return true
    }

    moveDom(targetDom: string, position: { x: number; y: number; }): void {
        const target = this.findParentDom(targetDom)

        if (target === null) {
            return
        }

        target.style.left = `${position.x}px`
        target.style.top = `${position.y}px`
    }

    hiddenDom(targetDom: string): void {
        const target = this.findParentDom(targetDom)

        if (target === null) {
            return
        }

        target.style.display = 'none'
    }

    showDom(targetDom: string): void {
        const target = this.findParentDom(targetDom)

        if (target === null) {
            return
        }

        target.style.display = 'block'
    }

    isVisibleDom(targetDom: string): boolean {
        const target = this.findParentDom(targetDom)

        if (target === null) {
            return false
        }

        return target.style.display !== 'none'
    }

    setStyle(targetDom: string, style: Partial<CSSStyleDeclaration>): void {
        const target = this.findParentDom(targetDom)

        if (target) {
            this.setDomStyle(target, style)
        }
    }

    getDomStyle(targetDom: string, property: string): string | undefined {
        return undefined
    }

    private createEmptyNewDom(tagName: keyof HTMLElementTagNameMap, specifiedType: DomSpecifiedType, specifiedName: string) {
        const newElm = document.createElement(tagName)
        const attributeName = specifiedType === 'id' ? 'id' : 'class'

        newElm.setAttribute(attributeName, specifiedName)

        return newElm
    }

    private findParentDom(targetSelector: string): HTMLElement | null {
        return document.querySelector(targetSelector)
    }

    private setDomStyle(dom: HTMLElement, style: Partial<CSSStyleDeclaration>): HTMLElement {
        for (const [key, value] of Object.entries(style)) {
            if (typeof value === 'string') {
                dom.style.setProperty(toKebabCase(key), value)
            }
        }

        return dom
    }
}
