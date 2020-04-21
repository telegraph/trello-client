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

import Webhook from '../../src/domain/Webhook'
import TRELLO_WEBHOOK from '../data/trello-webhook.json'
import {ValidationError} from '../../src/domain/validators/ValidationError'

describe('Webhook domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const webhook = new Webhook(TRELLO_WEBHOOK)

      expect(webhook)
        .not.toBeNull()
      expect(webhook)
        .toBeInstanceOf(Webhook)
      expect(webhook._trelloObject)
        .toEqual(TRELLO_WEBHOOK)
      expect(webhook._trelloObject)
        .not.toBe(TRELLO_WEBHOOK)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Webhook(%p)', value =>
      expect(() => new Webhook(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let webhook = null

    beforeEach(() => {
      webhook = new Webhook(TRELLO_WEBHOOK)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(webhook.id)
          .toBe(TRELLO_WEBHOOK.id)
      )

      test('Should not set id', () =>
        expect(() => {
          webhook.id = '5e9cd15927fe292238dd0389'
        })
          .toThrow(TypeError)
      )
    })

    describe('description', () => {
      test('Should return description', () =>
        expect(webhook.description)
          .toBe(TRELLO_WEBHOOK.description)
      )

      test('Should set description', () => {
        webhook.description = 'Webhook description'
        expect(webhook.description)
          .toBe('Webhook description')
      })

      test.each([
        undefined,
        null,
        '',
        '   ',
        'Webhook description'
      ])('Should set description to %p', value => {
        webhook.description = value
        expect(webhook.description)
          .toBe(value)
      })

      test.each([
        true,
        [1, 2, 3],
        {foo: 'bar'}
      ])('description = %p should throw ValidationError', value =>
        expect(() => {webhook.description = value})
          .toThrow(ValidationError)
      )
    })

    describe('modelId', () => {
      test('Should return model id', () =>
        expect(webhook.modelId)
          .toBe(TRELLO_WEBHOOK.idModel)
      )

      test('Should set modelId', () => {
        webhook.modelId = '5e9cd47255a9bc6cc9cfa03f'
        expect(webhook.modelId)
          .toBe('5e9cd47255a9bc6cc9cfa03f')
      })

      test.each([
        null,
        undefined,
        '',
        '    ',
        3455,
        true,
        [1, 2, 3],
        {foo: 'bar'}
      ])('modelId = %p should throw ValidationError', value =>
        expect(() => {webhook.modelId = value})
          .toThrow(ValidationError)
      )
    })

    describe('callbackUrl', () => {
      test('Should return callbackUrl', () =>
        expect(webhook.callbackUrl)
          .toBe(TRELLO_WEBHOOK.callbackURL)
      )

      test('Should set callbackUrl', () => {
        webhook.callbackUrl = 'https://www.telegraph.co.uk/trello'
        expect(webhook.callbackUrl)
          .toBe('https://www.telegraph.co.uk/trello')
      })

      test.each([
        null,
        undefined,
        '',
        '    ',
        'www.example.com',
        3455,
        true,
        [1, 2, 3],
        {foo: 'bar'}
      ])('callbackUrl = %p should throw ValidationError', value =>
        expect(() => {webhook.callbackUrl = value})
          .toThrow(ValidationError)
      )
    })

    describe('active', () => {
      test('Should return active status', () =>
        expect(webhook.description)
          .toBe(TRELLO_WEBHOOK.description)
      )

      test.each([
        true,
        false
      ])('Should set active to %p', value => {
        webhook.active = value
        expect(webhook.active)
          .toBe(value)
      })

      test.each([
        null,
        undefined,
        'kk',
        35,
        [1, 2, 3],
        {foo: 'bar'}
      ])('active = %p should throw ValidationError', value =>
        expect(() => {webhook.active = value})
          .toThrow(ValidationError)
      )
    })
  })
})
