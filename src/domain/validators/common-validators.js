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

import _ from 'lodash'
import {isBlank, isUrl} from '../../utils/string-utils'
import ValidationError from './ValidationError'
import {isNegative} from '../../utils/number-utils'

export const POSITION_STRING_VALID_VALUES = ['bottom', 'top']
export const TRELLO_TEXT_MAX_LENGTH = 16384

/**
 * Validates that a field value is:
 *   - string
 *   - not null
 *   - not empty
 *   - not longer than trello maximum text field length
 * @param {string} fieldName
 * @param {*} value
 * @throws {ValidationError} If value is not valid
 */
export function validateNotBlankTextField(fieldName, value) {
  if (!_.isString(value) || isBlank(value)) {
    throw new ValidationError(
      `${fieldName} must be a not empty string. Parameter value is '${value}'`
    )
  }

  if (value.length > TRELLO_TEXT_MAX_LENGTH) {
    throw new ValidationError(
      `${fieldName} must be shorter than ${TRELLO_TEXT_MAX_LENGTH} characters. Parameter value length is ${value.length}`
    )
  }
}

/**
 * Validates that a field value is:
 *   - null
 *   - not empty string
 *   - not longer than trello maximum text field length
 * @param {string} fieldName
 * @param {*} value
 * @throws {ValidationError} If value is not valid
 */
export function validateNullableNotBlankTextField(fieldName, value) {
  if (_.isNil(value)) {
    return
  }

  if (!_.isString(value)) {
    throw new ValidationError(
      `${fieldName} must be a string. Parameter value is '${value}'`
    )
  }

  if (isBlank(value)) {
    throw new ValidationError(
      `${fieldName} must be a not empty string. Parameter value is '${value}'`
    )
  }

  if (value.length > TRELLO_TEXT_MAX_LENGTH) {
    throw new ValidationError(
      `${fieldName} must be shorter than ${TRELLO_TEXT_MAX_LENGTH} characters. Parameter value length is ${value.length}`
    )
  }
}

/**
 * Validates that a field value is:
 *   - string
 *   - not longer than trello maximum text field length
 * @param {string} fieldName
 * @param {*} value
 * @throws {ValidationError} If value is not valid
 */
export function validateNullableTextField(fieldName, value) {
  if (_.isNil(value)) {
    return
  }

  if (!_.isString(value)) {
    throw new ValidationError(
      `${fieldName} must be a string. Parameter value is '${value}'`
    )
  }

  if (value.length > TRELLO_TEXT_MAX_LENGTH) {
    throw new ValidationError(
      `${fieldName} must be shorter than ${TRELLO_TEXT_MAX_LENGTH} characters. Parameter value length is ${value.length}`
    )
  }
}

/**
 * Validates that a field value is:
 *   - boolean
 *   - not null
 * @param {!string} fieldName
 * @param {*} value
 * @throws {ValidationError} If value is not valid.
 */
export function validateNotNullBooleanField(fieldName, value) {
  if (_.isNil(value) || !_.isBoolean(value)) {
    throw new ValidationError(
      `${fieldName} must be a not null boolean. Parameter value is '${value}'`
    )
  }
}

/**
 * Validates that a field value is:
 *   - boolean
 *   - null
 *   - undefined
 * @param {!string} fieldName
 * @param {*} value
 * @throws {ValidationError} If value is not valid.
 */
export function validateNullableBooleanField(fieldName, value) {
  if (!_.isNil(value) && !_.isBoolean(value)) {
    throw new ValidationError(
      `${fieldName} must be a boolean. Parameter value is '${value}'`
    )
  }
}

/**
 * Validates that a field value is:
 *   - number
 *   - not null
 * @param {!string} fieldName
 * @param {*} value
 * @throws {ValidationError} If value is not valid.
 */
export function validateNotNullNumberField(fieldName, value) {
  if (_.isNil(value) || !_.isNumber(value)) {
    throw new ValidationError(
      `${fieldName} must be a not null number. Parameter value is '${value}'`
    )
  }
}

/**
 * Validates that a field value is:
 *   - not null
 *   - valid url
 * @param {!string} fieldName
 * @param {*} value
 * @throws {ValidationError} If value is not valid.
 */
export function validateNotNullUrlField(fieldName, value) {
  validateNotBlankTextField(fieldName, value)

  if (!isUrl(value)) {
    throw new ValidationError(
      `${fieldName} must be a valid URL. Parameter value is '${value}'`
    )
  }
}

/**
 * Validates that a field value is:
 *   - not null
 *   - string
 *   - One of options list
 * @param {!string} fieldName
 * @param {!string[]} options
 * @param {*} value
 * @throws {ValidationError} If value is not valid.
 */
export function validateNotNullStringOptionField(fieldName, options, value) {
  validateNotBlankTextField(fieldName, value)

  if (!options.includes(value)) {
    throw new ValidationError(`${fieldName} value must be ${options.join(', ')}, value entered: ${value}`)
  }
}

/**
 * Validates that a field value is:
 *   - null
 *   - One of options list
 * @param {!string} fieldName
 * @param {!string[]} options
 * @param {*} value
 * @throws {ValidationError} If value is not valid.
 */
export function validateNullableStringOptionField(fieldName, options, value) {
  if (!(_.isNil(value) || _.isString(value) && options.includes(value))) {
    throw new ValidationError(`${fieldName} value must be ${options.join(', ')}, value entered: ${value}`)
  }
}

/**
 * Validates that a field value is:
 *   - not null
 *   - Array of strings
 * @param {!string} fieldName
 * @param {*} value
 */
export function validateNotNullArrayOfStrings(fieldName, value) {
  if (_.isNil(value) || !_.isArray(value)) {
    throw new ValidationError(`${fieldName} must be a not null array of strings`)
  }

  value.forEach(item => {
    if (!_.isString(item)) {
      throw new ValidationError(`${fieldName} must be an array of strings`)
    }
  })
}

/**
 * Validates a position field value, it should be:
 *   - not null
 *   - 'top', 'bottom' or a positive float
 * @param {!string} fieldName
 * @param {*} value
 * @throws {ValidationError}
 */
export function validatePosition(fieldName, value) {
  if (_.isNil(value) || !(_.isString(value) ^ _.isNumber(value))) {
    throw new ValidationError(`${fieldName} must be a not null string or positive float: ${value}`)
  }

  if (_.isString(value) && !POSITION_STRING_VALID_VALUES.includes(value)) {
    throw new ValidationError(`${fieldName} string must be "bottom" or "top": ${value}`)
  }

  if (_.isNumber(value) && isNegative(value)) {
    throw new ValidationError(`${fieldName} string must be a positive float: ${value}`)
  }
}

/**
 * Validates a id value, it should be:
 *   - not null
 *   - valid id
 * @param {*} value
 * @param {!string} fieldName
 * @throws {ValidationError}
 */
export function validateNotNullId(value, fieldName = 'id') {
  if (_.isNil(value) || !_.isString(value)) {
    throw new ValidationError(`${fieldName} must be a not null id string: ${value}`)
  }

  if (_.isNil(value.match(/^[0-9a-fA-F]{24}$/))) {
    throw new ValidationError(`${fieldName} must be a valid id: ${value}`)
  }

  return true
}
