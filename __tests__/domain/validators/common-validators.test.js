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
  validateNotBlankTextField,
  validateNotNullArrayOfStrings,
  validateNotNullBooleanField,
  validateNotNullId,
  validateNotNullNumberField,
  validateNotNullStringOptionField,
  validateNullableBooleanField,
  validateNullableNotBlankTextField,
  validateNullableStringOptionField,
  validateNullableTextField,
  validatePosition
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
        .toThrow(ValidationError)
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

  describe('Validate nullable not blank text field', () => {
    test.each([
      ['name', ''],
      ['displayName', '    '],
      ['name', {foo: 'bar'}]
    ])('validateNullableNotBlankTextField(%p, %p) should throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNullableNotBlankTextField(fieldName, value))
        .toThrow(ValidationError)
    )

    test('Should throw an error if text field value is longer than 16384 characters', () =>
      expect(() => validateNullableNotBlankTextField('desc', chance.string({ length: 16385 })))
        .toThrow(ValidationError)
    )

    test.each([
      ['name', null],
      ['displayName', undefined],
      ['name', 'Some valid text']
    ])('validateNullableNotBlankTextField(%p, %p) should not throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNullableNotBlankTextField(fieldName, value))
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

  describe('Validate not nullable number field', () => {
    test.each([
      ['latitude', undefined],
      ['longitude', null],
      ['latitude', ''],
      ['longitude', 'Some text'],
      ['latitude', true],
      ['longitude', {foo: 'bar'}],
      ['latitude', [1, 2, 6]]
    ])('validateNotNullNumberField(%p, %p) should throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNotNullNumberField(fieldName, value))
        .toThrow(ValidationError)
    )

    test.each([
      ['latitude', -57],
      ['longitude', 0],
      ['latitude', 12.5]
    ])('validateNotNullNumberField(%p, %p) should not throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNotNullNumberField(fieldName, value))
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

  describe('Validate not null array of strings', () => {
    test.each([
      ['labelsId', []],
      ['labelsId', ['item1']],
      ['labelsId', ['item1', 'item2']]
    ])('validateNotNullArrayOfStrings(%p, %p) should not throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNotNullArrayOfStrings(fieldName, value))
        .not.toThrow(ValidationError)
    )

    test.each([
      ['labelsId', undefined],
      ['labelsId', null],
      ['labelsId', true],
      ['labelsId', 'Some string'],
      ['labelsId', 256],
      ['labelsId', [1, 2, 3]],
      ['labelsId', {foo: 'bar'}]
    ])('validateNotNullArrayOfStrings(%p, %p) should throw ValidationError exception', (fieldName, value) =>
      expect(() => validateNotNullArrayOfStrings(fieldName, value))
        .toThrow(ValidationError)
    )
  })

  describe('Validate Position', () => {
    test.each([
      ['position', 'bottom'],
      ['position', 'top'],
      ['position', 0],
      ['position', 100.67]
    ])('%p should be valid', (field, value) =>
      expect(() => validatePosition(field, value))
        .not.toThrow(ValidationError)
    )

    test.each([
      ['position', undefined],
      ['position', null],
      ['position', true],
      ['position', -6.7],
      ['position', 'sadfdksajalkfds'],
      ['position', [1, 2, 3]],
      ['position', {foo: 'bar'}]
    ])('%p should throw ValidationError', (field, value) =>
      expect(() => validatePosition(field, value))
        .toThrow(ValidationError)
    )
  })

  describe('Validate Not Null URL', () => {
    test.each([
      ['callbackUrl', 'bottom'],
      ['callbackUrl', 'top'],
    ])('%p should be valid', (field, value) =>
      expect(() => validatePosition(field, value))
        .not.toThrow(ValidationError)
    )

    test.each([
      ['callbackUrl', undefined],
      ['callbackUrl', null],
      ['callbackUrl', true],
      ['callbackUrl', -6.7],
      ['callbackUrl', 'www.example.com'],
      ['callbackUrl', 'some-string'],
      ['callbackUrl', [1, 2, 3]],
      ['callbackUrl', {foo: 'bar'}]
    ])('%p should throw ValidationError', (field, value) =>
      expect(() => validatePosition(field, value))
        .toThrow(ValidationError)
    )
  })

  describe('Validate Not Null ID', () => {
    test.each([
      [undefined, '5ea6062ea0697b9fd521502a'],
      ['idMember', '5612e4f91b25c15e873722b8'],
    ])('%p should be valid', (field, value) =>
      expect(() => validateNotNullId(value, field))
        .not.toThrow(ValidationError)
    )

    test.each([
      ['idMember', undefined],
      ['idMember', null],
      ['callbackUrl', true],
      ['callbackUrl', -6.7],
      ['callbackUrl', 'www.example.com'],
      ['callbackUrl', 'some-string'],
      ['callbackUrl', [1, 2, 3]],
      ['callbackUrl', {foo: 'bar'}]
    ])('%p should throw ValidationError', (field, value) =>
      expect(() => validateNotNullId(value, field))
        .toThrow(ValidationError)
    )
  })
})
