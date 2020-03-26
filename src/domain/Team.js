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

/**
 * Teams represent collections of members and boards.
 */
export default class Team {
  constructor(trelloTeamObject) {
    if (_.isNil(trelloTeamObject) || !_.isObject(trelloTeamObject)) {
      throw new TypeError('trelloTeamObject parameter must be a not null object')
    }
    this._trelloObject = trelloTeamObject
  }

  /**
   * Returns the ID of the team
   * @returns {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Returns the description of the team
   * @returns {string}
   */
  get desc() {
    return this._trelloObject.desc
  }

  /**
   * Sets the description of the team
   * @param {string} desc
   */
  set desc(desc) {
    this._trelloObject.desc = desc
  }

  /**
   * Returns information about custom emojies in the team description
   * @returns {Object}
   */
  get descData() {
    return this._trelloObject.descData
  }

  /**
   * Returns the name of the team.
   * @returns {string}
   */
  get displayName() {
    return this._trelloObject.displayName
  }

  /**
   * Sets the name of the team.
   * @param {string} displayName
   */
  set displayName(displayName) {
    this._trelloObject.displayName = displayName
  }

  /**
   * Returns the programmatic name of the team.
   * @returns {string}
   */
  get name() {
    return this._trelloObject.name
  }

  /**
   * Sets the programmatic name of the team.
   * @param {string} name
   */
  set name(name) {
    this._trelloObject.name = name
  }

  /**
   * Returns the preference for the team.
   * @returns {Object}
   */
  get prefs() {
    return this._trelloObject.prefs
  }

  /**
   * Returns the URL to the team page on Trello.
   * @returns {string}
   */
  get url() {
    return this._trelloObject.url
  }

  /**
   * Returns team related website.
   * @returns {string}
   */
  get website() {
    return this._trelloObject.website
  }

  /**
   * Sets team related website.
   * @param {string} website
   */
  set website(website) {
    this._trelloObject.website = website
  }

  /**
   * Converts object to JSON.
   * @returns {string}
   */
  toJSON() {
    return JSON.stringify(this._trelloObject)
  }
}
