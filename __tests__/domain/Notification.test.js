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

import Notification from '../../src/domain/Notification'
import TRELLO_NOTIFICATION from '../data/trello-notification.json'

describe('Notification domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const notification = new Notification(TRELLO_NOTIFICATION)

      expect(notification)
        .not.toBeNull()
      expect(notification)
        .toBeInstanceOf(Notification)
      expect(notification._trelloObject)
        .toEqual(TRELLO_NOTIFICATION)
      expect(notification._trelloObject)
        .not.toBe(TRELLO_NOTIFICATION)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Notification(%p)', value =>
      expect(() => new Notification(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let notification = null

    beforeEach(() => {
      notification = new Notification(TRELLO_NOTIFICATION)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(notification.id)
          .toBe(TRELLO_NOTIFICATION.id)
      )

      test('Should not set id', () =>
        expect(() => {
          notification.id = '5e9dd8888f2c1f46aeb8eff3'
        })
          .toThrow(TypeError)
      )
    })

    describe('data', () => {
      test('Should return data', () => {
        expect(notification.data)
          .toEqual(TRELLO_NOTIFICATION.data)
        expect(notification.data)
          .not.toBe(TRELLO_NOTIFICATION.data)
      })

      test('Should not set data', () =>
        expect(() => {
          notification.data = {
            data: {
              memberType: 'normal',
              idMember: '5e9e46acb74540dc75d9004a',
              board: {
                shortLink: 'tBhYPSYe',
                name: 'US National Parks',
                id: '5e9e46b8e4ba144186c28431'
              }
            }
          }
        })
          .toThrow(TypeError)
      )
    })
  })
})
