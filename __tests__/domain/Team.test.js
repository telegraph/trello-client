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

import Team from '../../src/domain/Team'
import ORGANIZATION_FROM_TRELLO from '../data/trello-organization'

jest.mock('../../src/services/TrelloService')

describe('Team domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const organization = new Team(ORGANIZATION_FROM_TRELLO)

      expect(organization)
        .not.toBeNull()
      expect(organization)
        .toBeInstanceOf(Team)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Team(%p)', value =>
      expect(() => new Team(value))
        .toThrow(TypeError)
    )
  })

  describe('Value operations', () => {
    let organization = null

    beforeEach(() => organization = new Team(ORGANIZATION_FROM_TRELLO))

    test('Should return id', () =>
      expect(organization.id)
        .toBe(ORGANIZATION_FROM_TRELLO.id)
    )

    test('Should not set id', () =>
      expect(() => organization.id = 'asdfasdfasdfasdf')
        .toThrow()
    )

    test('Should return desc', () =>
      expect(organization.desc)
        .toBe(ORGANIZATION_FROM_TRELLO.desc)
    )

    test('Should set desc', () => {
      organization.desc = 'Updated desc'
      expect(organization.desc)
        .toBe('Updated desc')
    })

    test('Should return descData', () =>
      expect(organization.descData)
        .toBe(ORGANIZATION_FROM_TRELLO.descData)
    )

    test('Should not set descData', () =>
      expect(() => organization.descData = {emoji: null})
        .toThrow()
    )

    test('Should return displayName', () =>
      expect(organization.displayName)
        .toBe(ORGANIZATION_FROM_TRELLO.displayName)
    )

    test('Should set displayName', () => {
      organization.displayName = 'Updated displayName'
      expect(organization.displayName)
        .toBe('Updated displayName')
    })

    test('Should return idBoards', () =>
      expect(organization.idBoards)
        .toBe(ORGANIZATION_FROM_TRELLO.idBoards)
    )

    test('Should not set idBoards', () =>
      expect(() => organization.idBoards = ['5e7556184eef41173a927fc1'])
        .toThrow()
    )

    test('Should return name', () =>
      expect(organization.name)
        .toBe(ORGANIZATION_FROM_TRELLO.name)
    )

    test('Should set name', () => {
      organization.name = 'Updated name'
      expect(organization.name)
        .toBe('Updated name')
    })

    test('Should return prefs', () =>
      expect(organization.prefs)
        .toBe(ORGANIZATION_FROM_TRELLO.prefs)
    )

    test('Should not set prefs', () =>
      expect(() => organization.prefs = {})
        .toThrow()
    )

    test('Should return url', () =>
      expect(organization.url)
        .toBe(ORGANIZATION_FROM_TRELLO.url)
    )

    test('Should not set url', () =>
      expect(() => organization.url = 'https://trello.com/trello-inc')
        .toThrow()
    )

    test('Should return website', () =>
      expect(organization.website)
        .toBe(ORGANIZATION_FROM_TRELLO.website)
    )

    test('Should set website', () => {
      organization.website = 'https://telegraph.co.uk'
      expect(organization.website)
        .toBe('https://telegraph.co.uk')
    })
  })

  describe('JSON conversion', () => {
    test('Should convert to JSON', () => {
      const organization = new Team(ORGANIZATION_FROM_TRELLO)
      expect(organization.toJSON())
        .toEqual(JSON.stringify(ORGANIZATION_FROM_TRELLO))
    })
  })
})
