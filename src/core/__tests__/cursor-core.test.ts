import { CreateDomArgs, CursorDomOperator } from '../cursor-dom-operator'
import { CursorCore, ErrorMessages } from '../cursor-core'

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

function newCursorDomOperatorMock(methodsReturn: {
    createDomReturn?: boolean
    addEventListener?: boolean
} = { createDomReturn: true, addEventListener: true }) {
    const createDom = jest.fn().mockReturnValue(methodsReturn.createDomReturn);
    const addEventListener = jest.fn().mockReturnValue(methodsReturn.addEventListener)
    const moveDom = jest.fn()
    const hiddenDom = jest.fn()
    const showDom = jest.fn()

    const mock = jest.fn<CursorDomOperator, []>().mockImplementation(() => ({
        createDom: createDom,
        addEventListener: addEventListener,
        moveDom: moveDom,
        hiddenDom: hiddenDom,
        showDom: showDom
    }))

    return {
        mock: mock,
        assertions: {
            onceCalledCreateDom: (args: CreateDomArgs) => {
                expect(mock).toHaveBeenCalledTimes(1)
                expect(createDom.mock.calls[0][0]).toEqual(args)
            },
            onceCalledAddEventListener: (targetDomId: string, event: { type: string, listener: Function }) => {
                expect(addEventListener).toHaveBeenCalledTimes(1)

                expect(addEventListener.mock.calls[0][0]).toBe(targetDomId)
                expect(addEventListener.mock.calls[0][1].type).toBe(event.type)
                assertFunction(addEventListener.mock.calls[0][1].listener, event.listener)
            },
            onceCalledMoveDom: (targetDom: string, position: { x: number, y: number }) => {
                expect(moveDom).toHaveBeenCalledTimes(1)
                expect(moveDom.mock.calls[0]).toStrictEqual([targetDom, position])
            },
            onceCalledHiddenDom: (targetDom: string) => {
                expect(hiddenDom).toHaveBeenCalledTimes(1)
                expect(hiddenDom.mock.calls[0]).toStrictEqual([targetDom])
            },
            onceCalledShowDom: (targetDom: string) => {
                expect(showDom).toHaveBeenCalledTimes(1)
                expect(showDom.mock.calls[0]).toStrictEqual([targetDom])
            }
        }

    };
}

function assertFunction(actual: any, expectFn: Function) {
    expect(String(actual)).toBe(String(expectFn))
}
