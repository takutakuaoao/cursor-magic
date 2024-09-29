/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { CursorHTMLDomOperator } from "../cursor-html-dom-operator";
import { fireMouseEvent } from "./util";
import { AddableEvent } from "../cursor-dom-operator";

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
    test.each`
        eventType       | mouseEventOption                | expectEventListenerArgs
        ${'mousemove'}  | ${{ clientX: 10, clientY: 20 }} | ${[10, 20]}
        ${'mouseleave'} | ${undefined}                    | ${[]}
        ${'mouseenter'} | ${undefined}                    | ${[]}
    `('fired $eventType eventListener', ({ eventType, mouseEventOption, expectEventListenerArgs }) => {
        const eventListener = jest.fn()
        executeAddEventListener('body', {
            type: eventType,
            listener: eventListener
        }, mouseEventOption)

        assertFiredAddedEventListener(eventListener, expectEventListenerArgs)
    })

    function executeAddEventListener(dom: string, event: AddableEvent, firedMouseEventOption?: MouseEventInit) {
        const operator = new CursorHTMLDomOperator()

        operator.addEventListener(dom, event)

        fireMouseEvent(dom, event.type, firedMouseEventOption)
    }

    function assertFiredAddedEventListener(eventListener: jest.Mock, expectArgs: any[]) {
        expect(eventListener).toHaveBeenCalledTimes(1)
        expect(eventListener.mock.calls[0]).toStrictEqual(expectArgs)
    }

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

describe('hiddenDom', () => {
    insertNewDom('div', { name: 'id', value: 'hiddenDom' })

    const operator = new CursorHTMLDomOperator()
    operator.hiddenDom('body > div#hiddenDom')

    const target = document.querySelector('body > div#hiddenDom')

    expect(target).not.toBeVisible()
})

describe('showDom', () => {
    test('show the hidden dom', () => {
        insertNewDom('div', { name: 'id', value: 'shownDom' }, true)

        const operator = new CursorHTMLDomOperator()
        operator.showDom('div#shownDom')

        expect(document.querySelector('body > div#shownDom')).toBeVisible()
    })
})

function insertNewDom(domTag: string, attribute?: { name: string, value: string }, isHidden?: true) {
    const newElm = document.createElement(domTag)

    if (attribute) {
        newElm.setAttribute(attribute.name, attribute.value)
    }

    if (isHidden) {
        newElm.style.display = 'none'
    }

    document.body.appendChild(newElm)
}