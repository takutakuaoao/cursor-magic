/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { CursorHTMLDomOperator } from "../cursor-html-dom-operator";

describe('createDom', () => {
    test('make dom', () => {
        const operator = new CursorHTMLDomOperator()
        const result = operator.createDom({
            parentDom: 'body',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: 'testID'
        })

        expect(result).toBeTruthy()
        expect(document.querySelector('body > div#testID')).toBeVisible()
    })
    test('confirm for new dom to set as first child on parent dom', () => {
        insertNewDom('div')

        const operator = new CursorHTMLDomOperator()
        operator.createDom({
            parentDom: 'body > div',
            tagName: 'span',
            specifiedType: 'id',
            specifiedName: 'testID'
        })

        expect(document.querySelector('body > div > span#testID')).toBeVisible()
    })
    test("must return false and don't make new dom if parent dom was not exists.", () => {
        const operator = new CursorHTMLDomOperator()
        const result = operator.createDom({
            parentDom: '.notFoundParentDom',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: 'failed-test'
        })

        expect(result).toBeFalsy()
        expect(document.querySelector('.notFoundParentDom > div#failed-test')).toBeNull()
    })
    test('apply css style', () => {
        insertNewDom('div', { name: 'id', value: 'test' })
        const operator = new CursorHTMLDomOperator()
        operator.createDom({
            parentDom: 'div#test',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: 'stylingTest',
            style: {
                width: '50px',
                height: '30px',
                transitionTimingFunction: 'ease-out'
            }
        })

        const styledDom = document.querySelector('div#stylingTest')

        if (!(styledDom instanceof HTMLElement)) {
            fail('div#stylingTest dom must be HTMLElement.')
        }

        expect(styledDom.style.width).toBe('50px')
        expect(styledDom.style.height).toBe('30px')
        expect(styledDom.style.transitionTimingFunction).toBe('ease-out')
    })
})

describe('addEventListener', () => {
    test('once called the event listener when fired the specified dom event.', () => {
        const id = 'test'
        insertNewDom('div', { name: 'id', value: id })

        const eventListener = jest.fn()
        const operator = new CursorHTMLDomOperator()

        operator.addEventListener(`#${id}`, 'mousemove', eventListener)

        fireMouseEvent(`#${id}`, 'mousemove', { clientX: 10, clientY: 20 })

        expect(eventListener).toHaveBeenCalledTimes(1)
        expect(eventListener.mock.calls[0]).toStrictEqual([10, 20])
    })
    describe('[Learning Test] イベントリスナーに関する学習テスト', () => {
        const id = 'test'

        beforeEach(() => {
            insertNewDom('div', { name: 'id', value: id })
        })

        test('クリックイベントに設定したイベントリスナーが発火したかを調べる学習テスト', () => {
            const event = jest.fn()

            const clickedDom = document.querySelector(`div`)

            if (clickedDom) {
                clickedDom.addEventListener('click', event)
            }

            fireMouseEvent('div', 'click')

            expect(event).toHaveBeenCalledTimes(1)
        })

        test('マウスムーブイベントに設定したイベントリスナーが発火したかを調べる学習テスト', () => {
            const eventListener = jest.fn()

            const dom = document.querySelector('div')

            if (dom) {
                dom.addEventListener('mousemove', (e: MouseEvent) => {
                    eventListener(e.clientX, e.clientY)
                })
            }

            fireMouseEvent('div', 'mousemove', { clientX: 1, clientY: 2 })

            expect(eventListener).toHaveBeenCalledTimes(1)
            expect(eventListener.mock.calls[0]).toStrictEqual([1, 2])
        })
    })
})

describe('moveDom', () => {
    test('moved target dom', () => {
        insertNewDom('div', { name: 'id', value: 'targetDOM' })

        const operator = new CursorHTMLDomOperator()
        operator.moveDom('div#targetDOM', { x: 10, y: 20 })

        const movedDom = document.querySelector('div#targetDOM')

        assertCurrentDomPosition({ x: 10, y: 20 }, movedDom)

        function assertCurrentDomPosition(position: { x: number, y: number }, dom: Element | null) {
            if (!(dom instanceof HTMLElement)) {
                fail('Dom must be HTMLElement.')
            }

            expect(dom?.style.left).toBe(`${position.x}px`)
            expect(dom?.style.top).toBe(`${position.y}px`)
        }
    })
})

function insertNewDom(domTag: string, attribute?: { name: string, value: string }) {
    const newElm = document.createElement(domTag)

    if (attribute) {
        newElm.setAttribute(attribute.name, attribute.value)
    }

    document.body.appendChild(newElm)
}

function fireMouseEvent(dom: string, type: 'click' | 'mousemove', options?: MouseEventInit) {
    document.querySelector(dom)?.dispatchEvent(new MouseEvent(type, options))
}