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

import TRELLO_TOKEN_PERMISSION from '../data/trello-token-permission.json'
import TokenPermission from '../../src/domain/TokenPermission'

describe('Webhook domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const tokenPermission = new TokenPermission(TRELLO_TOKEN_PERMISSION)

      expect(tokenPermission)
        .not.toBeNull()
      expect(tokenPermission)
        .toBeInstanceOf(TokenPermission)
      expect(tokenPermission._trelloObject)
        .toEqual(TRELLO_TOKEN_PERMISSION)
      expect(tokenPermission._trelloObject)
        .not.toBe(TRELLO_TOKEN_PERMISSION)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Webhook(%p)', value =>
      expect(() => new TokenPermission(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let tokenPermission = null

    beforeEach(() => {
      tokenPermission = new TokenPermission(TRELLO_TOKEN_PERMISSION)
    })

    describe('modelId', () => {
      test('Should return modelId', () =>
        expect(tokenPermission.modelId)
          .toBe(TRELLO_TOKEN_PERMISSION.idModel)
      )

      test('Should not set modelId', () =>
        expect(() => {
          tokenPermission.modelId = '5e9cd15927fe292238dd0389'
        })
          .toThrow(TypeError)
      )
    })

    describe('modelType', () => {
      test('Should return modelType', () =>
        expect(tokenPermission.modelType)
          .toBe(TRELLO_TOKEN_PERMISSION.modelType)
      )

      test('Should not set modelType', () =>
        expect(() => {
          tokenPermission.modelType = 'Board'
        })
          .toThrow(TypeError)
      )
    })

    describe('read', () => {
      test('Should return read', () =>
        expect(tokenPermission.read)
          .toBe(TRELLO_TOKEN_PERMISSION.read)
      )

      test('Should not set read', () =>
        expect(() => {
          tokenPermission.read = false
        })
          .toThrow(TypeError)
      )
    })

    describe('write', () => {
      test('Should return write', () =>
        expect(tokenPermission.write)
          .toBe(TRELLO_TOKEN_PERMISSION.write)
      )

      test('Should not set write', () =>
        expect(() => {
          tokenPermission.write = false
        })
          .toThrow(TypeError)
      )
    })
  })
})
