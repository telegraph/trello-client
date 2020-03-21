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

import {isBlank, isUrl} from '../../src/utils/string-utils'

describe('String utils', () => {
  describe('isBlank', () => {
    test.each([
      [undefined, true],
      [null, true],
      ['', true],
      ['   ', true],
      [' Some string ', false]
    ])('isBlank(%p) should return %p', (value, expected) =>
      expect(isBlank(value)).toBe(expected)
    )
  })

  describe('isUrl', () => {
    test.each([
      [undefined, false],
      [null, false],
      ['', false],
      ['   ', false],
      [{}, false],
      [[], false],
      ['https://www.example.com', true],
      ['http://www.example.com', true],
      ['www.example.com', false],
      ['example.com', false],
      ['http://blog.example.com', true],
      ['https://www.example.com/product', true],
      ['http://www.example.com/products?id=1&page=2', true],
      ['https://www.example.com#up', true],
      ['http://255.255.255.255', true],
      ['255.255.255.255', false],
      ['https://www.site.com:8008', true]
    ])('isUrl(%p) should return %p', (value, expected) =>
      expect(isUrl(value)).toBe(expected)
    )
  })
})
