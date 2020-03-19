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

import TrelloService from '../../src/services/TrelloService'
import Organization from '../../src/domain/Organization'
import ORGANIZATION_FROM_TRELLO from '../data/trello-organization'

jest.mock('../../src/services/TrelloService')

describe('Organization domain object', () => {
  describe('Value operations', () => {
    test('Should create from an object', () => {
      const organization = new Organization(new TrelloService(), ORGANIZATION_FROM_TRELLO)

      expect(organization.getId()).toEqual(ORGANIZATION_FROM_TRELLO.id)
      expect(organization.getDesc()).toEqual(ORGANIZATION_FROM_TRELLO.desc)
    })

    test('Should thrown an error if trelloService is not set', () =>
      expect(() => new Organization(null, ORGANIZATION_FROM_TRELLO))
        .toThrow('trelloService and trelloObject parameters are mandatory')
    )

    test('Should thrown an error if trelloObject is not set', () =>
      expect(() => new Organization(new TrelloService()))
        .toThrow('trelloService and trelloObject parameters are mandatory')
    )

    test('Should convert to JSON', () => {
      const organization = new Organization(new TrelloService(), ORGANIZATION_FROM_TRELLO)
      expect(organization.toJSON())
        .toEqual(`{"id":"${ORGANIZATION_FROM_TRELLO.id}"}`)
    })
  })
})
