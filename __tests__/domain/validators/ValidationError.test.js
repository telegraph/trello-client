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

import {ValidationError} from '../../../src/domain/validators/ValidationError'

describe('ValidationError exception', () => {
  test('Should set name and message', () => {
    try {
      throw new ValidationError('Validation error message')
    } catch (validationError) {
      expect(validationError)
        .toHaveProperty('name', 'ValidationError')
      expect(validationError)
        .toHaveProperty('message', 'Validation error message')
    }
  })

  test('Should identify error type', () => {
    try {
      throw new ValidationError('Validation error message')
    } catch (validationError) {
      expect(validationError instanceof ValidationError)
        .toBe(true)
    }
  })
})
