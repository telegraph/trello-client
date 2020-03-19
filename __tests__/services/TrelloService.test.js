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

const API_KEY = 'B7iAY9dP8fMrIVH8ZinJ6hp9qq4Zvl5Q1UJ9IO83v5DD27zvL8VIIFHlQsnTxB0v'
const API_TOKEN = 'dnW2scnIp5bsgjOBCHeXf9nVjIRjjzQT'

axios.get = (path, config) => {
  if (path === '/organizations/5e73c00ff23df0e7b81e5f3c') {
    return Promise.resolve({
      data: ORGANIZATION_FROM_TRELLO,
      status: 200,
      statusText: 'OK'
    })
  }
  throw new Error()
}

describe('Trello service tests', () => {
  describe('Construction', () => {
    test('Should set key and token in constructor', () => {
      const trelloService = new TrelloService(API_KEY, API_TOKEN)
      expect(trelloService)
        .not.toBeNull()
    })

    test('Should throw an error if apiToken is not set', () =>
      expect(() => new TrelloService(API_KEY))
        .toThrow('apiKey and apiToken parameters are mandatory')
    )

    test('Should throw an error if apiKey is not set', () =>
      expect(() => new TrelloService(null, API_TOKEN))
        .toThrow('apiKey and apiToken parameters are mandatory')
    )
  })

  describe('Rests', () => {
    test('Should do a get request', async () => {
      const trelloService = new TrelloService(API_KEY, API_TOKEN)
      await expect(trelloService.get('/organizations/5e73c00ff23df0e7b81e5f3c'))
        .resolves.toEqual(ORGANIZATION_FROM_TRELLO)
    })
  })
})
