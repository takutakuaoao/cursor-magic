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