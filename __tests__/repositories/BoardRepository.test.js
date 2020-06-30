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

import Trello from '../../src'
import TRELLO_BOARD from '../data/trello-board.json'
import BoardRepository from '../../src/repositories/BoardRepository'
import BoardEntity from '../../src/entities/BoardEntity'

jest.mock('../../src/index')

describe('Board Repository', () => {

  const trello = new Trello()

  describe('Construction', () => {
    test('Should construct the object', () => {
      const repository = new BoardRepository(trello)
      expect(repository)
        .not.toBeNull()
      expect(repository)
        .toBeInstanceOf(BoardRepository)
    })

    test.each([
      undefined,
      null,
      123,
      {}
    ])('Should throw error on construction on new ActionRepository(%p)', value =>
      expect(() => new BoardRepository(value))
        .toThrow(TypeError)
    )
  })

  describe('Methods', () => {

    const repository = new BoardRepository(trello)

    describe('Find by id', () => {
      test('Should return an board', async () => {
        trello.get = async path => {
          if (path === '/boards/5612e4f91b25c15e873722b8') {
            return TRELLO_BOARD
          }
        }

        const action = await repository.findById('5612e4f91b25c15e873722b8')

        expect(action)
          .toBeInstanceOf(BoardEntity)
        expect(action.id)
          .toBe('5612e4f91b25c15e873722b8')
      })

      test('Should return an empty', async () => {
        trello.get = async path => {
          if (path === '/boards/5612e4f91b25c15e873722b8') {
            const error = new Error()
            error.isAxiosError = true
            error.response = {
              status: 404
            }
            return Promise.reject(error)
          }
        }

        await expect(repository.findById('5612e4f91b25c15e873722b8'))
          .resolves.toBeNull()
      })

      test('Should return an error', async () => {
        trello.get = async path => {
          if (path === '/boards/5612e4f91b25c15e873722b8') {
            const error = new Error()
            error.status = 500
            return Promise.reject(error)
          }
        }

        await expect(repository.findById('5612e4f91b25c15e873722b8'))
          .rejects.toThrow(Error)
      })
    })
  })
})
