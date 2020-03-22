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

import Trello from '../../src/index'
import TeamRepository from '../../src/repositories/TeamRepository'
import Team from '../../src/domain/Team'
import TRELLO_ORGANIZATION from '../data/trello-organization'
import TeamEntity from '../../src/active-entities/TeamEntity'

jest.mock('../../src/index')

describe('Team repository tests', () => {

  const trello = new Trello()
  const repository = new TeamRepository(trello)

  describe('Construction', () => {
    test('Should construct the object', () => {
      expect(repository)
        .not.toBeNull()
      expect(repository)
        .toBeInstanceOf(TeamRepository)
    })

    test.each([
      undefined,
      null,
      {}
    ])('Should throw error on construction new TeamRepository(%p)', value =>
      expect(() => new TeamRepository(value))
        .toThrow(TypeError)
    )
  })

  describe('Create team', () => {
    test.each([
      [undefined, undefined, undefined, undefined],
      [null, undefined, undefined, undefined],
      ['  ', undefined, undefined, undefined],
      ['New team', null, '  ', undefined],
      ['New team', null, 'Afeg34', undefined],
      ['New team', null, null, 'example'],
      ['New team', null, null, 'www.example.com'],
      ['New team', null, null, 'example.com'],
      ['New team', null, null, '255.255.255.255']
    ])('Should throw error on create(%p, %p, %p, %p)', async (displayName, desc, name, website) =>
      expect(repository.create(displayName, desc, name, website))
        .rejects.toThrow(TypeError)
    )

    test('Should create a team and return the created Team object', async () => {
      trello.post = async (path, params) => ({
        ...TRELLO_ORGANIZATION,
        displayName: params.displayName,
        desc: params.desc,
        name: params.name,
        website: params.website
      })

      const team = await repository.create(
        'New Team',
        'An amazing team',
        'new_team',
        'https://www.example.com'
      )

      expect(team).toBeInstanceOf(TeamEntity)
      expect(team.displayName).toBe('New Team')
      expect(team.desc).toBe('An amazing team')
      expect(team.name).toBe('new_team')
      expect(team.website).toBe('https://www.example.com')
    })
  })

  describe('Find team by id', () => {
    test.each([
      undefined,
      null,
      '   '
    ])('Should thrown a TypeError if id parameter is %p', async id =>
      expect(repository.findById(id))
        .rejects.toThrow(TypeError)
    )

    test('Should find a team object', async () => {
      trello.get = async () => TRELLO_ORGANIZATION

      const team = await repository.findById('538627f73cbb44d1bfbb58f0')

      expect(team).toBeInstanceOf(Team)
      expect(team.id).toBe(TRELLO_ORGANIZATION.id)
    })
  })

  describe('Delete team by id', () => {
    test.each([
      undefined,
      null,
      '   '
    ])('Should thrown a TypeError if id parameter is %p', async id =>
      expect(repository.deleteById(id))
        .rejects.toThrow(TypeError)
    )

    test('Should delete a team', async () => {
      trello.delete.mockImplementation(async () => undefined)

      await expect(repository.deleteById('5e77400355e2796a9d28c5bd'))
        .resolves.not.toThrow()
      expect(trello.delete.mock.calls[0][0]).toBe('/organizations/5e77400355e2796a9d28c5bd')
    })
  })

  describe('Update team', () => {
    test.each([
      undefined,
      null,
      {}
    ])('Should thrown a TypeError if team parameter is %p', async team =>
      expect(repository.update(team))
        .rejects.toThrow(TypeError)
    )

    test('Should request team update', async () => {
      trello.put.mockImplementation(async () => new TeamEntity(TRELLO_ORGANIZATION, repository))

      const updatedEntity = await repository.update(new TeamEntity(TRELLO_ORGANIZATION, repository))

      expect(updatedEntity.id).toBe(TRELLO_ORGANIZATION.id)
      expect(updatedEntity.displayName).toBe(TRELLO_ORGANIZATION.displayName)
      expect(updatedEntity.desc).toBe(TRELLO_ORGANIZATION.desc)
      expect(updatedEntity.name).toBe(TRELLO_ORGANIZATION.name)
      expect(updatedEntity.website).toBe(TRELLO_ORGANIZATION.website)
      expect(trello.put.mock.calls[0])
        .toEqual([
          '/organizations/538627f73cbb44d1bfbb58f0',
          {
            displayName: 'Trello Inc',
            desc: 'Trello.',
            name: 'trelloinc',
            website: 'https://trello.com'
          }
        ])
    })
  })
})
