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

import TeamEntity from '../../src/active-entities/TeamEntity'
import TeamRepository from '../../src/repositories/TeamRepository'
import ORGANIZATION_FROM_TRELLO from '../data/trello-organization'

jest.mock('../../src/repositories/TeamRepository')

describe('Organization active entity test', () => {
  const repository = new TeamRepository()

  describe('Constructor', () => {
    test('Should construct object', () => {
      const organization = new TeamEntity(ORGANIZATION_FROM_TRELLO, repository)
      expect(organization)
        .not.toBeNull()
      expect(organization)
        .toBeInstanceOf(TeamEntity)
    })

    test('Should thrown an error if repository is not set', () =>
      expect(() => new TeamEntity(ORGANIZATION_FROM_TRELLO))
        .toThrow(TypeError)
    )

    test('Should thrown an error if repository is not a OrganizationRepository instance', () =>
      expect(() => new TeamEntity(ORGANIZATION_FROM_TRELLO, {}))
        .toThrow(TypeError)
    )
  })
})
