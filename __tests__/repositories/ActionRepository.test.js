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
import ActionRepository from '../../src/repositories/ActionRepository'
import TRELLO_ACTION from '../data/trello-action.json'
import ActionEntity from '../../src/entities/ActionEntity'

jest.mock('../../src/index')

describe('Action Repository', () => {

  const trello = new Trello()

  describe('Construction', () => {
    test('Should construct the object', () => {
      const repository = new ActionRepository(trello)
      expect(repository)
        .not.toBeNull()
      expect(repository)
        .toBeInstanceOf(ActionRepository)
    })

    test.each([
      undefined,
      null,
      123,
      {}
    ])('Should throw error on construction on new ActionRepository(%p)', value =>
      expect(() => new ActionRepository(value))
        .toThrow(TypeError)
    )
  })

  describe('Methods', () => {

    const repository = new ActionRepository(trello)

    describe('Find by id', () => {
      test('Should return an action', async () => {
        trello.get = async path => {
          if (path === '/actions/592f11060f95a3d3d46a987a') {
            return TRELLO_ACTION
          }
        }

        const action = await repository.findById('592f11060f95a3d3d46a987a')

        expect(action)
          .toBeInstanceOf(ActionEntity)
        expect(action.id)
          .toBe('592f11060f95a3d3d46a987a')
      })

      test('Should return an empty', async () => {
        trello.get = async path => {
          if (path === '/actions/592f11060f95a3d3d46a987a') {
            const error = new Error()
            error.isAxiosError = true
            error.response = {
              status: 404
            }
            return Promise.reject(error)
          }
        }

        await expect(repository.findById('592f11060f95a3d3d46a987a'))
          .resolves.toBeNull()
      })

      test('Should return an error', async () => {
        trello.get = async path => {
          if (path === '/actions/592f11060f95a3d3d46a987a') {
            const error = new Error()
            error.status = 500
            return Promise.reject(error)
          }
        }

        await expect(repository.findById('592f11060f95a3d3d46a987a'))
          .rejects.toThrow(Error)
      })
    })

    describe('Find display by id', () => {
      test('Should return an action display', async () => {
        trello.get = async path => {
          if (path === '/actions/592f11060f95a3d3d46a987a/display') {
            return TRELLO_ACTION.display
          }
        }

        const display = await repository.findDisplayById('592f11060f95a3d3d46a987a')

        expect(display)
          .toBeInstanceOf(Object)
        expect(display.translationKey)
          .toBe('action_changed_a_due_date')
      })

      test('Should return an empty', async () => {
        trello.get = async path => {
          if (path === '/actions/592f11060f95a3d3d46a987a/display') {
            const error = new Error()
            error.isAxiosError = true
            error.response = {
              status: 404
            }
            return Promise.reject(error)
          }
        }

        await expect(repository.findDisplayById('592f11060f95a3d3d46a987a'))
          .resolves.toBeNull()
      })

      test('Should return an error', async () => {
        trello.get = async path => {
          if (path === '/actions/592f11060f95a3d3d46a987a/display') {
            const error = new Error()
            error.status = 500
            return Promise.reject(error)
          }
        }

        await expect(repository.findDisplayById('592f11060f95a3d3d46a987a'))
          .rejects.toThrow(Error)
      })
    })
  })
})
