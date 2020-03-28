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
 * Actions are generated whenever an action occurs in Trello.
 */
export default class Action {

  /**
   * Action constructor.
   * @param {!Object} trelloActionObject Trello API action object.
   */
  constructor(trelloActionObject) {
    if (_.isNil(trelloActionObject) || !_.isObject(trelloActionObject)) {
      throw new TypeError('trelloActionObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloActionObject)
  }

  /**
   * Returns the id of the action.
   * @returns {string} Action id.
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Relevant information regarding the action.
   * @returns {Object} Action information.
   */
  get data() {
    return _.cloneDeep(this._trelloObject.data)
  }

  /**
   * When the action occurred.
   * @returns {Date} Action date
   */
  get date() {
    return new Date(this._trelloObject.date)
  }

  /**
   * The id of the member who caused the action.
   * @returns {string} Creator member id.
   */
  get memberIdCause() {
    return this._trelloObject.idMemberCreator
  }

  /**
   * The type of the action.
   * @see https://developers.trello.com/reference-link/action-types
   * @returns {string} Action type.
   */
  get type() {
    return this._trelloObject.type
  }

  /**
   * Returns a copy of the underlying Trello action object.
   * @returns {Object} Trello API action object.
   */
  getTrelloObject() {
    return _.cloneDeep(this._trelloObject)
  }
}
