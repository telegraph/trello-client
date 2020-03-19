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

export default class Trello {

  constructor(apiKey, apiToken) {
    if (_.isNil(apiKey) || _.isNil(apiToken)) {
      throw new Error('apiKey and apiToken parameters are mandatory')
    }

    this._trelloService = new TrelloService(apiKey, apiToken)
  }

  get organization() {
    if (!_.has(this, '_organization')) {
      this._organization = new OrganizationRepository(this._trelloService)
    }
    return this._organization
  }

}
