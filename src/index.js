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
import OrganizationRepository from './repositories/OrganizationRepository'
import TrelloService from './services/TrelloService'

const DEFAULT_OPTIONS = {
  baseUrl: 'https://api.trello.com/1'
}

export default class Trello {

  constructor(apiKey, apiToken, options = {}) {
    if (_.isNil(apiKey) || _.isNil(apiToken)) {
      throw new Error('apiKey and apiToken parameters are mandatory')
    }

    this._options = Object.assign(DEFAULT_OPTIONS, options)

    this._trelloService = new TrelloService(apiKey, apiToken, this._options.baseUrl)
  }

  get organization() {
    if (!_.has(this, '_organization')) {
      this._organization = new OrganizationRepository(this)
    }
    return this._organization
  }

  async get(path, params = {}) {
    return this._trelloService.get(path, params)
  }

  async put(path, params = {}) {
    return this._trelloService.put(path, params)
  }

  async post(path, params = {}) {
    return this._trelloService.post(path, params)
  }

  async delete(path) {
    return this._trelloService.delete(path)
  }
}
