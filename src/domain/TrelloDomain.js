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

export default class TrelloDomain {
  /**
   * Domain constructor.
   * @param {!Object} trelloObject Trello API object.
   */
  constructor(trelloObject) {
    if (_.isNil(trelloObject) || !_.isObject(trelloObject)) {
      throw new TypeError('trelloObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloObject)
    this._updatedFields = []
  }

  /**
   * Not saved updated fields.
   * @type {string[]}
   */
  get updatedFields() {
    return _.cloneDeep(this._updatedFields)
  }

  /**
   * Flags a field as updated.
   * @param name
   */
  flagUpdatedField(name) {
    if (!this._updatedFields.includes(name)) {
      this._updatedFields.push(name)
    }
  }

  /**
   * Refresh updated fields list.
   */
  refreshUpdatedFields() {
    this._updatedFields = []
  }

  /**
   * Returns a copy of the underlying Trello action object.
   * @returns {Object} Trello API action object.
   */
  get trelloObject() {
    return _.cloneDeep(this._trelloObject)
  }

  /**
   * Converts object to JSON.
   * @returns {string} JSON string.
   */
  toJSON() {
    return JSON.stringify(this._trelloObject)
  }
}
