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
  validateNotBlankTextField,
  validateNotNullBooleanField,
  validatePosition
} from './validators/common-validators'

export default class List {

  /**
   * List constructor.
   * @param {!Object} trelloListObject Trello API card object.
   */
  constructor(trelloListObject) {
    if (_.isNil(trelloListObject) || !_.isObject(trelloListObject)) {
      throw new TypeError('trelloListObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloListObject)
  }

  /**
   * The ID of the list.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * The name of the list.
   * @type {string}
   */
  get name() {
    return this._trelloObject.name
  }

  /**
   * Sets the name of the list.
   * @type {string}
   */
  set name(value) {
    validateNotBlankTextField('name', value)
    this._trelloObject.name = value
  }

  /**
   * Whether the list is closed (archived).
   * @type {boolean}
   */
  get closed() {
    return this._trelloObject.closed
  }

  /**
   * Set the list to be closed (archived).
   * @type {boolean}
   */
  set closed(value) {
    validateNotNullBooleanField('closed', value)
    this._trelloObject.closed = value
  }

  /**
   * The ID of the board the list is on.
   * @type {string}
   */
  get boardId() {
    return this._trelloObject.idBoard
  }

  /**
   * ID of a board the list should be moved to
   * @type {string}
   */
  set boardId(value) {
    validateNotBlankTextField('boardId', value)
    this._trelloObject.idBoard = value
  }

  /**
   * The position of the list on the board.
   * @type {number|string}
   */
  get position() {
    return this._trelloObject.pos
  }

  /**
   * New position for the list:
   * - top
   * - bottom
   * - positive floating point number
   * @type {number|string}
   */
  set position(value) {
    validatePosition('position', value)
    this._trelloObject.pos = value
  }
}
