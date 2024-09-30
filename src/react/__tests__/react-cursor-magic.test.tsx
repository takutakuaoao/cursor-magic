import React from 'react'
import { render } from '@testing-library/react'
import "@testing-library/jest-dom";
import ReactCursorMagic from '../react-cursor-magic'
import { fireMouseEvent, insertNewDom } from '../../__tests__/util';

test('As react component, pointer was created.', async () => {
    insertNewDom('div', { name: 'id', value: 'cursorArea' })
    render(<ReactCursorMagic cursorID="testID" cursorAreaDom='div#cursorArea' />)

    fireMouseEvent('div#cursorArea', "mousemove", { clientX: 100, clientY: 200 })

    const cursorPointer = document.querySelector('#testID')
    expect(cursorPointer).toBeVisible()
})
