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

export default class Enterprise {

  /**
   * Enterprise constructor.
   * @param {!Object} trelloEnterpriseObject Trello API card object.
   */
  constructor(trelloEnterpriseObject) {
    if (_.isNil(trelloEnterpriseObject) || !_.isObject(trelloEnterpriseObject)) {
      throw new TypeError('trelloEnterpriseObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloEnterpriseObject)
  }

  /**
   * The ID of the enterprise.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Short-form name of the enterprise.
   * @type {string}
   */
  get name() {
    return this._trelloObject.name
  }

  /**
   * Long-form name of the enterprise used when displaying the full name of the enterprise.
   * @type {string}
   */
  get displayName() {
    return this._trelloObject.displayName
  }

  /**
   * Object containing information about the prefs set within the enterprise.
   * @type {Object}
   */
  get preferences() {
    return _.cloneDeep(this._trelloObject.prefs)
  }

  /**
   * Determines whether SSO successfully activated.
   * @type {boolean}
   */
  get ssoActivationFailed() {
    return this._trelloObject.ssoActivationFailed
  }

  /**
   * Array of Member IDs that are admins of the enterprise.
   * @returns {string[]}
   */
  get adminsIds() {
    return _.cloneDeep(this._trelloObject.idAdmins)
  }

  /**
   * Array of Member IDs that belong to the enterprise.
   * @returns {string[]}
   */
  get membersIds() {
    return _.cloneDeep(this._trelloObject.idMembers)
  }

  /**
   * Array of Organization IDs that belong to the enterprise.
   * @type {string[]}
   */
  get organizationsIds() {
    return _.cloneDeep(this._trelloObject.idOrganizations)
  }

  /**
   * Array of products that the enterprise has enabled.
   * @type {number[]}
   */
  get products() {
    return _.cloneDeep(this._trelloObject.products)
  }

  /**
   * Object containing keys for every member type and values representing the count of each type of member.
   * Object keys: all, member, collaborator, saml and none
   * @returns {object}
   */
  get userTypes() {
    return _.cloneDeep(this._trelloObject.userTypes)
  }
}
