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
import {validateNotNullNumberField, validateNullableNotBlankTextField} from './validators/common-validators'

/**
 * A checklist is a way of keeping track of subtasks within a card.
 * You can add multiple checklists to a single card.
 */
export default class Checklist {
  /**
   * Checklist constructor.
   * @param {!Object} trelloChecklistObject Trello API card object.
   */
  constructor(trelloChecklistObject) {
    if (_.isNil(trelloChecklistObject) || !_.isObject(trelloChecklistObject)) {
      throw new TypeError('trelloChecklistObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloChecklistObject)
  }

  /**
   * Checklist id.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * The ID of the board the checklist is on
   * @type {string}
   */
  get boardId() {
    return this._trelloObject.idBoard
  }

  /**
   * The ID of the card the checklist is on.
   * @type {string}
   */
  get cardId() {
    return this._trelloObject.idCard
  }

  /**
   * The name of the checklist.
   * @type {string}
   */
  get name() {
    return this._trelloObject.name
  }

  /**
   * Sets the name of the checklist.
   * @type {string}
   */
  set name(value) {
    validateNullableNotBlankTextField('name', value)
    this._trelloObject.name = value
  }

  /**
   * The position of the checklist on the card (relative to any other checklists on the card).
   * @type {number}
   */
  get position() {
    return this._trelloObject.pos
  }

  /**
   * Sets the position of the checklist on the card (relative to any other checklists on the card).
   * @type {number}
   */
  set position(value) {
    validateNotNullNumberField('position', value)
    this._trelloObject.pos = value
  }
}
