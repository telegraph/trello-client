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

import ActionRepository from '../../src/repositories/ActionRepository'
import ActionEntity from '../../src/entities/ActionEntity'
import TRELLO_ACTION from '../data/trello-action'

jest.mock('../../src/repositories/ActionRepository')

describe('Action entity', () => {
  const repository = new ActionRepository()

  describe('Constructor', () => {
    test('Should construct object', () => {
      const action = new ActionEntity(TRELLO_ACTION, repository)
      expect(action)
        .not.toBeNull()
      expect(action)
        .toBeInstanceOf(ActionEntity)
    })

    test.each([
      undefined,
      null,
      {},
      'abcd',
      123
    ])('Should thrown an error if repository parameter is %p', value =>
      expect(() => new ActionEntity(TRELLO_ACTION, value))
        .toThrow(TypeError)
    )
  })
})
