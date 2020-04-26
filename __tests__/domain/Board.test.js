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

import Board from '../../src/domain/Board'
import Chance from 'chance'
import {ValidationError} from '../../src/domain/validators/ValidationError'
import TRELLO_BOARD from '../data/trello-board'
import BoardPreferences from '../../src/domain/BoardPreferences'
import BoardLabelNames from '../../src/domain/BoardLabelNames'

const chance = new Chance()

describe('Board domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const board = new Board(TRELLO_BOARD)

      expect(board)
        .not.toBeNull()
      expect(board)
        .toBeInstanceOf(Board)
      expect(board._trelloObject)
        .toEqual(TRELLO_BOARD)
      expect(board._trelloObject)
        .not.toBe(TRELLO_BOARD)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Board(%p)', value =>
      expect(() => new Board(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let board = null

    beforeEach(() => {
      board = new Board(TRELLO_BOARD)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(board.id)
          .toBe(TRELLO_BOARD.id)
      )

      test('Should not set id', () =>
        expect(() => {
          board.id = 'asdfasdfasdfasdf'
        })
          .toThrow(TypeError)
      )
    })

    describe('name', () => {
      test('Should return name', () =>
        expect(board.name)
          .toBe(TRELLO_BOARD.name)
      )

      test('Should set name', () => {
        board.name = 'Updated name'
        expect(board.name)
          .toBe('Updated name')
      })

      test.each([
        undefined,
        null,
        '',
        '    ',
        12345,
        {foo: 'bar'},
        chance.string({length: 16385})
      ])('Set name to %p should throw ValidationError exception', value =>
        expect(() => {
          board.name = value
        })
          .toThrow(ValidationError)
      )

      test('Should set name as updated', () => {
        board.name = 'Updated name'
        expect(board.updatedFields)
          .toEqual(['name'])
      })
    })

    describe('description', () => {
      test('Should return description', () =>
        expect(board.desc)
          .toBe(TRELLO_BOARD.desc)
      )

      test('Should set description', () => {
        board.desc = 'My board updated description'
        expect(board.desc)
          .toBe('My board updated description')
      })

      test.each([
        12345,
        {foo: 'bar'},
        chance.string({length: 16385})
      ])('Set desc to %p should throw ValidationError exception', value =>
        expect(() => {
          board.desc = value
        })
          .toThrow(ValidationError)
      )

      test('Should set description as updated', () => {
        board.desc = 'Updated description'
        expect(board.updatedFields)
          .toEqual(['desc'])
      })
    })

    describe('desc data', () => {
      test('Should return a copy of description data', () => {
        expect(board.descData)
          .toEqual(TRELLO_BOARD.descData)
      })

      test('Should not set description data', () =>
        expect(() => {
          board.descData = {
            emoji: null
          }
        })
          .toThrow(TypeError)
      )
    })

    describe('closed', () => {
      test('Should return closed', () =>
        expect(board.closed)
          .toBe(TRELLO_BOARD.closed)
      )

      test('Should set closed', () => {
        board.closed = true
        expect(board.closed)
          .toBe(true)
      })

      test('Should set closed as updated', () => {
        board.closed = true
        expect(board.updatedFields)
          .toEqual(['closed'])
      })
    })

    describe('pinned', () => {
      test('Should return if board is pinned', () =>
        expect(board.pinned)
          .toBe(TRELLO_BOARD.pinned)
      )

      test('Should not set board as pinned', () =>
        expect(() => {
          board.pinned = true
        })
          .toThrow(TypeError)
      )
    })

    describe('idOrganization', () => {
      test('Should return organization/team id', () =>
        expect(board.idOrganization)
          .toBe(TRELLO_BOARD.idOrganization)
      )

      test('Should set organization/team id', () => {
        board.idOrganization = '5e7fadb275ce648231976006'
        expect(board.idOrganization)
          .toBe('5e7fadb275ce648231976006')
      })

      test('Should set organization/team id as updated', () => {
        board.idOrganization = '5e7fadb275ce648231976006'
        expect(board.updatedFields)
          .toEqual(['idOrganization'])
      })
    })

    describe('url', () => {
      test('Should return url', () =>
        expect(board.url)
          .toBe(TRELLO_BOARD.url)
      )

      test('Should not set url', () =>
        expect(() => {
          board.url = 'https://trello.com/board/test'
        })
          .toThrow(TypeError)
      )
    })

    describe('shortUrl', () => {
      test('Should return shortUrl', () =>
        expect(board.shortUrl)
          .toBe(TRELLO_BOARD.shortUrl)
      )

      test('Should not set shortUrl', () =>
        expect(() => {
          board.shortUrl = 'https://trello.com/45ftt'
        })
          .toThrow(TypeError)
      )
    })

    describe('prefs', () => {
      test('Should return prefs object', () =>
        expect(board.prefs)
          .toBeInstanceOf(BoardPreferences)
      )

      test('Should not set prefs object', () =>
        expect(() => {
          board.prefs = {
            some: 'prefs'
          }
        })
          .toThrow(TypeError)
      )
    })

    describe('labelNames', () => {
      test('Should return labelNames object', () =>
        expect(board.labelNames)
          .toBeInstanceOf(BoardLabelNames)
      )

      test('Should not set labelNames object', () =>
        expect(() => {
          board.labelNames = {
            some: 'prefs'
          }
        })
          .toThrow(TypeError)
      )
    })

    describe('limits', () => {
      test('Should return limits', () =>
        expect(board.limits)
          .toEqual(TRELLO_BOARD.limits)
      )

      test('Should not set limits', () =>
        expect(() => {
          board.limits = {
            boards: {
              totalMembersPerBoard: {
                status: 'ok',
                disableAt: 1520,
                warnAt: 1440
              }
            }
          }
        })
          .toThrow(TypeError)
      )
    })

    describe('memberships', () => {
      test('Should return memberships', () =>
        expect(board.memberships)
          .toEqual(TRELLO_BOARD.memberships)
      )

      test('Should not set memberships', () =>
        expect(() => {
          board.memberships = [
            {
              id: '5612e4fb1b25c15e8737234b',
              idMember: '53baf533e697a982248cd73f',
              memberType: 'admin',
              unconfirmed: false
            }
          ]
        })
          .toThrow(TypeError)
      )
    })

    describe('enterpriseOwned', () => {
      test('Should return enterpriseOwned', () =>
        expect(board.enterpriseOwned)
          .toBe(TRELLO_BOARD.enterpriseOwned)
      )

      test('Should not set enterpriseOwned', () =>
        expect(() => {
          board.enterpriseOwned = false
        })
          .toThrow(TypeError)
      )
    })
  })
})
