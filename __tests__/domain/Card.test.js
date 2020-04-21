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
import Chance from 'chance'
import Coordinates from '../../src/domain/Coordinates'
import TRELLO_CARD from '../data/trello-card'
import {ValidationError} from '../../src/domain/validators/ValidationError'

const chance = new Chance()

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

  describe('Value operations', () => {
    let card = null

    beforeEach(() => {
      card = new Card(TRELLO_CARD)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(card.id)
          .toBe(TRELLO_CARD.id)
      )

      test('Should not set id', () =>
        expect(() => {
          card.id = 'asdfasdfasdfasdf'
        })
          .toThrow(TypeError)
      )
    })

    describe('badges', () => {
      test('Should return badges', () =>
        expect(card.badges)
          .toEqual(TRELLO_CARD.badges)
      )

      test('Should not set badges', () =>
        expect(() => {card.badges = {votes: 1}})
          .toThrow(TypeError)
      )
    })

    describe('closed', () => {
      test('Should return if is closed', () =>
        expect(card.closed)
          .toBe(TRELLO_CARD.closed)
      )

      test('Should set closed status', () => {
        card.closed = true
        expect(card.closed)
          .toBe(true)
      })

      test.each([
        null,
        undefined,
        '   ',
        [1, 2, 3],
        {foo: 'bar'}
      ])('closed = %p should throw and error', value => {
        expect(() => {
          card.closed = value
        })
          .toThrow(ValidationError)
      })
    })

    describe('dateLastActivity', () => {
      test('Should return last activity date', () =>
        expect(card.dateLastActivity)
          .toStrictEqual(new Date(TRELLO_CARD.dateLastActivity))
      )

      test('Should not set last activity date', () =>
        expect(() => {
          card.dateLastActivity = 'asdfasdfasdfasdf'
        })
          .toThrow(TypeError)
      )
    })

    describe('desc', () => {
      test('Should return desc', () =>
        expect(card.desc)
          .toBe(TRELLO_CARD.desc)
      )

      test('Should set desc', () => {
        card.desc = 'Card description'
        expect(card.desc)
          .toBe('Card description')
      })
    })

    describe('descData', () => {
      test('Should return a copy of description data', () => {
        expect(card.descData)
          .toEqual(TRELLO_CARD.descData)
      })

      test('Should not set description data', () =>
        expect(() => {
          card.descData = {
            emoji: null
          }
        })
          .toThrow(TypeError)
      )
    })

    describe('due', () => {
      test('Should return due date', () =>
        expect(card.due.toISOString())
          .toBe(TRELLO_CARD.due)
      )

      test('Should set due date', () => {
        const date = new Date('2019-06-26T17:39:49.583Z')

        card.due = date

        expect(card.due)
          .toStrictEqual(date)
      })
    })

    describe('dueComplete', () => {
      test('Should return if due is complete', () =>
        expect(card.dueComplete)
          .toBe(TRELLO_CARD.dueComplete)
      )

      test('Should set if due is complete', () => {
        card.dueComplete = true
        expect(card.dueComplete)
          .toBe(true)
      })

      test.each([
        null,
        undefined,
        '   ',
        [1, 2, 3],
        {foo: 'bar'}
      ])('dueComplete = %p should throw and error', value => {
        expect(() => {
          card.dueComplete = value
        })
          .toThrow(ValidationError)
      })
    })

    describe('attachmentCoverId', () => {
      test('Should return the cover image id', () =>
        expect(card.attachmentCoverId)
          .toBe(TRELLO_CARD.idAttachmentCover)
      )

      test.each([
        '5e8fa90cf4d83baaecb39b29',
        null
      ])('Should set attachmentCoverId to %p', value => {
        card.attachmentCoverId = value
        expect(card.attachmentCoverId)
          .toBe(value)
      })

      test.each([
        true,
        [1, 2, 3],
        {foo: 'bar'}
      ])('Setting attachmentCoverId to %p should throw and error', value => {
        expect(() => {
          card.attachmentCoverId = value
        })
          .toThrow(ValidationError)
      })
    })

    describe('boardId', () => {
      test('Should return the board id', () =>
        expect(card.boardId)
          .toBe(TRELLO_CARD.idBoard)
      )

      test('Should set the board id', () => {
        card.boardId = '5e8fab6fce0489b1d687ef4a'
        expect(card.boardId)
          .toBe('5e8fab6fce0489b1d687ef4a')
      })

      test.each([
        null,
        undefined,
        '   ',
        [1, 2, 3],
        {foo: 'bar'}
      ])('Setting boardId to %p should throw and error', value => {
        expect(() => {
          card.boardId = value
        })
          .toThrow(ValidationError)
      })
    })

    describe('checklistsId', () => {
      test('Should return checklists id', () =>
        expect(card.checklistsId)
          .toEqual(TRELLO_CARD.idChecklists)
      )

      test('Should not set checklists ids', () =>
        expect(() => {
          card.checklistsId = ['asdfasdfasdfasdf']
        })
          .toThrow(TypeError)
      )
    })

    describe('labelsId', () => {
      test('Should return the labelsId', () =>
        expect(card.labelsId)
          .toEqual(TRELLO_CARD.idLabels)
      )

      test.each([
        [['5e8fa90cf4d83baaecb39b29']],
        [[]]
      ])('Should set labelsId to %p', value => {
        card.labelsId = value
        expect(card.labelsId)
          .toEqual(value)
      })

      test.each([
        undefined,
        null,
        true,
        'sadfdksajalkfds',
        [1, 2, 3],
        {foo: 'bar'}
      ])('Setting labelsId to %p should throw and error', value => {
        expect(() => {
          card.labelsId = value
        })
          .toThrow(ValidationError)
      })
    })

    describe('listId', () => {
      test('Should return the list id', () =>
        expect(card.listId)
          .toBe(TRELLO_CARD.idList)
      )

      test('Should set the list id', () => {
        card.listId = '5e8fab6fce0489b1d687ef4a'
        expect(card.listId)
          .toBe('5e8fab6fce0489b1d687ef4a')
      })

      test.each([
        null,
        undefined,
        '   ',
        [1, 2, 3],
        {foo: 'bar'}
      ])('Setting listId to %p should throw and error', value => {
        expect(() => {
          card.listId = value
        })
          .toThrow(ValidationError)
      })
    })

    describe('membersId', () => {
      test('Should return members id', () =>
        expect(card.membersId)
          .toEqual(TRELLO_CARD.idMembers)
      )

      test('Should not set members ids', () =>
        expect(() => {
          card.membersId = ['asdfasdfasdfasdf']
        })
          .toThrow(TypeError)
      )
    })

    describe('membersVotedId', () => {
      test('Should return members voted ids', () =>
        expect(card.membersVotedId)
          .toEqual(TRELLO_CARD.idMembersVoted)
      )

      test('Should not set members voted ids', () =>
        expect(() => {
          card.membersVotedId = ['asdfasdfasdfasdf']
        })
          .toThrow(TypeError)
      )
    })

    describe('shortId', () => {
      test('Should return short id', () =>
        expect(card.shortId)
          .toEqual(TRELLO_CARD.idShort)
      )

      test('Should not set short id', () =>
        expect(() => {
          card.shortId = 12345
        })
          .toThrow(TypeError)
      )
    })

    describe('labels', () => {
      test('Should return labels', () =>
        expect(card.labels)
          .toEqual(TRELLO_CARD.labels)
      )

      test('Should not set labels', () =>
        expect(() => {
          card.labels = [
            {
              id: '560bf42919ad3a5dc29f33c5',
              idBoard: '560bf4298b3dda300c18d09c',
              name: 'Visited',
              color: 'green'
            }
          ]
        })
          .toThrow(TypeError)
      )
    })

    describe('isCoverImageManuallySelected', () => {
      test('Should return if is cover image manually selected', () =>
        expect(card.isCoverImageManuallySelected)
          .toEqual(TRELLO_CARD.manualCoverAttachment)
      )

      test('Should not set if is cover image manually selected', () =>
        expect(() => {
          card.isCoverImageManuallySelected = false
        })
          .toThrow(TypeError)
      )
    })

    describe('name', () => {
      test('Should return name', () =>
        expect(card.name)
          .toBe(TRELLO_CARD.name)
      )

      test('Should set name', () => {
        card.name = 'Updated name'
        expect(card.name)
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
        expect(() => {card.name = value})
          .toThrow(ValidationError)
      )
    })

    describe('position', () => {
      test('Should return position value', () =>
        expect(card.position)
          .toBe(TRELLO_CARD.pos)
      )

      test.each([
        'bottom',
        'top',
        0,
        100.67
      ])('Position should be set to %p', value => {
        card.position = value
        expect(card.position)
          .toBe(value)
      })

      test.each([
        undefined,
        null,
        true,
        -6.7,
        'sadfdksajalkfds',
        [1, 2, 3],
        {foo: 'bar'}
      ])('position = %p should throw ValidationError', value =>
        expect(() => {card.position = value})
          .toThrow(ValidationError)
      )
    })

    describe('shortLink', () => {
      test('Should return the short link', () =>
        expect(card.shortLink)
          .toEqual(TRELLO_CARD.shortLink)
      )

      test('Should not set short link', () =>
        expect(() => {
          card.shortLink = 'abNaRbv'
        })
          .toThrow(TypeError)
      )
    })

    describe('shortUrl', () => {
      test('Should return the short url', () =>
        expect(card.shortUrl)
          .toEqual(TRELLO_CARD.shortUrl)
      )

      test('Should not set short url', () =>
        expect(() => {
          card.shortUrl = 'https://trello.com/c/abNaRbv'
        })
          .toThrow(TypeError)
      )
    })

    describe('url', () => {
      test('Should return the url', () =>
        expect(card.url)
          .toEqual(TRELLO_CARD.url)
      )

      test('Should not set the url', () =>
        expect(() => {
          card.url = 'https://trello.com/c/abNaRbv/another-card'
        })
          .toThrow(TypeError)
      )
    })

    describe('address', () => {
      test('Should return the address', () =>
        expect(card.address)
          .toEqual(TRELLO_CARD.address)
      )

      test('Should not set the address', () =>
        expect(() => {
          card.address = '111 Buckingham Palace Road\\nLondon\\nSW1W 0DT\\nUnited Kingdom'
        })
          .toThrow(TypeError)
      )
    })

    describe('locationName', () => {
      test('Should return the location name', () =>
        expect(card.locationName)
          .toEqual(TRELLO_CARD.locationName)
      )

      test('Should not set the location name', () =>
        expect(() => {
          card.locationName = '111 Buckingham Palace Road\\nLondon\\nSW1W 0DT\\nUnited Kingdom'
        })
          .toThrow(TypeError)
      )
    })

    describe('coordinates', () => {
      test('Should return the coordinates', () => {
        const coordinates = card.coordinates
        expect(coordinates.latitude)
          .toBe(TRELLO_CARD.coordinates.latitude)
        expect(coordinates.longitude)
          .toBe(TRELLO_CARD.coordinates.longitude)
      })

      test('Should not set the coordinates', () =>
        expect(() => {
          card.coordinates = new Coordinates()
        })
          .toThrow(TypeError)
      )
    })
  })
})
