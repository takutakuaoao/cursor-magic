import { newCursorDomOperatorMock } from "../../__tests__/cursor-dom-operator-mock"
import { CursorSpringClickEffect } from "../cursor-spring-click-effect"

describe('fireClickEffect', () => {
    it('After the dom is clicked, its style is once change to specified clicked style and at the end returned to original style.', () => {
        const originalStyle = { border: '1px dashed #ffffff', backgroundColor: 'red', borderRadius: undefined }
        const changedStyle = { border: '2px solid #000000', backgroundColor: 'blue', borderRadius: '20px' }

        const operator = newCursorDomOperatorMock(
            {
                getDomStyle: [
                    originalStyle.border,
                    originalStyle.backgroundColor,
                    originalStyle.borderRadius
                ]
            }
        )

        const effect = new CursorSpringClickEffect(new operator.mock, changedStyle)

        effect.fireClickEffect('#clicked-dom')

        operator.assertions.calledSetStyle(1, '#clicked-dom', changedStyle)
        operator.assertions.onceCalledLazySetStyle('#clicked-dom', originalStyle, 300)
    })
})
