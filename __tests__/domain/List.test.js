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

import {ValidationError} from '../../src/domain/validators/ValidationError'
import List from '../../src/domain/List'
import TRELLO_LIST from '../data/trello-list.json'

describe('List domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const list = new List(TRELLO_LIST)

      expect(list)
        .not.toBeNull()
      expect(list)
        .toBeInstanceOf(List)
      expect(list._trelloObject)
        .toEqual(TRELLO_LIST)
      expect(list._trelloObject)
        .not.toBe(TRELLO_LIST)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new List(%p)', value =>
      expect(() => new List(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let list = null

    beforeEach(() => {
      list = new List(TRELLO_LIST)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(list.id)
          .toBe(TRELLO_LIST.id)
      )

      test('Should not set id', () =>
        expect(() => {
          list.id = '5e9dd8888f2c1f46aeb8eff3'
        })
          .toThrow(TypeError)
      )
    })

    describe('name', () => {
      test('Should return name', () =>
        expect(list.name)
          .toEqual(TRELLO_LIST.name)
      )

      test.each([
        'Washington',
        'urgent',
      ])('Name should be set to %p', value => {
        list.name = value
        expect(list.name)
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
        expect(() => {
          list.name = value
        })
          .toThrow(ValidationError)
      )
    })

    describe('closed', () => {
      test('Should return if is closed', () =>
        expect(list.closed)
          .toBe(TRELLO_LIST.closed)
      )

      test.each([
        true,
        false
      ])('Should set closed status to %p', value => {
        list.closed = value
        expect(list.closed)
          .toBe(value)
      })

      test.each([
        null,
        undefined,
        '   ',
        [1, 2, 3],
        {foo: 'bar'}
      ])('closed = %p should throw and error', value => {
        expect(() => {
          list.closed = value
        })
          .toThrow(ValidationError)
      })
    })

    describe('boardId', () => {
      test('Should return the board id', () =>
        expect(list.boardId)
          .toBe(TRELLO_LIST.idBoard)
      )

      test('Should set the board id', () => {
        list.boardId = '5e8fab6fce0489b1d687ef4a'
        expect(list.boardId)
          .toBe('5e8fab6fce0489b1d687ef4a')
      })

      test.each([
        null,
        undefined,
        '   ',
        [1, 2, 3],
        {foo: 'bar'}
      ])('Setting boardId to %p should throw and error', value => {
        expect(() => {
          list.boardId = value
        })
          .toThrow(ValidationError)
      })
    })

    describe('position', () => {
      test('Should return position value', () =>
        expect(list.position)
          .toBe(TRELLO_LIST.pos)
      )

      test.each([
        'bottom',
        'top',
        0,
        100.67
      ])('Position should be set to %p', value => {
        list.position = value
        expect(list.position)
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
      ])('position = %p should throw ValidationError', value =>
        expect(() => {list.position = value})
          .toThrow(ValidationError)
      )
    })
  })
})
