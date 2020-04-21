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

import 'regenerator-runtime/runtime.js'

import _ from 'lodash'
import TeamRepository from './repositories/TeamRepository'
import TrelloService from './services/TrelloService'

const DEFAULT_OPTIONS = {
  baseUrl: 'https://api.trello.com/1'
}

/**
 * Trello client main class.
 */
export default class Trello {

  /**
   * Creates a new Trello client instance.
   * @param {!string} apiKey Trello API Key
   * @param {!string} apiToken Trello API Token
   * @param {{basePath: ?string}} options={baseUrl:https://api.trello.com/1} Additional options
   */
  constructor(apiKey, apiToken, options = {}) {
    if (_.isNil(apiKey) || _.isNil(apiToken)) {
      throw new Error('apiKey and apiToken parameters are mandatory')
    }

    this._options = Object.assign(DEFAULT_OPTIONS, options)

    this._trelloService = new TrelloService(apiKey, apiToken, this._options.baseUrl)
  }

  /**
   * Team repository, provides team operations.
   * @returns {TeamRepository}
   */
  get team() {
    if (!_.has(this, '_team')) {
      this._team = new TeamRepository(this)
    }
    return this._team
  }

  /**
   * Generic Trello API get request.
   * @param {!string} path Request path
   * @param {Object} params={} Request query params
   * @returns {Promise<Object>} API response
   */
  async get(path, params = {}) {
    return this._trelloService.get(path, params)
  }

  /**
   * Generic Trello API put request.
   * @param {!string} path Request path
   * @param {Object} params={} Request query params
   * @returns {Promise<Object>} API response
   */
  async put(path, params = {}) {
    return this._trelloService.put(path, params)
  }

  /**
   * Generic Trello API post request.
   * @param {!string} path Request path
   * @param {Object} params={} Request query params
   * @returns {Promise<Object>} API response
   */
  async post(path, params = {}) {
    return this._trelloService.post(path, params)
  }

  /**
   * Generic Trello API delete request.
   * @param {!string} path Request path
   * @returns {Promise}
   */
  async delete(path) {
    return this._trelloService.delete(path)
  }
}
