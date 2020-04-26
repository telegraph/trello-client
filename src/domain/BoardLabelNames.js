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

import TrelloDomain from './TrelloDomain'

export default class BoardLabelNames extends TrelloDomain {
  /**
   * Green label name.
   * @type {string}
   */
  get green() {
    return this._trelloObject.green
  }

  /**
   * Sets green label name.
   * @type {string}
   */
  set green(name) {
    this._trelloObject.green = name
    this.flagUpdatedField('green')
  }

  /**
   * Yellow label name.
   * @type {string}
   */
  get yellow() {
    return this._trelloObject.yellow
  }

  /**
   * Sets yellow label name.
   * @type {string}
   */
  set yellow(name) {
    this._trelloObject.yellow = name
    this.flagUpdatedField('yellow')
  }

  /**
   * Orange label name.
   * @type {string}
   */
  get orange() {
    return this._trelloObject.orange
  }

  /**
   * Sets orange label name.
   * @type {string}
   */
  set orange(name) {
    this._trelloObject.orange = name
    this.flagUpdatedField('orange')
  }

  /**
   * Red label name.
   * @type {string}
   */
  get red() {
    return this._trelloObject.red
  }

  /**
   * Sets red label name.
   * @type {string}
   */
  set red(name) {
    this._trelloObject.red = name
    this.flagUpdatedField('red')
  }

  /**
   * Purple label name.
   * @type {string}
   */
  get purple() {
    return this._trelloObject.purple
  }

  /**
   * Sets purple label name.
   * @type {string}
   */
  set purple(name) {
    this._trelloObject.purple = name
    this.flagUpdatedField('purple')
  }

  /**
   * Ble label name.
   * @type {string}
   */
  get blue() {
    return this._trelloObject.blue
  }

  /**
   * Sets blue label name.
   * @type {string}
   */
  set blue(name) {
    this._trelloObject.blue = name
    this.flagUpdatedField('blue')
  }

  /**
   * Sky label name.
   * @type {string}
   */
  get sky() {
    return this._trelloObject.sky
  }

  /**
   * Sets sky label name.
   * @type {string}
   */
  set sky(name) {
    this._trelloObject.sky = name
    this.flagUpdatedField('sky')
  }

  /**
   * Lime label name.
   * @type {string}
   */
  get lime() {
    return this._trelloObject.lime
  }

  /**
   * Sets line label name.
   * @type {string}
   */
  set lime(name) {
    this._trelloObject.lime = name
    this.flagUpdatedField('lime')
  }

  /**
   * Pink label name.
   * @type {string}
   */
  get pink() {
    return this._trelloObject.pink
  }

  /**
   * Sets pink label name.
   * @type {string}
   */
  set pink(name) {
    this._trelloObject.pink = name
    this.flagUpdatedField('pink')
  }

  /**
   * Black label name.
   * @type {string}
   */
  get black() {
    return this._trelloObject.black
  }

  /**
   * Sets black label name.
   * @type {string}
   */
  set black(name) {
    this._trelloObject.black = name
    this.flagUpdatedField('black')
  }
}
