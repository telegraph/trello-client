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


import BoardLabelNames from '../../src/domain/BoardLabelNames'
import TRELLO_LABEL_NAMES from '../data/trello-label-names.json'

describe('Board Label Names domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const action = new BoardLabelNames(TRELLO_LABEL_NAMES)

      expect(action)
        .not.toBeNull()
      expect(action)
        .toBeInstanceOf(BoardLabelNames)
      expect(action._trelloObject)
        .toEqual(TRELLO_LABEL_NAMES)
      expect(action._trelloObject)
        .not.toBe(TRELLO_LABEL_NAMES)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Action(%p)', value =>
      expect(() => new BoardLabelNames(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let boardLabelNames = null

    beforeEach(() => {
      boardLabelNames = new BoardLabelNames(TRELLO_LABEL_NAMES)
    })

    describe('green', () => {
      test('Should set and return green label name', () => {
        boardLabelNames.green = 'green label'
        expect(boardLabelNames.green)
          .toBe('green label')
      })

      test('Should set green label as updated', () => {
        boardLabelNames.green = 'green label'
        expect(boardLabelNames.updatedFields)
          .toEqual(['green'])
      })
    })

    describe('yellow', () => {
      test('Should set and return yellow label name', () => {
        boardLabelNames.yellow = 'yellow label'
        expect(boardLabelNames.yellow)
          .toBe('yellow label')
      })

      test('Should set yellow label as updated', () => {
        boardLabelNames.yellow = 'yellow label'
        expect(boardLabelNames.updatedFields)
          .toEqual(['yellow'])
      })
    })

    describe('orange', () => {
      test('Should set and return orange label name', () => {
        boardLabelNames.orange = 'orange label'
        expect(boardLabelNames.orange)
          .toBe('orange label')
      })

      test('Should set orange label as updated', () => {
        boardLabelNames.orange = 'orange label'
        expect(boardLabelNames.updatedFields)
          .toEqual(['orange'])
      })
    })

    describe('red', () => {
      test('Should set and return red label name', () => {
        boardLabelNames.red = 'red label'
        expect(boardLabelNames.red)
          .toBe('red label')
      })

      test('Should set red label as updated', () => {
        boardLabelNames.red = 'red label'
        expect(boardLabelNames.updatedFields)
          .toEqual(['red'])
      })
    })

    describe('purple', () => {
      test('Should set and return purple label name', () => {
        boardLabelNames.purple = 'purple label'
        expect(boardLabelNames.purple)
          .toBe('purple label')
      })

      test('Should set purple label as updated', () => {
        boardLabelNames.purple = 'purple label'
        expect(boardLabelNames.updatedFields)
          .toEqual(['purple'])
      })
    })

    describe('blue', () => {
      test('Should set and return blue label name', () => {
        boardLabelNames.blue = 'blue label'
        expect(boardLabelNames.blue)
          .toBe('blue label')
      })

      test('Should set blue label as updated', () => {
        boardLabelNames.blue = 'blue label'
        expect(boardLabelNames.updatedFields)
          .toEqual(['blue'])
      })
    })

    describe('sky', () => {
      test('Should set and return sky label name', () => {
        boardLabelNames.sky = 'sky label'
        expect(boardLabelNames.sky)
          .toBe('sky label')
      })

      test('Should set sky label as updated', () => {
        boardLabelNames.sky = 'sky label'
        expect(boardLabelNames.updatedFields)
          .toEqual(['sky'])
      })
    })

    describe('lime', () => {
      test('Should set and return lime label name', () => {
        boardLabelNames.lime = 'lime label'
        expect(boardLabelNames.lime)
          .toBe('lime label')
      })

      test('Should set lime label as updated', () => {
        boardLabelNames.lime = 'lime label'
        expect(boardLabelNames.updatedFields)
          .toEqual(['lime'])
      })
    })

    describe('pink', () => {
      test('Should set and return pink label name', () => {
        boardLabelNames.pink = 'pink label'
        expect(boardLabelNames.pink)
          .toBe('pink label')
      })

      test('Should set pink label as updated', () => {
        boardLabelNames.pink = 'pink label'
        expect(boardLabelNames.updatedFields)
          .toEqual(['pink'])
      })
    })

    describe('black', () => {
      test('Should set and return black label name', () => {
        boardLabelNames.black = 'black label'
        expect(boardLabelNames.black)
          .toBe('black label')
      })

      test('Should set black label as updated', () => {
        boardLabelNames.black = 'black label'
        expect(boardLabelNames.updatedFields)
          .toEqual(['black'])
      })
    })
  })
})
