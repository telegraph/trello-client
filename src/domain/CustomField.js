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
import CustomFieldOption from './CustomFieldOption'

export default class CustomField {
  /**
   * Custom field constructor.
   * @param {!Object} trelloCustomFieldObject Trello API card object.
   */
  constructor(trelloCustomFieldObject) {
    if (_.isNil(trelloCustomFieldObject) || !_.isObject(trelloCustomFieldObject)) {
      throw new TypeError('trelloCustomFieldObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloCustomFieldObject)
  }

  /**
   * The ID of the Custom Field definition.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * The ID of the model that the Custom Field is defined on.
   * This should always be an ID of a board.
   * @type {string}
   */
  get modelId() {
    return this._trelloObject.idModel
  }

  /**
   * The type of model that the Custom Field is being defined for.
   * This should always be board.
   * @type {string}
   */
  get modelType() {
    return this._trelloObject.modelType
  }

  /**
   * A hash created from the fields of a Custom Field used to manage Custom Fields and values between boards.
   * @type {string}
   */
  get fieldGroup() {
    return this._trelloObject.fieldGroup
  }

  /**
   * The name of the Custom Field.
   * This is displayed to the user in the Trello clients.
   * @type {string}
   */
  get name() {
    return this._trelloObject.name
  }

  /**
   * Sets the name of the Custom Field.
   * @type {string}
   */
  set name(value) {
    validateNullableNotBlankTextField('name', value)
    this._trelloObject.name = value
  }

  /**
   * The position of the Custom Field.
   * This will be used to determine the order that Custom Fields should be listed when being shown to the user.
   * @type {number}
   */
  get position() {
    return this._trelloObject.pos
  }

  /**
   * Sets the position of the Custom Field.
   * @type {number}
   */
  set position(value) {
    validateNotNullNumberField('position', value)
    this._trelloObject.pos = value
  }

  /**
   * Determines the type of values that can be used when setting values for Custom Fields on cards.
   * Should be one of: number, date, text, checkbox, and list.
   * @type {string}
   */
  get type() {
    return this._trelloObject.type
  }

  /**
   * An array of objects used for Custom Fields of the list type.
   * The objects contain data about the options available for the dropdown.
   * @type {CustomFieldOption[]}
   */
  get options() {
    return _.get(this._trelloObject, 'options', [])
      .map(option => new CustomFieldOption(option))
  }
}
