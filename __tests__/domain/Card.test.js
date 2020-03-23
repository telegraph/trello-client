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

import Card from '../../src/domain/Card'
import TRELLO_CARD from '../data/trello-card'

describe('Card domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const card = new Card(TRELLO_CARD)

      expect(card)
        .not.toBeNull()
      expect(card)
        .toBeInstanceOf(Card)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Card(%p)', value =>
      expect(() => new Card(value))
        .toThrow(TypeError)
    )
  })
})
