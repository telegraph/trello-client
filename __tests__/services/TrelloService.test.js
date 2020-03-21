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
import axios from 'axios'
import ORGANIZATION_FROM_TRELLO from '../data/trello-organization'

const API_KEY = 'dnW2scnIp5bsgjOBCHeXf9nVjIRjjzQT'
const API_TOKEN = 'B7iAY9dP8fMrIVH8ZinJ6hp9qq4Zvl5Q1UJ9IO83v5DD27zvL8VIIFHlQsnTxB0v'

describe('Trello service tests', () => {
  describe('Construction', () => {
    test('Should set key and token in constructor', () => {
      const trelloService = new TrelloService(API_KEY, API_TOKEN)
      expect(trelloService)
        .not.toBeNull()
    })

    test.each([
      [undefined, undefined],
      [null, undefined],
      [null, null],
      [API_KEY, undefined],
      [API_KEY, null],
      [null, API_TOKEN]
    ])('Should throw error on construction new TrelloService(%p)', (key, token) =>
      expect(() => new TrelloService(key, token))
        .toThrow(TypeError)
    )
  })

  describe('Rests', () => {
    const trelloService = new TrelloService(API_KEY, API_TOKEN)

    axios.get = (path) => {
      if (path === '/organizations/5e73c00ff23df0e7b81e5f3c') {
        return Promise.resolve({
          data: ORGANIZATION_FROM_TRELLO,
          status: 200,
          statusText: 'OK'
        })
      }
      throw new Error()
    }

    test('Should do a get request', async () =>
      await expect(trelloService.get('/organizations/5e73c00ff23df0e7b81e5f3c'))
        .resolves.toEqual(ORGANIZATION_FROM_TRELLO)
    )

    test('Should throw error if get request is rejected', async() =>
      await expect(trelloService.get('/organizations/5e73c00ff23df0e7'))
        .rejects.toThrow()
    )

    test('Should throw error if path in get request is not set', async() =>
      await expect(trelloService.get())
        .rejects.toThrow()
    )

    axios.put = (path, data, config) => {
      if (path === '/organizations/5e73c00ff23df0e7b81e5f3c'
          && config.params.displayName === 'Updated name'
          && config.params.desc === 'Updated description') {
        return Promise.resolve({
          data: ORGANIZATION_FROM_TRELLO,
          status: 200,
          statusText: 'OK'
        })
      }
      throw new Error()
    }

    test('Should do a put request', async () =>
      await expect(trelloService.put('/organizations/5e73c00ff23df0e7b81e5f3c', {
        displayName: 'Updated name',
        desc: 'Updated description'
      }))
        .resolves.toEqual(ORGANIZATION_FROM_TRELLO)
    )

    test('Should throw error if put request is rejected', async() =>
      await expect(trelloService.put('/organizations/5e73c00ff23df0e7'))
        .rejects.toThrow()
    )

    test('Should throw error if path is not set', async() =>
      await expect(trelloService.put())
        .rejects.toThrow(TypeError)
    )

    axios.post = (path, data, config) => {
      if (path === '/organizations/5e73c00ff23df0e7b81e5f3c'
        && config.params.displayName === 'Updated name'
        && config.params.desc === 'Updated description') {
        return Promise.resolve({
          data: ORGANIZATION_FROM_TRELLO,
          status: 201,
          statusText: 'OK'
        })
      }
      throw new Error()
    }

    test('Should do a post request', async () =>
      await expect(trelloService.post('/organizations/5e73c00ff23df0e7b81e5f3c', {
        displayName: 'Updated name',
        desc: 'Updated description'
      }))
        .resolves.toEqual(ORGANIZATION_FROM_TRELLO)
    )

    test('Should throw error if request is rejected', async() =>
      await expect(trelloService.post('/organizations/5e73c00ff23df0e7'))
        .rejects.toThrow()
    )

    test('Should throw error if path is not set', async() =>
      await expect(trelloService.post())
        .rejects.toThrow(TypeError)
    )

    axios.delete = (path) => {
      if (path === '/organizations/5e73c00ff23df0e7b81e5f3c') {
        return Promise.resolve({
          status: 200,
          statusText: 'OK'
        })
      }
      throw new Error()
    }

    test('Should do a delete request', async () =>
      await expect(trelloService.delete('/organizations/5e73c00ff23df0e7b81e5f3c'))
        .resolves.not.toThrow()
    )

    test('Should throw error if a delete request is rejected', async() =>
      await expect(trelloService.delete('/organizations/5e73c00ff23df0e7'))
        .rejects.toThrow()
    )

    test('Should throw error if path is not set', async() =>
      await expect(trelloService.delete())
        .rejects.toThrow(TypeError)
    )
  })
})
