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

import TRELLO_TOKEN from '../data/trello-token.json'
import Token from '../../src/domain/Token'
import TokenPermission from '../../src/domain/TokenPermission'

describe('Token domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const token = new Token(TRELLO_TOKEN)

      expect(token)
        .not.toBeNull()
      expect(token)
        .toBeInstanceOf(Token)
      expect(token._trelloObject)
        .toEqual(TRELLO_TOKEN)
      expect(token._trelloObject)
        .not.toBe(TRELLO_TOKEN)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Token(%p)', value =>
      expect(() => new Token(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let token = null

    beforeEach(() => {
      token = new Token(TRELLO_TOKEN)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(token.id)
          .toBe(TRELLO_TOKEN.id)
      )

      test('Should not set id', () =>
        expect(() => {
          token.id = '5e9cd15927fe292238dd0389'
        })
          .toThrow(TypeError)
      )
    })

    describe('identifier', () => {
      test('Should return identifier', () =>
        expect(token.identifier)
          .toBe(TRELLO_TOKEN.identifier)
      )

      test('Should not set identifier', () =>
        expect(() => {
          token.identifier = 'A new server token'
        })
          .toThrow(TypeError)
      )
    })

    describe('memberId', () => {
      test('Should return memberId', () =>
        expect(token.memberId)
          .toBe(TRELLO_TOKEN.idMember)
      )

      test('Should not set memberId', () =>
        expect(() => {
          token.memberId = '5e9cd15927fe292238dd0389'
        })
          .toThrow(TypeError)
      )
    })

    describe('dateCreated', () => {
      test('Should return dateCreated', () =>
        expect(token.dateCreated)
          .toEqual(new Date(TRELLO_TOKEN.dateCreated))
      )

      test('Should not set dateCreated', () =>
        expect(() => {
          token.dateCreated = new Date.now()
        })
          .toThrow(TypeError)
      )
    })

    describe('dateExpires', () => {
      test('Should return dateExpires', () =>
        expect(token.dateExpires)
          .toEqual(new Date(TRELLO_TOKEN.dateExpires))
      )

      test('Should not set dateExpires', () =>
        expect(() => {
          token.dateExpires = new Date.now()
        })
          .toThrow(TypeError)
      )
    })

    describe('permissions', () => {
      test('Should return permissions', () => {
        expect(token.permissions)
          .toContainEqual(new TokenPermission(TRELLO_TOKEN.permissions[0]))
        expect(token.permissions)
          .toContainEqual(new TokenPermission(TRELLO_TOKEN.permissions[0]))
        expect(token.permissions)
          .toContainEqual(new TokenPermission(TRELLO_TOKEN.permissions[0]))
        expect(token.permissions.length)
          .toBe(3)
      })

      test('Should not set dateExpires', () =>
        expect(() => {
          token.permissions = [
            {
              idModel: '5919c0c0aa1ceafadc8c5df0',
              modelType: 'Member',
              read: true,
              write: true
            }
          ]
        })
          .toThrow(TypeError)
      )
    })
  })
})
