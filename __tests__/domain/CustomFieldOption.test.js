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

import CustomFieldOption from '../../src/domain/CustomFieldOption'
import TRELLO_CUSTOM_FIELD_OPTION from '../data/trello-custom-field-option.json'
import {ValidationError} from '../../src/domain/validators/ValidationError'

describe('Custom Field Object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const customFieldOption = new CustomFieldOption(TRELLO_CUSTOM_FIELD_OPTION)

      expect(customFieldOption)
        .not.toBeNull()
      expect(customFieldOption)
        .toBeInstanceOf(CustomFieldOption)
      expect(customFieldOption._trelloObject)
        .toEqual(TRELLO_CUSTOM_FIELD_OPTION)
      expect(customFieldOption._trelloObject)
        .not.toBe(TRELLO_CUSTOM_FIELD_OPTION)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new CustomFieldOption(%p)', value =>
      expect(() => new CustomFieldOption(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let customFieldOption = null

    beforeEach(() => {
      customFieldOption = new CustomFieldOption(TRELLO_CUSTOM_FIELD_OPTION)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(customFieldOption.id)
          .toEqual(TRELLO_CUSTOM_FIELD_OPTION.id)
      )

      test('Should not set id', () =>
        expect(() => {
          customFieldOption.id = '5e9c81b09599f7ec7d63b867'
        })
          .toThrow(TypeError)
      )
    })

    describe('customFieldId', () => {
      test('Should return customFieldId', () =>
        expect(customFieldOption.customFieldId)
          .toEqual(TRELLO_CUSTOM_FIELD_OPTION.idCustomField)
      )

      test('Should not set customFieldId', () =>
        expect(() => {
          customFieldOption.customFieldId = '5e9c81b09599f7ec7d63b867'
        })
          .toThrow(TypeError)
      )
    })

    describe('value', () => {
      test('Should return value', () =>
        expect(customFieldOption.value)
          .toEqual(TRELLO_CUSTOM_FIELD_OPTION.value.text)
      )

      test.each([
        'sadfdksajalkfds',
        'top'
      ])('Value should be set to %p', value => {
        customFieldOption.value = value
        expect(customFieldOption.value)
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
      ])('value = %p should throw ValidationError', value =>
        expect(() => {customFieldOption.value = value})
          .toThrow(ValidationError)
      )
    })

    describe('color', () => {
      test('Should return color', () =>
        expect(customFieldOption.color)
          .toEqual(TRELLO_CUSTOM_FIELD_OPTION.color)
      )

      test.each([
        undefined,
        null,
        'red',
        'green'
      ])('Color should be set to %p', value => {
        customFieldOption.color = value
        expect(customFieldOption.color)
          .toBe(value)
      })

      test.each([
        true,
        -6.7,
        '',
        '  ',
        [1, 2, 3],
        {foo: 'bar'}
      ])('color = %p should throw ValidationError', value =>
        expect(() => {customFieldOption.color = value})
          .toThrow(ValidationError)
      )
    })

    describe('position', () => {
      test('Should return position value', () =>
        expect(customFieldOption.position)
          .toBe(TRELLO_CUSTOM_FIELD_OPTION.pos)
      )

      test.each([
        -6.7,
        0,
        100.67
      ])('Position should be set to %p', value => {
        customFieldOption.position = value
        expect(customFieldOption.position)
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
        expect(() => {customFieldOption.position = value})
          .toThrow(ValidationError)
      )
    })
  })
})
