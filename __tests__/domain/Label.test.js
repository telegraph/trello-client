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

import Label from '../../src/domain/Label'
import TRELLO_LABEL from '../data/trello-label.json'
import {ValidationError} from '../../src/domain/validators/ValidationError'

describe('Label domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const label = new Label(TRELLO_LABEL)

      expect(label)
        .not.toBeNull()
      expect(label)
        .toBeInstanceOf(Label)
      expect(label._trelloObject)
        .toEqual(TRELLO_LABEL)
      expect(label._trelloObject)
        .not.toBe(TRELLO_LABEL)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Label(%p)', value =>
      expect(() => new Label(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let label = null

    beforeEach(() => {
      label = new Label(TRELLO_LABEL)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(label.id)
          .toBe(TRELLO_LABEL.id)
      )

      test('Should not set id', () =>
        expect(() => {
          label.id = '5e9dd8888f2c1f46aeb8eff3'
        })
          .toThrow(TypeError)
      )
    })

    describe('name', () => {
      test('Should return name', () =>
        expect(label.name)
          .toEqual(TRELLO_LABEL.name)
      )

      test.each([
        undefined,
        null,
        'sadfdksajalkfds',
        'top',
        '',
        '  '
      ])('Name should be set to %p', value => {
        label.name = value
        expect(label.name)
          .toBe(value)
      })

      test.each([
        true,
        -6.7,
        [1, 2, 3],
        {foo: 'bar'}
      ])('name = %p should throw ValidationError', value =>
        expect(() => {
          label.name = value
        })
          .toThrow(ValidationError)
      )
    })

    describe('color', () => {
      test('Should return color', () =>
        expect(label.color)
          .toEqual(TRELLO_LABEL.color)
      )

      test.each([
        undefined,
        null,
        'yellow',
        'purple',
        'blue',
        'red',
        'green',
        'orange',
        'black',
        'sky',
        'pink',
        'lime'
      ])('Color should be set to %p', value => {
        label.color = value
        expect(label.color)
          .toBe(value)
      })

      test.each([
        true,
        'no-color',
        -6.7,
        [1, 2, 3],
        {foo: 'bar'}
      ])('color = %p should throw ValidationError', value =>
        expect(() => {
          label.color = value
        })
          .toThrow(ValidationError)
      )
    })
  })
})
