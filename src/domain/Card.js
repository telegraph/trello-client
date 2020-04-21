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

import _ from 'lodash'
import {
  validateNotBlankTextField, validateNotNullArrayOfStrings,
  validateNotNullBooleanField,
  validateNullableTextField, validatePosition
} from './validators/common-validators'
import Coordinates from './Coordinates'

const DEFAULT_COORDINATE = 0

/**
 * Lists in Trello contain cards. A card belongs to exactly one list.
 */
export default class Card {

  /**
   * Card constructor.
   * @param {!Object} trelloCardObject Trello API card object.
   */
  constructor(trelloCardObject) {
    if (_.isNil(trelloCardObject) || !_.isObject(trelloCardObject)) {
      throw new TypeError('trelloCardObject parameter must be a not null object')
    }
    this._trelloObject = trelloCardObject
  }

  /**
   * Returns the ID of the card.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Pieces of information about the card that are displayed on the front of the card.
   * @type {Object}
   */
  get badges() {
    return _.cloneDeep(this._trelloObject.badges)
  }

  /**
   * Whether the card is closed (archived).
   * @type {boolean}
   */
  get closed() {
    return this._trelloObject.closed
  }

  /**
   * Sets whether the card is closed (archived).
   * @type {boolean}
   */
  set closed(closed) {
    validateNotNullBooleanField('closed', closed)
    this._trelloObject.closed = closed
  }

  /**
   * Returns the datetime of the last activity on the card.
   * @type {Date}
   */
  get dateLastActivity() {
    return new Date(this._trelloObject.dateLastActivity)
  }

  /**
   * Returns the description for the card.
   * @type {string}
   */
  get desc() {
    return this._trelloObject.desc
  }

  /**
   * Sets description for the card.
   * @type {string}
   */
  set desc(desc) {
    this._trelloObject.desc = desc
  }

  /**
   * Description custom emoji.
   * @type {Object}
   */
  get descData() {
    return this._trelloObject.descData
  }

  /**
   * Returns the due date of the card.
   * @type {Date}
   */
  get due() {
    return _.isNil(this._trelloObject.due)
      ? null : new Date(this._trelloObject.due)
  }

  /**
   * Sets the due date of the card.
   * @type {Date}
   */
  set due(due) {
    this._trelloObject.due = _.isNil(due)
      ? null : due.toISOString()
  }

  /**
   * Whether the due date has been marked complete
   * @type {boolean}
   */
  get dueComplete() {
    return this._trelloObject.dueComplete
  }

  /**
   * Marks the due date as complete
   * @type {boolean}
   */
  set dueComplete(dueComplete) {
    validateNotNullBooleanField('dueComplete', dueComplete)
    this._trelloObject.dueComplete = dueComplete
  }

  /**
   * The id of the attachment selected as the cover image
   * @type {string}
   */
  get attachmentCoverId() {
    return this._trelloObject.idAttachmentCover
  }

  /**
   * Sets the id of the attachment selected as the cover image
   * @type {string}
   */
  set attachmentCoverId(attachmentCoverId) {
    validateNullableTextField('attachmentCoverId', attachmentCoverId)
    this._trelloObject.idAttachmentCover = attachmentCoverId
  }

  /**
   * The ID of the board the card is on
   * @type {!string}
   */
  get boardId() {
    return this._trelloObject.idBoard
  }

  /**
   * Sets the ID of the board the card is on
   * @type {!string}
   */
  set boardId(boardId) {
    validateNotBlankTextField('boardId', boardId)
    this._trelloObject.idBoard = boardId
  }

  /**
   * An array of checklist IDs that are on this card.
   * @type {string[]}
   */
  get checklistsId() {
    return [...this._trelloObject.idChecklists]
  }

  /**
   * An array of label IDs that are on this card.
   * @type {string[]}
   */
  get labelsId() {
    return [...this._trelloObject.idLabels]
  }

  /**
   * An array of label IDs to set on this card.
   * @type {string[]}
   */
  set labelsId(labelsId) {
    validateNotNullArrayOfStrings('labelsId', labelsId)
    this._trelloObject.idLabels = [...labelsId]
  }

  /**
   * The ID of the list the card is in.
   * @type {string}
   */
  get listId() {
    return this._trelloObject.idList
  }

  /**
   * Sets the ID of the list the card is in.
   * @type {string}
   */
  set listId(listId) {
    validateNotBlankTextField('listId', listId)
    this._trelloObject.idList = listId
  }

  /**
   * An array of member IDs that are on this card.
   * @type {string[]}
   */
  get membersId() {
    return [...this._trelloObject.idMembers]
  }

  /**
   * An array of member IDs who have voted on this card.
   * @type {string[]}
   */
  get membersVotedId() {
    return [...this._trelloObject.idMembersVoted]
  }

  /**
   * Numeric ID for the card on this board.
   * Only unique to the board, and subject to change as the card moves.
   * @type {number}
   */
  get shortId() {
    return this._trelloObject.idShort
  }

  /**
   * Array of label objects on this card.
   * @type {Object[]}
   */
  get labels() {
    return this._trelloObject.labels
      .map(label => _.cloneDeep(label))
  }

  /**
   * Whether the card cover image was selected automatically by Trello, or manually by the user.
   * @type {boolean}
   */
  get isCoverImageManuallySelected() {
    return this._trelloObject.manualCoverAttachment
  }

  /**
   * Returns the name of the card.
   * @type {string}
   */
  get name() {
    return this._trelloObject.name
  }

  /**
   * Sets the name of the card.
   * @type {string}
   */
  set name(name) {
    validateNotBlankTextField('name', name)
    this._trelloObject.name = name
  }

  /**
   * Position of the card in the list.
   * top, bottom, or a positive float.
   * @type {!(number|string)}
   */
  get position() {
    return this._trelloObject.pos
  }

  /**
   * Position of the card in the list.
   * top, bottom, or a positive float.
   * @type {!(number|string)}
   */
  set position(position) {
    validatePosition('position', position)
    this._trelloObject.pos = position
  }

  /**
   * The 8 character shortened ID for the card.
   * @type {string}
   */
  get shortLink() {
    return this._trelloObject.shortLink
  }

  /**
   * URL to the card without the name slug.
   * @type {string}
   */
  get shortUrl() {
    return this._trelloObject.shortUrl
  }

  /**
   * Full URL to the card, with the name slug.
   * @type {string}
   */
  get url() {
    return this._trelloObject.url
  }

  /**
   * Address of card location.
   * @type {string}
   */
  get address() {
    return this._trelloObject.address
  }

  /**
   * Name of card location.
   * @type {string}
   */
  get locationName() {
    return this._trelloObject.locationName
  }

  /**
   * Card location coordinates.
   * @type {Coordinates}
   */
  get coordinates() {
    return new Coordinates(
      _.get(this._trelloObject, 'coordinates.latitude', DEFAULT_COORDINATE),
      _.get(this._trelloObject, 'coordinates.longitude', DEFAULT_COORDINATE)
    )
  }
}
