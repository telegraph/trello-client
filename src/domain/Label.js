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
import {validateNullableStringOptionField, validateNullableTextField} from './validators/common-validators'

const COLOR_OPTIONS = [
  'yellow',
  'purple',
  'blue',
  'red',
  'green',
  'orange',
  'black',
  'sky',
  'pink',
  'lime'
]

export default class Label {

  /**
   * Label constructor.
   * @param {!Object} trelloLabelObject Trello API card object.
   */
  constructor(trelloLabelObject) {
    if (_.isNil(trelloLabelObject) || !_.isObject(trelloLabelObject)) {
      throw new TypeError('trelloLabelObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloLabelObject)
  }

  /**
   * The ID of the label.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * The optional name of the label.
   * @type {string}
   */
  get name() {
    return this._trelloObject.name
  }

  /**
   * Sets the optional name of the label.
   * @type {string}
   */
  set name(value) {
    validateNullableTextField('name', value)
    this._trelloObject.name = value
  }

  /**
   * The color of the label.
   * One of:
   * - yellow
   * - purple
   * - blue
   * - red
   * - green
   * - orange
   * - black
   * - sky
   * - pink
   * - lime
   * - null
   * @type {string}
   */
  get color() {
    return this._trelloObject.color
  }

  /**
   * Sets the color of the label.
   * One of:
   * - yellow
   * - purple
   * - blue
   * - red
   * - green
   * - orange
   * - black
   * - sky
   * - pink
   * - lime
   * - null
   * @type {string}
   */
  set color(value) {
    validateNullableStringOptionField('color', COLOR_OPTIONS, value)
    this._trelloObject.color = value
  }

}
