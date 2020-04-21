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

import TRELLO_CHECKLIST from '../data/trello-checklist.json'
import Checklist from '../../src/domain/Checklist'
import {ValidationError} from '../../src/domain/validators/ValidationError'

describe('Checklist domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const checklist = new Checklist(TRELLO_CHECKLIST)

      expect(checklist)
        .not.toBeNull()
      expect(checklist)
        .toBeInstanceOf(Checklist)
      expect(checklist._trelloObject)
        .toEqual(TRELLO_CHECKLIST)
      expect(checklist._trelloObject)
        .not.toBe(TRELLO_CHECKLIST)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Action(%p)', value =>
      expect(() => new Checklist(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let checklist = null

    beforeEach(() => {
      checklist = new Checklist(TRELLO_CHECKLIST)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(checklist.id)
          .toEqual(TRELLO_CHECKLIST.id)
      )

      test('Should not set id', () =>
        expect(() => {
          checklist.id = '5e9c81b09599f7ec7d63b867'
        })
          .toThrow(TypeError)
      )
    })

    describe('boardId', () => {
      test('Should return boardId', () =>
        expect(checklist.boardId)
          .toEqual(TRELLO_CHECKLIST.idBoard)
      )

      test('Should not set boardId', () =>
        expect(() => {
          checklist.boardId = '5e9c81b09599f7ec7d63b867'
        })
          .toThrow(TypeError)
      )
    })

    describe('cardId', () => {
      test('Should return cardId', () =>
        expect(checklist.cardId)
          .toEqual(TRELLO_CHECKLIST.idCard)
      )

      test('Should not set cardId', () =>
        expect(() => {
          checklist.cardId = '5e9c81b09599f7ec7d63b867'
        })
          .toThrow(TypeError)
      )
    })

    describe('name', () => {
      test('Should return name', () =>
        expect(checklist.name)
          .toEqual(TRELLO_CHECKLIST.name)
      )

      test.each([
        undefined,
        null,
        'sadfdksajalkfds',
        'top'
      ])('Name should be set to %p', value => {
        checklist.name = value
        expect(checklist.name)
          .toBe(value)
      })

      test.each([
        true,
        -6.7,
        '',
        '  ',
        [1, 2, 3],
        {foo: 'bar'}
      ])('name = %p should throw ValidationError', value =>
        expect(() => {checklist.name = value})
          .toThrow(ValidationError)
      )
    })

    describe('position', () => {
      test('Should return position value', () =>
        expect(checklist.position)
          .toBe(TRELLO_CHECKLIST.pos)
      )

      test.each([
        -6.7,
        0,
        100.67
      ])('Position should be set to %p', value => {
        checklist.position = value
        expect(checklist.position)
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
        expect(() => {checklist.position = value})
          .toThrow(ValidationError)
      )
    })
  })
})
