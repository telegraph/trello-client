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
})
