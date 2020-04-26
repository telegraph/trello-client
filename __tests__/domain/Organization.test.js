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

import Organization from '../../src/domain/Organization'
import TRELLO_ORGANIZATION from '../data/trello-team'

jest.mock('../../src/services/TrelloService')

describe('Organization domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const team = new Organization(TRELLO_ORGANIZATION)

      expect(team)
        .not.toBeNull()
      expect(team)
        .toBeInstanceOf(Organization)
      expect(team._trelloObject)
        .toEqual(TRELLO_ORGANIZATION)
      expect(team._trelloObject)
        .not.toBe(TRELLO_ORGANIZATION)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Organization(%p)', value =>
      expect(() => new Organization(value))
        .toThrow(TypeError)
    )
  })

  describe('Value operations', () => {
    let organization = null

    beforeEach(() => {
      organization = new Organization(TRELLO_ORGANIZATION)
    })

    test('Should return id', () =>
      expect(organization.id)
        .toBe(TRELLO_ORGANIZATION.id)
    )

    test('Should not set id', () =>
      expect(() => {
        organization.id = 'asdfasdfasdfasdf'
      })
        .toThrow()
    )

    test('Should return desc', () =>
      expect(organization.desc)
        .toBe(TRELLO_ORGANIZATION.desc)
    )

    test('Should set desc', () => {
      organization.desc = 'Updated desc'
      expect(organization.desc)
        .toBe('Updated desc')
    })

    test('Should return descData', () =>
      expect(organization.descData)
        .toBe(TRELLO_ORGANIZATION.descData)
    )

    test('Should not set descData', () =>
      expect(() => {
        organization.descData = {emoji: null}
      })
        .toThrow()
    )

    test('Should return displayName', () =>
      expect(organization.displayName)
        .toBe(TRELLO_ORGANIZATION.displayName)
    )

    test('Should set displayName', () => {
      organization.displayName = 'Updated displayName'
      expect(organization.displayName)
        .toBe('Updated displayName')
    })

    test('Should return name', () =>
      expect(organization.name)
        .toBe(TRELLO_ORGANIZATION.name)
    )

    test('Should set name', () => {
      organization.name = 'Updated name'
      expect(organization.name)
        .toBe('Updated name')
    })

    test('Should return prefs', () =>
      expect(organization.prefs)
        .toEqual(TRELLO_ORGANIZATION.prefs)
    )

    test('Should not set prefs', () =>
      expect(() => {
        organization.prefs = {}
      })
        .toThrow()
    )

    test('Should return url', () =>
      expect(organization.url)
        .toBe(TRELLO_ORGANIZATION.url)
    )

    test('Should not set url', () =>
      expect(() => {
        organization.url = 'https://trello.com/trello-inc'
      })
        .toThrow()
    )

    test('Should return website', () =>
      expect(organization.website)
        .toBe(TRELLO_ORGANIZATION.website)
    )

    test('Should set website', () => {
      organization.website = 'https://telegraph.co.uk'
      expect(organization.website)
        .toBe('https://telegraph.co.uk')
    })
  })

  describe('JSON conversion', () => {
    test('Should convert to JSON', () => {
      const organization = new Organization(TRELLO_ORGANIZATION)
      expect(organization.toJSON())
        .toEqual(JSON.stringify(TRELLO_ORGANIZATION))
    })
  })

  describe('Public methods', () => {
    let team = null

    beforeEach(() => {
      team = new Organization(TRELLO_ORGANIZATION)
    })

    test('Should return a copy of the underlying Trello object', () => {
      const trelloObject = team.getTrelloObject()

      expect(trelloObject)
        .toEqual(TRELLO_ORGANIZATION)
      expect(trelloObject)
        .not.toBe(team._trelloObject)
    })

    test('Should convert to JSON', () => {
      expect(team.toJSON())
        .toEqual(JSON.stringify(TRELLO_ORGANIZATION))
    })
  })
})
