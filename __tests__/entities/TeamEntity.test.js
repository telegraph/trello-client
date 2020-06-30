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

import TeamEntity from '../../src/entities/TeamEntity'
import OrganizationRepository from '../../src/repositories/OrganizationRepository'
import ORGANIZATION_FROM_TRELLO from '../data/trello-team'

jest.mock('../../src/repositories/OrganizationRepository')

describe('Organization entity test', () => {
  const repository = new OrganizationRepository()

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

  describe('Save changes', () => {
    repository.update.mockImplementation(teamEntity => Promise.resolve(teamEntity._trelloObject))
    const organization = new TeamEntity(ORGANIZATION_FROM_TRELLO, repository)

    organization.displayName = 'Updated display name'
    organization.save()

    expect(organization.displayName)
      .toBe('Updated display name')
    expect(repository.update.mock.calls.length)
      .toBe(1)
    expect(repository.update.mock.calls[0])
      .toEqual([organization])
  })
})
