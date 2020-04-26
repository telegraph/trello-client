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
import BoardPreferences from '../../src/domain/BoardPreferences'
import TRELLO_BOARD from '../data/trello-board'
import {ValidationError} from '../../src/domain/validators/ValidationError'

describe('Board prefs class', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const preferences = new BoardPreferences(TRELLO_BOARD.prefs)

      expect(preferences)
        .not.toBeNull()
      expect(preferences)
        .toBeInstanceOf(BoardPreferences)
      expect(preferences._preferences)
        .toBe(TRELLO_BOARD.prefs)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new BoardPreferences(%p)', value =>
      expect(() => new BoardPreferences(value))
        .toThrow(TypeError)
    )
  })

  describe('Property operations', () => {
    let preferences = null

    beforeEach(() => {preferences = new BoardPreferences(_.cloneDeep(TRELLO_BOARD.prefs))})

    describe('Background', () => {
      test('Should return background', () =>
        expect(preferences.background)
          .toBe(TRELLO_BOARD.prefs.background)
      )

      test('Should set background', () => {
        preferences.background ='blue'

        expect(preferences.background)
          .toBe('blue')
      })
    })

    describe('Calendar feed enabled', () => {
      test('Should return if calendar feed is enabled', () =>
        expect(preferences.calendarFeedEnabled)
          .toBe(TRELLO_BOARD.prefs.calendarFeedEnabled)
      )

      test.each([
        null,
        undefined,
        true,
        false
      ])('Calendar feed enabled should be set to %p', value => {
        preferences.calendarFeedEnabled = value
        expect(preferences.calendarFeedEnabled)
          .toBe(value)
      })

      test.each([
        '  ',
        'any-value',
        {foo: 'bar'},
        ['list'],
        12345
      ])('calendarFeedEnabled = %p should throw ValidationError', value =>
        expect(() => {preferences.calendarFeedEnabled = value})
          .toThrow(ValidationError)
      )
    })

    describe('Card covers', () => {
      test('Should return card covers', () =>
        expect(preferences.cardCovers)
          .toBe(TRELLO_BOARD.prefs.cardCovers)
      )

      test('Should set card covers', () => {
        preferences.cardCovers = false

        expect(preferences.cardCovers)
          .toBe(false)
      })
    })

    describe('Card aging', () => {
      test('Should return card aging', () =>
        expect(preferences.cardAging)
          .toBe(TRELLO_BOARD.prefs.cardAging)
      )

      test.each([
        null,
        undefined,
        'pirate',
        'regular'
      ])('Card aging should be set to %p', value => {
        preferences.cardAging = value
        expect(preferences.cardAging)
          .toBe(value)
      })

      test.each([
        '  ',
        'any-value',
        {foo: 'bar'},
        ['list']
      ])('cardAging = %p should throw ValidationError', value =>
        expect(() => {preferences.cardAging = value})
          .toThrow(ValidationError)
      )
    })

    describe('Comments', () => {
      test('Should return comments', () =>
        expect(preferences.comments)
          .toBe(TRELLO_BOARD.prefs.comments)
      )

      test.each([
        'disabled',
        'members',
        'observers',
        'org',
        'public'
      ])('comments should be set to %p', value => {
        preferences.comments = value
        expect(preferences.comments)
          .toBe(value)
      })

      test.each([
        undefined,
        null,
        '  ',
        'any-value',
        {foo: 'bar'},
        ['list']
      ])('comments = %p should throw ValidationError', value =>
        expect(() => {preferences.comments = value})
          .toThrow(ValidationError)
      )
    })

    describe('Hide votes', () => {
      test('Should return hide votes', () =>
        expect(preferences.hideVotes)
          .toBe(TRELLO_BOARD.prefs.hideVotes)
      )

      test('Should set hide votes', () => {
        preferences.hideVotes = true

        expect(preferences.hideVotes)
          .toBe(true)
      })
    })

    describe('Invitations', () => {
      test('Should return invitations', () =>
        expect(preferences.invitations)
          .toBe(TRELLO_BOARD.prefs.invitations)
      )

      test.each([
        'admins',
        'members'
      ])('invitations should be set to %p', value => {
        preferences.invitations = value
        expect(preferences.invitations)
          .toBe(value)
      })

      test.each([
        undefined,
        null,
        '  ',
        'any-value',
        {foo: 'bar'},
        ['list']
      ])('invitations = %p should throw ValidationError', value =>
        expect(() => {preferences.invitations = value})
          .toThrow(ValidationError)
      )
    })

    describe('Permission level', () => {
      test('Should return permission level', () =>
        expect(preferences.permissionLevel)
          .toBe(TRELLO_BOARD.prefs.permissionLevel)
      )

      test.each([
        'org',
        'private',
        'public'
      ])('permissionLevel should be set to %p', value => {
        preferences.permissionLevel = value
        expect(preferences.permissionLevel)
          .toBe(value)
      })

      test.each([
        undefined,
        null,
        '  ',
        'any-value',
        {foo: 'bar'},
        ['list']
      ])('permissionLevel = %p should throw ValidationError', value =>
        expect(() => {preferences.permissionLevel = value})
          .toThrow(ValidationError)
      )
    })

    describe('Self join', () => {
      test('Should return self join', () =>
        expect(preferences.selfJoin)
          .toBe(TRELLO_BOARD.prefs.selfJoin)
      )

      test('Should set self join', () => {
        preferences.selfJoin = false

        expect(preferences.selfJoin)
          .toBe(false)
      })
    })

    describe('Voting', () => {
      test('Should return voting', () =>
        expect(preferences.voting)
          .toBe(TRELLO_BOARD.prefs.voting)
      )

      test.each([
        'disabled',
        'members',
        'observers',
        'org',
        'public'
      ])('voting should be set to %p', value => {
        preferences.voting = value
        expect(preferences.voting)
          .toBe(value)
      })

      test.each([
        undefined,
        null,
        '  ',
        'any-value',
        {foo: 'bar'},
        ['list']
      ])('voting = %p should throw ValidationError', value =>
        expect(() => {preferences.voting = value})
          .toThrow(ValidationError)
      )
    })
  })
})
