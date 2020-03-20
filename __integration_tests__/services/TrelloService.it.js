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
import CONFIG from '../trello-simulator/config'

describe('Trello service integration test', () => {
  const trelloService = new TrelloService(CONFIG.apiKey, CONFIG.apiToken, `http://localhost:${CONFIG.port}`)

  describe('Get request', () => {
    test('Should process a get request', async () => {
      const created = await trelloService.post('/organizations', {
        displayName: 'Testing get request'
      })

      await expect(trelloService.get(`/organizations/${created.id}`))
        .resolves.toEqual(created)
    })
  })

  describe('Put request', () => {
    test('Should process a put request', async () => {
      const created = await trelloService.post('/organizations', {
        displayName: 'Testing request'
      })

      await expect(trelloService.put(`/organizations/${created.id}`, {
        displayName: 'Testing put request'
      })).resolves.toEqual({
        ...created,
        displayName: 'Testing put request'
      })
    })
  })

  describe('Delete request', () => {
    test('Should process a delete request', async () => {
      const created = await trelloService.post('/organizations', {
        displayName: 'Testing request'
      })

      await expect(trelloService.delete(`/organizations/${created.id}`))
        .resolves.not.toThrow()
    })
  })
})
