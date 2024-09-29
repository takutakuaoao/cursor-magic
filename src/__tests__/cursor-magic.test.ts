/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import { createCursorMagic } from "../index";
import { fireMouseEvent } from "./util";

test('if mouseout event was fired, the cursorMagic dom must be hidden.', () => {
    createCursorMagic({ cursorID: 'testID' })

    fireMouseEvent('body', 'mouseleave')

    expect(document.querySelector('#testID')).not.toBeVisible()
})