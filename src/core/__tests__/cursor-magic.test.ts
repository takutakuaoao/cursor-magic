/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { createCursorMagic } from '../cursor-magic'
import { fireMouseEvent } from "./util";

test('if mouseout event was fired, the cursorMagic dom must be hidden.', () => {
    createCursorMagic({ cursorID: 'testID' })

    fireMouseEvent('body', 'mouseleave')

    expect(document.querySelector('#testID')).not.toBeVisible()
})

test('if cursor is in screen, pointer is display on.', () => {
    createCursorMagic({ cursorID: 'testID', cursorAreaDom: 'body' })

    fireMouseEvent('body', 'mouseleave')
    expect(document.querySelector('#testID')).not.toBeVisible()

    fireMouseEvent('body', 'mouseenter')
    expect(document.querySelector('#testID')).toBeVisible()
})
