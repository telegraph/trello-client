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

import CONFIG from '../trello-simulator/config'
import Trello from '../../src/index'
import ActionEntity from '../../src/entities/ActionEntity'

describe('Action repository integration test', () => {
  const trelloService = new Trello(CONFIG.apiKey, CONFIG.apiToken, {
    baseUrl: `http://localhost:${CONFIG.port}`
  })
  const actionRepository = trelloService.actions

  describe('Get action', () => {
    test('Get an existing action', async () => {
      const action = await actionRepository.findById('592f11060f95a3d3d46a987a')
      expect(action)
        .toBeInstanceOf(ActionEntity)
      expect(action.id)
        .toBe('592f11060f95a3d3d46a987a')
    })

    test('Get an not existing action', () =>
      expect(actionRepository.findById('aa2f11060f95a3d3d4asdfsdfa'))
        .resolves.toBeNull()
    )
  })
})
