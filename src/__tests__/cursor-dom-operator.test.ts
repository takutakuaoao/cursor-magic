/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { CursorHTMLDomOperator } from "../cursor-html-dom-operator";

describe('createDom', () => {
    test('make dom', () => {
        const operator = new CursorHTMLDomOperator()
        const result = operator.createDom({
            parentDom: 'body',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: 'testID'
        })

        expect(result).toBeTruthy()
        expect(document.querySelector('body > div#testID')).toBeVisible()
    })
    test('confirm for new dom to set as first child on parent dom', () => {
        const newElm = document.createElement('div')
        document.body.appendChild(newElm)

        const operator = new CursorHTMLDomOperator()
        operator.createDom({
            parentDom: 'body > div',
            tagName: 'span',
            specifiedType: 'id',
            specifiedName: 'testID'
        })

        expect(document.querySelector('body > div > span#testID')).toBeVisible()
    })
    test("must return false and don't make new dom if parent dom was not exists.", () => {
        const operator = new CursorHTMLDomOperator()
        const result = operator.createDom({
            parentDom: '.notFoundParentDom',
            tagName: 'div',
            specifiedType: 'id',
            specifiedName: 'failed-test'
        })

        expect(result).toBeFalsy()
        expect(document.querySelector('.notFoundParentDom > div#failed-test')).toBeNull()
    })
})
