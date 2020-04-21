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
  validateNotNullNumberField, validateNotNullStringOptionField
} from './validators/common-validators'

export default class CheckItem {

  /**
   * Custom field constructor.
   * @param {!Object} trelloCheckItemObject Trello API card object.
   */
  constructor(trelloCheckItemObject) {
    if (_.isNil(trelloCheckItemObject) || !_.isObject(trelloCheckItemObject)) {
      throw new TypeError('trelloCheckItemObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloCheckItemObject)
  }

  /**
   * Check item id.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Check list id.
   * @type {string}
   */
  get checklistId() {
    return this._trelloObject.idChecklist
  }

  /**
   * Check item name.
   * @type {string}
   */
  get name() {
    return this._trelloObject.name
  }

  /**
   * Sets check item name.
   * @type {string}
   */
  set name(name) {
    validateNotBlankTextField('name', name)
    this._trelloObject.name = name
  }

  /**
   * Check item position.
   * @type {string}
   */
  get position() {
    return this._trelloObject.pos
  }

  /**
   * Sets check item position.
   * @type {string}
   */
  set position(value) {
    validateNotNullNumberField('position', value)
    this._trelloObject.pos = value
  }

  /**
   * Check item state.
   * @type {string}
   */
  get state() {
    return this._trelloObject.state
  }

  /**
   * Sets check item state.
   * @type {string}
   */
  set state(value) {
    validateNotNullStringOptionField('state', [
      'complete',
      'incomplete'
    ], value)
    this._trelloObject.state = value
  }
}
