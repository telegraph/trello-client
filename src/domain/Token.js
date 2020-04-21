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
import TokenPermission from './TokenPermission'

/**
 * Trello authentication token.
 */
export default class Token {

  /**
   * Token constructor.
   * @param {!Object} trelloTokenObject Trello API webhook object.
   */
  constructor(trelloTokenObject) {
    if (_.isNil(trelloTokenObject) || !_.isObject(trelloTokenObject)) {
      throw new TypeError('trelloTokenObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloTokenObject)
  }

  /**
   * The ID of the token.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Token test identifier.
   * @type {string}
   */
  get identifier() {
    return this._trelloObject.identifier
  }

  /**
   * Token related member id.
   * @type {string}
   */
  get memberId() {
    return this._trelloObject.idMember
  }

  /**
   * Date when the token was created.
   * @type {Date}
   */
  get dateCreated() {
    return new Date(this._trelloObject.dateCreated)
  }

  /**
   * Date when the token is expired.
   * @type {Date}
   */
  get dateExpires() {
    return new Date(this._trelloObject.dateExpires)
  }

  /**
   * List of authorized permissions.
   * @type {TokenPermission[]}
   */
  get permissions() {
    return _.get(this._trelloObject, 'permissions', [])
      .map(permission => new TokenPermission(permission))
  }
}
