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
import Organization from '../../src/domain/Organization'
import TeamEntity from '../../src/entities/TeamEntity'
import OrganizationRepository from '../../src/repositories/OrganizationRepository'
import TRELLO_ORGANIZATION from '../data/trello-team'

jest.mock('../../src/index')

describe('Organization repository tests', () => {

  const trello = new Trello()
  const repository = new OrganizationRepository(trello)

  describe('Construction', () => {
    test('Should construct the object', () => {
      expect(repository)
        .not.toBeNull()
      expect(repository)
        .toBeInstanceOf(OrganizationRepository)
    })

    test.each([
      undefined,
      null,
      {}
    ])('Should throw error on construction new OrganizationRepository(%p)', value =>
      expect(() => new OrganizationRepository(value))
        .toThrow(TypeError)
    )
  })

  describe('Create team', () => {
    test.each([
      {},
      {displayName: null},
      {displayName: '  '},
      {displayName: 'New team', desc: null, name: '  '},
      {displayName: 'New team', desc: null, name: 'Afeg34'},
      {displayName: 'New team', desc: null, name: null, website: 'example'},
      {displayName: 'New team', desc: null, name: null, website: 'www.example.com'},
      {displayName: 'New team', desc: null, name: null, website: 'example.com'},
      {displayName: 'New team', desc: null, name: null, website: '255.255.255.255'}
    ])('Should throw error on create(%p, %p, %p, %p)', async params =>
      expect(repository.create(params))
        .rejects.toThrow(TypeError)
    )

    test('Should create a team and return the created Organization object', async () => {
      trello.post = async (path, params) => ({
        ...TRELLO_ORGANIZATION,
        displayName: params.displayName,
        desc: params.desc,
        name: params.name,
        website: params.website
      })

      const team = await repository.create({
        displayName: 'New Organization',
        desc: 'An amazing team',
        name: 'new_team',
        website: 'https://www.example.com'
      })

      expect(team).toBeInstanceOf(TeamEntity)
      expect(team.displayName).toBe('New Organization')
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

      expect(team).toBeInstanceOf(Organization)
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
      trello.put.mockImplementation(async () => TRELLO_ORGANIZATION)

      const updatedEntity = await repository.update(new TeamEntity(TRELLO_ORGANIZATION, repository))

      expect(updatedEntity).toBeInstanceOf(TeamEntity)
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

  describe('Search teams', () => {
    test.each([
      undefined,
      null,
      '',
      '    ',
      {}
    ])('Should thrown a TypeError if query parameter is %p', async query =>
      expect(repository.search(query))
        .rejects.toThrow(TypeError)
    )

    test('Should search for teams', async () => {
      trello.get = async (path, params) => {
        if (path === '/search' && params.query === 'Trello'
            && params.modelTypes === 'organizations') {
          return [
            TRELLO_ORGANIZATION,
            {
              ...TRELLO_ORGANIZATION,
              id: '5e7cbcef4d185df6242c79e1',
              name: 'trelloinc_preprod',
              displayName: 'Trello Inc Preprod',
              url: 'https://trello.com/trelloinc1'
            }
          ]
        }
      }

      const teamsFound = await repository.search('Trello')

      expect(teamsFound).toBeInstanceOf(Array)
      expect(teamsFound.length).toBe(2)
      expect(teamsFound[0]).toEqual(new TeamEntity(TRELLO_ORGANIZATION, repository))
      expect(teamsFound[1]).toEqual(new TeamEntity({
        ...TRELLO_ORGANIZATION,
        id: '5e7cbcef4d185df6242c79e1',
        name: 'trelloinc_preprod',
        displayName: 'Trello Inc Preprod',
        url: 'https://trello.com/trelloinc1'
      }, repository))
    })
  })
})
