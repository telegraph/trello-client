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
import TRELLO_BOARD from '../data/trello-board'

describe('Board domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const board = new Board(TRELLO_BOARD)

      expect(board)
        .not.toBeNull()
      expect(board)
        .toBeInstanceOf(Board)
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

  describe('Value operations', () => {
    let board = null

    beforeEach(() => {
      board = new Board(TRELLO_BOARD)
    })

    test('Should return id', () =>
      expect(board.id)
        .toBe(TRELLO_BOARD.id)
    )

    test('Should not set id', () =>
      expect(() => {
        board.id = 'asdfasdfasdfasdf'
      })
        .toThrow()
    )

    test('Should return name', () =>
      expect(board.name)
        .toBe(TRELLO_BOARD.name)
    )

    test('Should set name', () => {
      board.name = 'Updated name'
      expect(board.name)
        .toBe('Updated name')
    })

    test('Should return closed', () =>
      expect(board.closed)
        .toBe(TRELLO_BOARD.closed)
    )

    test('Should set closed', () => {
      board.closed = true
      expect(board.closed)
        .toBe(true)
    })

    test('Should return pinned', () =>
      expect(board.pinned)
        .toBe(TRELLO_BOARD.pinned)
    )

    test('Should set pinned', () => {
      board.pinned = true
      expect(board.pinned)
        .toBe(true)
    })

    test('Should return url', () =>
      expect(board.url)
        .toBe(TRELLO_BOARD.url)
    )

    test('Should return shortUrl', () =>
      expect(board.shortUrl)
        .toBe(TRELLO_BOARD.shortUrl)
    )
  })
})
