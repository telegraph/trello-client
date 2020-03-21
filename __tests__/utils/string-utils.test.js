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

import {isBlank} from '../../src/utils/string-utils'

describe('String utils tests', () => {
  describe('isBlank tests', () => {
    test('Should return true if the string is undefined', () =>
      expect(isBlank(undefined)).toBe(true)
    )

    test('Should return true if the string is null', () =>
      expect(isBlank(null)).toBe(true)
    )

    test('Should return true if the string is empty', () =>
      expect(isBlank('')).toBe(true)
    )

    test('Should return true if the string does contain only whitespaces', () =>
      expect(isBlank('    ')).toBe(true)
    )

    test('Should return false if the string contain text', () =>
      expect(isBlank('Some string ')).toBe(false)
    )
  })
})
