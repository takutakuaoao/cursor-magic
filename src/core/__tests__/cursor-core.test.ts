import { CursorCore, ErrorMessages } from '../cursor-core'
import { CursorClickEffect } from '../cursor-click-effects/cursor-click-effect'
import { newCursorDomOperatorMock } from './cursor-dom-operator-mock'

describe('createCursor', () => {
    test('cursor pointer dom was created and hidden.', () => {
        const mock = newCursorDomOperatorMock({ createDomReturn: true })
        const cursorID = 'test'
        const cursorCore = new CursorCore(new mock.mock, { cursorID: cursorID, cursorSize: 50 })

        cursorCore.createCursor()

        mock.assertions.onceCalledCreateDom({
            parentDom: 'body',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: cursorID,
            style: {
                width: '50px',
                height: '50px',
                transition: '0.2s',
                transitionTimingFunction: 'ease-out',
                position: 'absolute',
                top: '0px',
                left: '0px',
                backgroundColor: '#7a7a7ae3',
                borderRadius: '100%'
            }
        })
        mock.assertions.onceCalledHiddenDom(`#${cursorID}`)
    })
    test('can change some of the default cursor styling', () => {
        const mock = newCursorDomOperatorMock({ createDomReturn: true })
        const cursorCore = new CursorCore(new mock.mock, {
            cursorStyle: {
                backgroundColor: 'blue'
            }
        })

        cursorCore.createCursor()

        mock.assertions.onceCalledCreateDom({
            parentDom: 'body',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: 'cursorMagic',
            style: {
                width: '30px',
                height: '30px',
                transition: '0.2s',
                transitionTimingFunction: 'ease-out',
                position: 'absolute',
                top: '0px',
                left: '0px',
                backgroundColor: 'blue',
                borderRadius: '100%'
            }
        })
    })
    test('throw error if crateDom failed', () => {
        const mock = newCursorDomOperatorMock({ createDomReturn: false })

        const cursorCore = new CursorCore(new mock.mock)

        expect(() => {
            cursorCore.createCursor()
        }).toThrow(ErrorMessages.failedCreateCursor)
    })
})

describe('setMouseMoveEvent', () => {
    test('called once addEventListener', () => {
        const mock = newCursorDomOperatorMock({ addEventListener: true })
        const cursorCore = new CursorCore(new mock.mock, { cursorAreaDom: 'body' })

        const onMouseMoveEvent = (x: number, y: number) => { }
        cursorCore.setMouseMoveEvent(onMouseMoveEvent)

        mock.assertions.onceCalledAddEventListener('body', { type: 'mousemove', listener: onMouseMoveEvent })
    })
})

describe('setMouseOutEvent', () => {
    test('if success, addEventListener of operator be called', () => {
        const operator = newCursorDomOperatorMock()
        const cursorCore = new CursorCore(new operator.mock, { cursorAreaDom: 'body > #test' })

        const listener = () => { }
        cursorCore.setMouseLeaveEvent(listener)

        operator.assertions.onceCalledAddEventListener('body > #test', { type: 'mouseleave', listener: listener })
    })
})

describe('hiddenCursorPointer', () => {
    test('if success, hiddenDom method of operator be once called.', () => {
        const operator = newCursorDomOperatorMock()
        const cursorCore = new CursorCore(new operator.mock, { cursorID: 'hiddenCursorID' })

        cursorCore.hiddenCursorPointer()

        operator.assertions.onceCalledHiddenDom('#hiddenCursorID')
    })
})

describe('updatedMousePosition', () => {
    test('called once dom move', () => {
        const mock = newCursorDomOperatorMock()
        const cursorCore = new CursorCore(new mock.mock, { cursorID: 'cursorID', cursorSize: 50 })

        cursorCore.updatedMousePosition({ x: 100, y: 200 })

        mock.assertions.onceCalledMoveDom('#cursorID', { x: 75, y: 175 })
    })
    test('if cursor dom is hidden, it must be shown.', () => {
        const mock = newCursorDomOperatorMock({ isVisibleDom: false })
        const cursorCore = new CursorCore(new mock.mock, { cursorID: 'cursorID' })

        cursorCore.updatedMousePosition({ x: 10, y: 10 })

        mock.assertions.onceCalledShowDom('#cursorID')
    })
})

describe('setMouseEnterEvent', () => {
    const operator = newCursorDomOperatorMock()
    const cursorCore = new CursorCore(new operator.mock, { cursorAreaDom: 'body' })

    const event = () => { }
    cursorCore.setMouseEnterEvent(event)

    operator.assertions.onceCalledAddEventListener('body', { type: 'mouseenter', listener: event })
})

describe('showCursorPointer', () => {
    test('once the showDom method of operator was called if success', () => {
        const operator = newCursorDomOperatorMock()
        const cursorCore = new CursorCore(new operator.mock, { cursorID: 'testID' })

        cursorCore.showCursorPointer()

        operator.assertions.onceCalledShowDom('#testID')
    })
})

describe('setMouseClickEvent', () => {
    const operator = newCursorDomOperatorMock()
    const cursorCore = new CursorCore(new operator.mock, { cursorID: 'cursorID' })

    const event = () => { }
    cursorCore.setMouseClickEvent(event)

    operator.assertions.onceCalledAddEventListener('#cursorID', { type: 'click', listener: event })
})

describe('fireClickCursorPointer', () => {
    test('when click event on cursor pointer is fired, fireClickEffect method of cursor click effect once is called.', () => {
        const clickEffect = newCursorClickEffectMock()
        const cursorCore = new CursorCore(new (newCursorDomOperatorMock().mock), {
            cursorID: 'cursorID',
            cursorClickEffect: new clickEffect.mock
        })

        cursorCore.fireClickCursorPointer()

        clickEffect.assertions.onceCalledFireClickEffect('#cursorID')
    })
})

function newCursorClickEffectMock() {
    const fireClickEffect = jest.fn()

    const mock = jest.fn<CursorClickEffect, []>().mockImplementation(() => ({
        fireClickEffect: fireClickEffect
    }))

    return {
        mock: mock,
        assertions: {
            onceCalledFireClickEffect: (targetDom: string) => {
                expect(fireClickEffect).toHaveBeenCalledTimes(1)
                expect(fireClickEffect.mock.calls[0]).toStrictEqual([targetDom])
            }
        }
    }
}
