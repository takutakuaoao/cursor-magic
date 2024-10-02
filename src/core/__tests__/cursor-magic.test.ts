/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { initCursorMagic } from '../cursor-magic'
import { fireMouseEvent } from "../../__tests__/util";

test('if mouseout event was fired, the cursorMagic dom must be hidden.', () => {
    initCursorMagic({ cursorID: 'testID' })

    fireMouseEvent('body', 'mouseleave')

    expect(document.querySelector('#testID')).not.toBeVisible()
})

test('if cursor is in screen, pointer is display on.', () => {
    initCursorMagic({ cursorID: 'testID', cursorAreaDom: 'body' })

    fireMouseEvent('body', 'mouseleave')
    expect(document.querySelector('#testID')).not.toBeVisible()

    fireMouseEvent('body', 'mouseenter')
    expect(document.querySelector('#testID')).toBeVisible()
})

test('pointer is display on when mousemove firstly fired.', () => {
    initCursorMagic({ cursorID: 'testID', cursorAreaDom: 'body' })

    fireMouseEvent('body', 'mousemove', { clientX: 10, clientY: 20 })

    expect(document.querySelector('#testID')).toBeVisible()
})
