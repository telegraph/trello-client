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

import Coordinates from '../../src/domain/Coordinates'
import {ValidationError} from '../../src/domain/validators/ValidationError'

describe('Spatial coordinates', () => {
  describe('Constructor', () => {
    test('Should set latitude and longitude as 0 by default', () => {
      const coordinates = new Coordinates()
      expect(coordinates.latitude)
        .toBe(0)
      expect(coordinates.longitude)
        .toBe(0)
    })

    test('Should set latitude and longitude', () => {
      const coordinates = new Coordinates(12.5, 80.65)
      expect(coordinates.latitude)
        .toBe(12.5)
      expect(coordinates.longitude)
        .toBe(80.65)
    })
  })

  describe('Properties', () => {
    let coordinates = null

    beforeEach(() => {
      coordinates = new Coordinates()
    })

    describe('latitude', () => {
      test.each([
        undefined,
        null,
        '',
        'Some text',
        true,
        {foo: 'bar'},
        [1, 2, 6]
      ])('latitude = %p should throw ValidationError exception', value =>
        expect(() => {coordinates.latitude = value})
          .toThrow(ValidationError)
      )

      test.each([
        -57,
        0,
        12.5
      ])('latitude should be set to %p', value => {
        coordinates.latitude = value
        expect(coordinates.latitude)
          .toBe(value)
      })
    })

    describe('longitude', () => {
      test.each([
        undefined,
        null,
        '',
        'Some text',
        true,
        {foo: 'bar'},
        [1, 2, 6]
      ])('longitude = %p should throw ValidationError exception', value =>
        expect(() => {coordinates.longitude = value})
          .toThrow(ValidationError)
      )

      test.each([
        -57,
        0,
        12.5
      ])('latitude should be set to %p', value => {
        coordinates.longitude = value
        expect(coordinates.longitude)
          .toBe(value)
      })
    })
  })
})
