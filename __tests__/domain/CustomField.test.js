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

import CustomField from '../../src/domain/CustomField'
import TRELLO_CUSTOM_FIELD from '../data/trello-custom-field.json'
import {ValidationError} from '../../src/domain/validators/ValidationError'

describe('Custom Field Object', () =>{
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const customField = new CustomField(TRELLO_CUSTOM_FIELD)

      expect(customField)
        .not.toBeNull()
      expect(customField)
        .toBeInstanceOf(CustomField)
      expect(customField._trelloObject)
        .toEqual(TRELLO_CUSTOM_FIELD)
      expect(customField._trelloObject)
        .not.toBe(TRELLO_CUSTOM_FIELD)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new CustomField(%p)', value =>
      expect(() => new CustomField(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let customField = null

    beforeEach(() => {
      customField = new CustomField(TRELLO_CUSTOM_FIELD)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(customField.id)
          .toEqual(TRELLO_CUSTOM_FIELD.id)
      )

      test('Should not set id', () =>
        expect(() => {
          customField.id = '5e9c81b09599f7ec7d63b867'
        })
          .toThrow(TypeError)
      )
    })

    describe('modelId', () => {
      test('Should return id', () =>
        expect(customField.modelId)
          .toEqual(TRELLO_CUSTOM_FIELD.idModel)
      )

      test('Should not set modelId', () =>
        expect(() => {
          customField.modelId = '5e9c81b09599f7ec7d63b867'
        })
          .toThrow(TypeError)
      )
    })

    describe('modelType', () => {
      test('Should return model type', () =>
        expect(customField.modelType)
          .toEqual(TRELLO_CUSTOM_FIELD.modelType)
      )

      test('Should not set model type', () =>
        expect(() => {
          customField.modelType = 'board'
        })
          .toThrow(TypeError)
      )
    })

    describe('fieldGroup', () => {
      test('Should return field group', () =>
        expect(customField.fieldGroup)
          .toEqual(TRELLO_CUSTOM_FIELD.fieldGroup)
      )

      test('Should not set field group', () =>
        expect(() => {
          customField.fieldGroup = 'dasfawerasdgasg'
        })
          .toThrow(TypeError)
      )
    })

    describe('name', () => {
      test('Should return name', () =>
        expect(customField.name)
          .toEqual(TRELLO_CUSTOM_FIELD.name)
      )

      test.each([
        undefined,
        null,
        'sadfdksajalkfds',
        'top'
      ])('Name should be set to %p', value => {
        customField.name = value
        expect(customField.name)
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
        expect(() => {customField.name = value})
          .toThrow(ValidationError)
      )
    })

    describe('position', () => {
      test('Should return position value', () =>
        expect(customField.position)
          .toBe(TRELLO_CUSTOM_FIELD.pos)
      )

      test.each([
        -6.7,
        0,
        100.67
      ])('Position should be set to %p', value => {
        customField.position = value
        expect(customField.position)
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
        expect(() => {customField.position = value})
          .toThrow(ValidationError)
      )
    })

    describe('type', () => {
      test('Should return the type', () =>
        expect(customField.type)
          .toEqual(TRELLO_CUSTOM_FIELD.type)
      )

      test('Should not set type', () =>
        expect(() => {
          customField.type = 'number'
        })
          .toThrow(TypeError)
      )
    })
  })
})
