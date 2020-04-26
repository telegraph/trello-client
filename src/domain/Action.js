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
import TrelloDomain from './TrelloDomain'

/**
 * Actions are generated whenever an action occurs in Trello.
 */
export default class Action extends TrelloDomain {

  /**
   * The id of the action.
   * @type {string} Action id.
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Relevant information regarding the action.
   * @type {Object}
   */
  get data() {
    return _.cloneDeep(this._trelloObject.data)
  }

  /**
   * When the action occurred.
   * @type {Date}
   */
  get date() {
    return new Date(this._trelloObject.date)
  }

  /**
   * The id of the member who caused the action.
   * @type {string}
   */
  get idMemberCreator() {
    return this._trelloObject.idMemberCreator
  }

  /**
   * The type of the action.
   * @see https://developers.trello.com/reference-link/action-types
   * @type {string}
   */
  get type() {
    return this._trelloObject.type
  }
}
