import { CreateDomArgs, CursorDomOperator } from "../cursor-dom-operator";

export function newCursorDomOperatorMock(methodsReturn: {
    createDomReturn?: boolean
    addEventListener?: boolean
    isVisibleDom?: boolean
    getDomStyle?: (string | undefined)[]
} = { createDomReturn: true, addEventListener: true, isVisibleDom: true, getDomStyle: [undefined] }) {
    const createDom = jest.fn().mockReturnValue(methodsReturn.createDomReturn);
    const addEventListener = jest.fn().mockReturnValue(methodsReturn.addEventListener)
    const moveDom = jest.fn()
    const hiddenDom = jest.fn()
    const showDom = jest.fn()
    const isVisibleDom = jest.fn().mockReturnValue(methodsReturn.isVisibleDom)
    const setStyle = jest.fn()
    const lazySetStyle = jest.fn()
    const getDomStyle = jest.fn()
    methodsReturn.getDomStyle?.forEach(element => {
        getDomStyle.mockReturnValueOnce(element)
    });

    const mock = jest.fn<CursorDomOperator, []>().mockImplementation(() => ({
        createDom: createDom,
        addEventListener: addEventListener,
        moveDom: moveDom,
        hiddenDom: hiddenDom,
        showDom: showDom,
        isVisibleDom: isVisibleDom,
        setStyle: setStyle,
        lazySetStyle: lazySetStyle,
        getDomStyle: getDomStyle
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
            },
            calledSetStyle: (calledCount: number, cursorID: string, ...args: Partial<CSSStyleDeclaration>[]) => {
                expect(setStyle).toHaveBeenCalledTimes(calledCount)

                args.forEach((element, index) => {
                    expect(setStyle.mock.calls[index]).toStrictEqual([cursorID, element])
                });
            },
            onceCalledLazySetStyle: (targetDom: string, style: Partial<CSSStyleDeclaration>, lazyMS: number) => {
                expect(lazySetStyle).toHaveBeenCalledTimes(1)
                expect(lazySetStyle.mock.calls[0]).toStrictEqual([targetDom, style, lazyMS])
            }
        }

    };
}

function assertFunction(actual: any, expectFn: Function) {
    expect(String(actual)).toBe(String(expectFn))
}
