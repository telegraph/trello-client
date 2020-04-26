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
import {validateNotBlankTextField} from './validators/common-validators'
import BoardPreferences from './BoardPreferences'
import TrelloDomain from './TrelloDomain'
import BoardLabelNames from './BoardLabelNames'

/**
 * Boards are fundamental to Trello. A board may belong to 0
 * or 1 teams and can have 0 or more lists.
 */
export default class Board extends TrelloDomain {

  /**
   * Returns the ID of the board.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Returns the name of the board.
   * @type {string}
   */
  get name() {
    return this._trelloObject.name
  }

  /**
   * Sets the name of the board.
   * @type {string}
   */
  set name(name) {
    validateNotBlankTextField('name', name)
    this._trelloObject.name = name
    this.flagUpdatedField('name')
  }

  /**
   * Returns the description of the board.
   * @type {string}
   */
  get desc() {
    return this._trelloObject.desc
  }

  /**
   * Sets the description of the board.
   * @type {string}
   */
  set desc(desc) {
    validateNotBlankTextField('desc', desc)
    this._trelloObject.desc = desc
    this.flagUpdatedField('desc')
  }

  /**
   * Custom emoji used in the description.
   * @type {Object}
   */
  get descData() {
    return _.cloneDeep(this._trelloObject.descData)
  }

  /**
   * Returns whether the board has been closed or not.
   * @type {boolean}
   */
  get closed() {
    return this._trelloObject.closed
  }

  /**
   * Sets whether the board has been closed or not.
   * @type {boolean}
   */
  set closed(closed) {
    this._trelloObject.closed = closed
    this.flagUpdatedField('closed')
  }

  /**
   * Returns the id of the team to witch the board belongs.
   * @type {string}
   */
  get idOrganization() {
    return this._trelloObject.idOrganization
  }

  /**
   * Moves the board to another team.
   * @type {string}
   */
  set idOrganization(teamId) {
    validateNotBlankTextField('idOrganization', teamId)
    this._trelloObject.idOrganization = teamId
    this.flagUpdatedField('idOrganization')
  }

  /**
   * Returns whether the board has been pinned or not.
   * @type {boolean}
   */
  get pinned() {
    return this._trelloObject.pinned
  }

  /**
   * Persistent URL for the board.
   * @type {string}
   */
  get url() {
    return this._trelloObject.url
  }

  /**
   * Returns URL for the board using only its shortMongoID.
   * @type {string}
   */
  get shortUrl() {
    return this._trelloObject.shortUrl
  }

  /**
   * Board settings.
   * @type {BoardPreferences}
   */
  get prefs() {
    if (!this._prefs) {
      this._prefs = new BoardPreferences(this._trelloObject.prefs)
    }
    return this._prefs
  }

  /**
   * Label names.
   * @type {BoardLabelNames}
   */
  get labelNames() {
    if (!this._labelNames) {
      this._labelNames = new BoardLabelNames(this._trelloObject.labelNames)
    }
    return this._labelNames
  }

  /**
   * An object containing information on the limits that exist for the board.
   * @type {Object}
   */
  get limits() {
    return _.cloneDeep(this._trelloObject.limits)
  }

  /**
   * Array of objects that represent the relationship of users to this board as memberships.
   * @type {Object[]}
   */
  get memberships() {
    return _.cloneDeep(this.trelloObject.memberships)
  }

  /**
   * Whether the board is owned by an Enterprise or not.
   * @type {boolean}
   */
  get enterpriseOwned() {
    return this._trelloObject.enterpriseOwned
  }
}
