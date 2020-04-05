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
import {isBlank} from '../../utils/string-utils'
import {ValidationError} from './ValidationError'

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
