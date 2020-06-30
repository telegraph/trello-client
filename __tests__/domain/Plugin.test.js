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

import Plugin from '../../src/domain/Plugin'
import TRELLO_PLUGIN from '../data/trello-plugin.json'

describe('Plugin domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const plugin = new Plugin(TRELLO_PLUGIN)

      expect(plugin)
        .not.toBeNull()
      expect(plugin)
        .toBeInstanceOf(Plugin)
      expect(plugin._trelloObject)
        .toEqual(TRELLO_PLUGIN)
      expect(plugin._trelloObject)
        .not.toBe(TRELLO_PLUGIN)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Plugin(%p)', value =>
      expect(() => new Plugin(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let plugin = null

    beforeEach(() => {
      plugin = new Plugin(TRELLO_PLUGIN)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(plugin.id)
          .toBe(TRELLO_PLUGIN.id)
      )

      test('Should not set id', () =>
        expect(() => {
          plugin.id = 'asdfasdfasdfasdf'
        })
          .toThrow(TypeError)
      )
    })

    describe('idBoard', () => {
      test('Should return idBoard', () =>
        expect(plugin.idBoard)
          .toBe(TRELLO_PLUGIN.idBoard)
      )

      test('Should not set idBoard', () =>
        expect(() => {
          plugin.idBoard = 'asdfasdfasdfasdf'
        })
          .toThrow(TypeError)
      )
    })

    describe('idPlugin', () => {
      test('Should return idPlugin', () =>
        expect(plugin.idPlugin)
          .toBe(TRELLO_PLUGIN.idPlugin)
      )

      test('Should not set idPlugin', () =>
        expect(() => {
          plugin.idPlugin = 'asdfasdfasdfasdf'
        })
          .toThrow(TypeError)
      )
    })
  })
})
