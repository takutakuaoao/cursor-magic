import { CreateDomArgs, CursorDomOperator } from '../cursor-dom-operator'
import { CursorCore, ErrorMessages } from '../cursor-core'

describe('createCursor', () => {
    test('called once createDom method', () => {
        const mock = newCursorDomOperatorMock({ createDomReturn: true })
        const cursorID = 'test'
        const cursorCore = new CursorCore(new mock.mock, { cursorID: cursorID })

        cursorCore.createCursor()

        mock.assertions.onceCalledCreateDom({
            parentDom: 'body',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: cursorID
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

function newCursorDomOperatorMock(methodsReturn: {
    createDomReturn?: boolean
    addEventListener?: boolean
} = { createDomReturn: true, addEventListener: true }) {
    const createDom = jest.fn().mockReturnValue(methodsReturn.createDomReturn);
    const addEventListener = jest.fn().mockReturnValue(methodsReturn.addEventListener)

    const mock = jest.fn<CursorDomOperator, []>().mockImplementation(() => ({
        createDom: createDom,
        addEventListener: addEventListener
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
            }
        }

    };
}