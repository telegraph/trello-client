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

import TRELLO_ACTION from '../data/trello-action'
import Action from '../../src/domain/Action'

describe('Action domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const action = new Action(TRELLO_ACTION)

      expect(action)
        .not.toBeNull()
      expect(action)
        .toBeInstanceOf(Action)
      expect(action._trelloObject)
        .toEqual(TRELLO_ACTION)
      expect(action._trelloObject)
        .not.toBe(TRELLO_ACTION)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Action(%p)', value =>
      expect(() => new Action(value))
        .toThrow(TypeError)
    )
  })

  describe('Value operations', () => {
    let action = null

    beforeEach(() => {
      action = new Action(TRELLO_ACTION)
    })

    test('Should return action id', () =>
      expect(action.id)
        .toBe('592f11060f95a3d3d46a987a')
    )

    test('Should not set id', () =>
      expect(() => {
        action.id = 'asdfasdfasdfasdf'
      })
        .toThrow(TypeError)
    )

    test('Should return a copy of the action data', () => {
      const data = action.data
      expect(data)
        .toEqual(TRELLO_ACTION.data)
      expect(data)
        .not.toBe(action._trelloObject.data)
    })

    test('Should not set action data', () =>
      expect(() => {
        action.data = {
          info: 'asdfasdfasdfasdf'
        }
      })
        .toThrow(TypeError)
    )

    test('Should return the action date', () =>
      expect(action.date)
        .toEqual(new Date(TRELLO_ACTION.date))
    )

    test('Should not set date', () =>
      expect(() => {
        action.date = new Date()
      })
        .toThrow(TypeError)
    )

    test('Should return the member creator id', () =>
      expect(action.memberIdCause)
        .toEqual(TRELLO_ACTION.idMemberCreator)
    )

    test('Should not set member creator id', () =>
      expect(() => {
        action.memberIdCause = '9834mnf9s8anaf89jsadf89'
      })
        .toThrow(TypeError)
    )

    test('Should return the action type', () =>
      expect(action.type)
        .toEqual(TRELLO_ACTION.type)
    )

    test('Should not set the action type', () =>
      expect(() => {
        action.type = 'someAction'
      })
        .toThrow(TypeError)
    )

    test('Should return a copy of the underlying Trello object', () => {
      const trelloObject = action.getTrelloObject()

      expect(trelloObject)
        .toEqual(TRELLO_ACTION)
      expect(trelloObject)
        .not.toBe(action._trelloObject)
    })
  })
})
