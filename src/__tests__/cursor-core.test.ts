import { CreateDomArgs, CursorDomOperator } from '../cursor-dom-operator'
import { CursorCore, ErrorMessages } from '../cursor-core'

describe('createCursor', () => {
    test('called once createDom method', () => {
        const mock = newCursorDomOperatorMock({ createDomReturn: true })
        const cursorCore = new CursorCore(new mock.mock)

        cursorCore.createCursor()

        mock.assertions.onceCalledCreateDom({
            parentDom: 'body',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: 'cursorMagic'
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

function newCursorDomOperatorMock(methodsReturn: {
    createDomReturn: boolean
}) {
    const createDom = jest.fn().mockReturnValue(methodsReturn.createDomReturn);
    const mock = jest.fn<CursorDomOperator, []>().mockImplementation(() => ({
        createDom: createDom
    }))

    return {
        mock: mock,
        assertions: {
            onceCalledCreateDom: (args: CreateDomArgs) => {
                expect(mock).toHaveBeenCalledTimes(1)
                expect(createDom.mock.calls[0][0]).toEqual(args)
            }
        }

    };
}