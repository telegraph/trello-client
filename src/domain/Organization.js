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

export default class Organization {
  constructor(trelloObject) {
    if (_.isNil(trelloObject) || !_.isObject(trelloObject)) {
      throw new TypeError('trelloObject parameter must be a not null object')
    }
    this._trelloObject = trelloObject
  }

  get id() {
    return this._trelloObject.id
  }

  get desc() {
    return this._trelloObject.desc
  }

  set desc(desc) {
    this._trelloObject.desc = desc
  }

  get descData() {
    return this._trelloObject.descData
  }

  get displayName() {
    return this._trelloObject.displayName
  }

  set displayName(displayName) {
    this._trelloObject.displayName = displayName
  }

  get idBoards() {
    return this._trelloObject.idBoards
  }

  get name() {
    return this._trelloObject.name
  }

  set name(name) {
    this._trelloObject.name = name
  }

  get prefs() {
    return this._trelloObject.prefs
  }

  get url() {
    return this._trelloObject.url
  }

  get website() {
    return this._trelloObject.website
  }

  set website(website) {
    this._trelloObject.website = website
  }

  toJSON() {
    return JSON.stringify(this._trelloObject)
  }
}
