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

jest.mock('../../src/index')

describe('Organization repository tests', () => {

  const trello = new Trello()

  describe('Construction', () => {
    test('Should construct the object', () => {
      const repository = new TeamRepository(trello)

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

  describe('Create organization', () => {
    const repository = new TeamRepository(trello)

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
  })

  test.todo('Should create and organization and return the created object')
})
