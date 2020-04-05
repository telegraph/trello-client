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
    if (!_.isBoolean(closed)) {
      throw new TypeError('Closed parameter has to be a not null boolean')
    }
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
}
