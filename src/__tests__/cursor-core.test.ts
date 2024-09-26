import { CreateDomArgs, CursorDomOperator } from '../cursor-dom-operator'
import { CursorCore, ErrorMessages } from '../cursor-core'

describe('createCursor', () => {
    test('called createDom method', () => {
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

        mock.assertions.onceCalledAddEventListener('body', 'mousemove', onMouseMoveEvent)
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

function newCursorDomOperatorMock(methodsReturn: {
    createDomReturn?: boolean
    addEventListener?: boolean
} = { createDomReturn: true, addEventListener: true }) {
    const createDom = jest.fn().mockReturnValue(methodsReturn.createDomReturn);
    const addEventListener = jest.fn().mockReturnValue(methodsReturn.addEventListener)
    const moveDom = jest.fn()

    const mock = jest.fn<CursorDomOperator, []>().mockImplementation(() => ({
        createDom: createDom,
        addEventListener: addEventListener,
        moveDom: moveDom
    }))

    return {
        mock: mock,
        assertions: {
            onceCalledCreateDom: (args: CreateDomArgs) => {
                expect(mock).toHaveBeenCalledTimes(1)
                expect(createDom.mock.calls[0][0]).toEqual(args)
            },
            onceCalledAddEventListener: (targetDomId: string, eventType: string, event: (x: number, y: number) => void) => {
                expect(addEventListener).toHaveBeenCalledTimes(1)

                expect(addEventListener.mock.calls[0][0]).toBe(targetDomId)
                expect(addEventListener.mock.calls[0][1]).toBe(eventType)
                assertFunction(addEventListener.mock.calls[0][2], event)

                function assertFunction(actual: any, expectFn: Function) {
                    expect(String(actual)).toBe(String(expectFn))
                }
            },
            onceCalledMoveDom: (targetDom: string, position: { x: number, y: number }) => {
                expect(moveDom).toHaveBeenCalledTimes(1)
                expect(moveDom.mock.calls[0]).toStrictEqual([targetDom, position])
            }
        }

    };
}