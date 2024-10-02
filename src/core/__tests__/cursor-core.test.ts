import { CursorCore, ErrorMessages } from '../cursor-core'
import { newCursorDomOperatorMock } from './cursor-dom-operator-mock'

describe('createCursor', () => {
    test('cursor pointer dom was created and hidden.', () => {
        const mock = newCursorDomOperatorMock({ createDomReturn: true })
        const cursorID = 'test'
        const cursorCore = new CursorCore(new mock.mock, { cursorID: cursorID, cursorSize: 60 })

        cursorCore.createCursor()

        mock.assertions.onceCalledCreateDom({
            parentDom: 'body',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: cursorID,
            style: {
                width: '60px',
                height: '60px',
                transition: '0.2s',
                transitionTimingFunction: 'ease-out',
                position: 'absolute',
                top: '0px',
                left: '0px',
                border: "1px solid #b8b8b8",
                borderRadius: '100%',
                pointerEvents: 'none'
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
                width: '50px',
                height: '50px',
                transition: '0.2s',
                transitionTimingFunction: 'ease-out',
                position: 'absolute',
                top: '0px',
                left: '0px',
                border: "1px solid #b8b8b8",
                backgroundColor: 'blue',
                borderRadius: '100%',
                pointerEvents: 'none'
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
