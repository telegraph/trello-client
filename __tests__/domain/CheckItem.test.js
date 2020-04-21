/*
 * Copyright 2020 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import TRELLO_CHECK_ITEM from '../data/trello-checkitem.json'
import CheckItem from '../../src/domain/CheckItem'
import {ValidationError} from '../../src/domain/validators/ValidationError'

describe('CheckItem domain object', () => {
  describe('Constructor', () => {
    test('Should init properties by default', () => {
      const checkItem = new CheckItem(TRELLO_CHECK_ITEM)

      expect(checkItem)
        .not.toBeNull()
      expect(checkItem)
        .toBeInstanceOf(CheckItem)
      expect(checkItem._trelloObject)
        .toEqual(TRELLO_CHECK_ITEM)
      expect(checkItem._trelloObject)
        .not.toBe(TRELLO_CHECK_ITEM)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new CheckItem(%p)', value =>
      expect(() => new CheckItem(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let checkItem = null

    beforeEach(() => {
      checkItem = new CheckItem(TRELLO_CHECK_ITEM)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(checkItem.id)
          .toEqual(TRELLO_CHECK_ITEM.id)
      )

      test('Should not set id', () =>
        expect(() => {
          checkItem.id = '5e9c81b09599f7ec7d63b867'
        })
          .toThrow(TypeError)
      )
    })

    describe('checklistId', () => {
      test('Should return checklistId', () =>
        expect(checkItem.checklistId)
          .toEqual(TRELLO_CHECK_ITEM.idChecklist)
      )

      test('Should not set checklistId', () =>
        expect(() => {
          checkItem.checklistId = '5e9c82419c185bb4639557f5'
        })
          .toThrow(TypeError)
      )
    })

    describe('name', () => {
      test('Should return name', () =>
        expect(checkItem.name)
          .toEqual(TRELLO_CHECK_ITEM.name)
      )

      test.each([
        'sadfdksajalkfds',
        'top'
      ])('Name should be set to %p', value => {
        checkItem.name = value
        expect(checkItem.name)
          .toBe(value)
      })

      test.each([
        undefined,
        null,
        true,
        -6.7,
        '',
        '  ',
        [1, 2, 3],
        {foo: 'bar'}
      ])('name = %p should throw ValidationError', value =>
        expect(() => {checkItem.name = value})
          .toThrow(ValidationError)
      )
    })

    describe('position', () => {
      test('Should return position value', () =>
        expect(checkItem.position)
          .toBe(TRELLO_CHECK_ITEM.pos)
      )

      test.each([
        0,
        100.67,
        -6.7,
      ])('Position should be set to %p', value => {
        checkItem.position = value
        expect(checkItem.position)
          .toBe(value)
      })

      test.each([
        undefined,
        null,
        true,
        'sadfdksajalkfds',
        'bottom',
        'top',
        [1, 2, 3],
        {foo: 'bar'}
      ])('position = %p should throw ValidationError', value =>
        expect(() => {checkItem.position = value})
          .toThrow(ValidationError)
      )
    })

    describe('state', () => {
      test('Should return state value', () =>
        expect(checkItem.state)
          .toBe(TRELLO_CHECK_ITEM.state)
      )

      test.each([
        'complete',
        'incomplete'
      ])('State should be set to %p', value => {
        checkItem.state = value
        expect(checkItem.state)
          .toBe(value)
      })

      test.each([
        undefined,
        null,
        true,
        -6.7,
        'sadfdksajalkfds',
        [1, 2, 3],
        {foo: 'bar'}
      ])('state = %p should throw ValidationError', value =>
        expect(() => {checkItem.state = value})
          .toThrow(ValidationError)
      )
    })
  })
})
