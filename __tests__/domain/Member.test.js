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

import Member from '../../src/domain/Member'
import TRELLO_MEMBER from '../data/trello-member.json'
import {ValidationError} from '../../src/domain/validators/ValidationError'

describe('Member domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const member = new Member(TRELLO_MEMBER)

      expect(member)
        .not.toBeNull()
      expect(member)
        .toBeInstanceOf(Member)
      expect(member._trelloObject)
        .toEqual(TRELLO_MEMBER)
      expect(member._trelloObject)
        .not.toBe(TRELLO_MEMBER)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Member(%p)', value =>
      expect(() => new Member(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let member = null

    beforeEach(() => {
      member = new Member(TRELLO_MEMBER)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(member.id)
          .toBe(TRELLO_MEMBER.id)
      )

      test('Should not set id', () =>
        expect(() => {
          member.id = '5e9dd8888f2c1f46aeb8eff3'
        })
          .toThrow(TypeError)
      )
    })

    describe('avatarHash', () => {
      test('Should return avatarHash', () =>
        expect(member.avatarHash)
          .toBe(TRELLO_MEMBER.avatarHash)
      )

      test('Should not set avatarHash', () =>
        expect(() => {
          member.avatarHash = '5e9dd8888f2c1f46aeb8eff3'
        })
          .toThrow(TypeError)
      )
    })

    describe('avatarUrl', () => {
      test('Should return avatarUrl', () =>
        expect(member.avatarUrl)
          .toBe(TRELLO_MEMBER.avatarUrl)
      )

      test('Should not set avatarUrl', () =>
        expect(() => {
          member.avatarUrl = 'https://trello.com/avatar-alt.png'
        })
          .toThrow(TypeError)
      )
    })

    describe('avatarSource', () => {
      test('Should return avatarSource', () =>
        expect(member.avatarSource)
          .toBe(TRELLO_MEMBER.avatarSource)
      )

      test.each([
        'gravatar',
        'upload'
      ])('Should set avatarSource to %p', value => {
        member.avatarSource = value
        expect(member.avatarSource)
          .toBe(value)
      })

      test.each([
        undefined,
        null,
        true,
        5,
        0,
        -6.7,
        'lorem-ipsum',
        [1, 2, 3],
        {foo: 'bar'}
      ])('Should not set avatarSource to %p', value =>
        expect(() => {
          member.avatarSource = value
        })
          .toThrow(ValidationError)
      )
    })
  })
})
