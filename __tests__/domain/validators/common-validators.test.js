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

import Chance from 'chance'
import {
  validateNotBlankTextField, validateNotNullBooleanField,
  validateNotNullStringOptionField, validateNullableBooleanField,
  validateNullableStringOptionField, validateNullableTextField
} from '../../../src/domain/validators/common-validators'
import {ValidationError} from '../../../src/domain/validators/ValidationError'

const chance = new Chance()

describe('Common validators', () => {
  describe('Validate not blank text field', () => {
    test.each([
      ['name', undefined],
      ['displayName', null],
      ['name', ''],
      ['displayName', '    '],
      ['name', {foo: 'bar'}]
    ])('validateNotBlankTextField(%p, %p) should throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNotBlankTextField(fieldName, value))
        .toThrow(new ValidationError(`${fieldName} must be a not empty string. Parameter value is '${value}'`))
    )

    test('Should throw an error if text field value is longer than 16384 characters', () =>
      expect(() => validateNotBlankTextField('desc', chance.string({ length: 16385 })))
        .toThrow(ValidationError)
    )

    test('Should not throw an error if text field value is valid', () =>
      expect(() => validateNotBlankTextField('desc', 'Some valid text'))
        .not.toThrow(ValidationError)
    )
  })

  describe('Validate nullable text field', () => {
    test.each([
      ['name', undefined],
      ['displayName', null],
      ['name', ''],
      ['displayName', '    '],
      ['name', 'Some text']
    ])('validateNullableTextField(%p, %p) should not throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNullableTextField(fieldName, value))
        .not.toThrow(ValidationError)
    )

    test.each([
      ['name', 12345],
      ['displayName', {foo: 'bar'}],
      ['name', [1, 2 ,3, 4]]
    ])('validateNullableTextField(%p, %p) should throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNullableTextField(fieldName, value))
        .toThrow(ValidationError)
    )

    test('Should throw an error if text field value is longer than 16384 characters', () =>
      expect(() => validateNullableTextField('desc', chance.string({ length: 16385 })))
        .toThrow(ValidationError)
    )
  })

  describe('Validate not nullable boolean field', () => {
    test.each([
      ['closed', undefined],
      ['subscribed', null],
      ['hideVotes', ''],
      ['closed', 'Some text'],
      ['subscribed', 12345],
      ['hideVotes', {foo: 'bar'}],
      ['closed', [1, 2, 6]]
    ])('validateNotNullBooleanField(%p, %p) should throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNotNullBooleanField(fieldName, value))
        .toThrow(ValidationError)
    )

    test.each([
      ['closed', true],
      ['subscribed', false]
    ])('validateNotNullBooleanField(%p, %p) should not throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNotNullBooleanField(fieldName, value))
        .not.toThrow(ValidationError)
    )
  })

  describe('Validate nullable boolean field', () => {
    test.each([
      ['hideVotes', ''],
      ['closed', 'Some text'],
      ['subscribed', 12345],
      ['hideVotes', {foo: 'bar'}],
      ['closed', [1, 2, 6]]
    ])('validateNullableBooleanField(%p, %p) should throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNullableBooleanField(fieldName, value))
        .toThrow(ValidationError)
    )

    test.each([
      ['closed', undefined],
      ['subscribed', null],
      ['closed', true],
      ['subscribed', false]
    ])('validateNullableBooleanField(%p, %p) should not throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNullableBooleanField(fieldName, value))
        .not.toThrow(ValidationError)
    )
  })

  describe('Validate not null string option field', () => {
    const OPTIONS = ['org', 'private', 'public']

    test.each([
      ['permissionLevel', OPTIONS, null],
      ['invitations', OPTIONS, undefined],
      ['permissionLevel', OPTIONS, ''],
      ['invitations', OPTIONS, 'non-valid-option'],
      ['permissionLevel', OPTIONS, 12345],
      ['invitations', OPTIONS, {foo: 'bar'}],
      ['permissionLevel', OPTIONS, [1, 2, 6]]
    ])('validateNotNullStringOptionField(%p, %p, %p) should throw ValidationError exception', (fieldName, options, value) =>
      expect(() => validateNotNullStringOptionField(fieldName, options, value))
        .toThrow(ValidationError)
    )

    test.each([
      ['permissionLevel', OPTIONS, 'org'],
      ['subscribed', OPTIONS, 'private'],
      ['subscribed', OPTIONS, 'public']
    ])('validateNotNullStringOptionField(%p, %p, %p) should not throw ValidationError exception', (fieldName, options, value) =>
      expect(() => validateNotNullStringOptionField(fieldName, options, value))
        .not.toThrow(ValidationError)
    )
  })

  describe('Validate nullable string option field', () => {
    const OPTIONS = ['org', 'private', 'public']

    test.each([
      ['permissionLevel', OPTIONS, ''],
      ['invitations', OPTIONS, 'non-valid-option'],
      ['permissionLevel', OPTIONS, 12345],
      ['invitations', OPTIONS, {foo: 'bar'}],
      ['permissionLevel', OPTIONS, [1, 2, 6]]
    ])('validateNullableStringOptionField(%p, %p, %p) should throw ValidationError exception', (fieldName, options, value) =>
      expect(() => validateNullableStringOptionField(fieldName, options, value))
        .toThrow(ValidationError)
    )

    test.each([
      ['permissionLevel', OPTIONS, null],
      ['invitations', OPTIONS, undefined],
      ['permissionLevel', OPTIONS, 'org'],
      ['subscribed', OPTIONS, 'private'],
      ['subscribed', OPTIONS, 'public']
    ])('validateNullableStringOptionField(%p, %p, %p) should not throw ValidationError exception', (fieldName, options, value) =>
      expect(() => validateNullableStringOptionField(fieldName, options, value))
        .not.toThrow(ValidationError)
    )
  })
})
