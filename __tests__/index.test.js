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

import Trello from '../src/index'

const API_KEY = 'B7iAY9dP8fMrIVH8ZinJ6hp9qq4Zvl5Q1UJ9IO83v5DD27zvL8VIIFHlQsnTxB0v'
const API_TOKEN = 'dnW2scnIp5bsgjOBCHeXf9nVjIRjjzQT'

describe('Library main object wrapper tests', () => {
  describe('Construction', () => {
    test('Should set key and token in constructor', () => {
      const trelloService = new Trello(API_KEY, API_TOKEN)
      expect(trelloService._trelloService)
        .not.toBeNull()
    })

    test('Should throw an error if apiToken is not set', () =>
      expect(() => new Trello(API_KEY))
        .toThrow('apiKey and apiToken parameters are mandatory')
    )

    test('Should throw an error if apiKey is not set', () =>
      expect(() => new Trello(null, API_TOKEN))
        .toThrow('apiKey and apiToken parameters are mandatory')
    )
  })

  describe('Access to repositories', () => {
    test('Should return organization repository', () => {
      const trelloService = new Trello(API_KEY, API_TOKEN)
      expect(trelloService.organization)
        .not.toBeNull()
    })

    test('Should return lazy loaded organization repository', () => {
      const trelloService = new Trello(API_KEY, API_TOKEN)
      const organizationRepository = trelloService.organization
      expect(trelloService.organization)
        .toBe(organizationRepository)
    })
  })
})
