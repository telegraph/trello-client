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
  validateNotNullNumberField,
  validateNullableNotBlankTextField
} from './validators/common-validators'

export default class CustomFieldOption {
  /**
   * Custom field option constructor.
   * @param {!Object} trelloCustomFieldOptionObject Trello API card object.
   */
  constructor(trelloCustomFieldOptionObject) {
    if (_.isNil(trelloCustomFieldOptionObject) || !_.isObject(trelloCustomFieldOptionObject)) {
      throw new TypeError('trelloCustomFieldOptionObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloCustomFieldOptionObject)
  }

  /**
   * The custom field option id.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * The custom field id this option belongs to.
   * @type {string}
   */
  get customFieldId() {
    return this._trelloObject.idCustomField
  }

  /**
   * The option value.
   * @type {string}
   */
  get value() {
    return _.get(this._trelloObject, 'value.text')
  }

  /**
   * Sets the option value.
   * @type {string}
   */
  set value(value) {
    validateNotBlankTextField('value', value)
    this._trelloObject.value = {
      text: value
    }
  }

  /**
   * Option color.
   * @type {string}
   */
  get color() {
    return this._trelloObject.color
  }

  /**
   * Sets option color.
   * @type {string}
   */
  set color(value) {
    validateNullableNotBlankTextField('color', value)
    this._trelloObject.color = value
  }

  /**
   * Option sorting position.
   * @type {number}
   */
  get position() {
    return this._trelloObject.pos
  }

  /**
   * Sets option sorting position.
   * @type {number}
   */
  set position(value) {
    validateNotNullNumberField('position', value)
    this._trelloObject.pos = value
  }
}
