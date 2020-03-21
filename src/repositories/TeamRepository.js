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
import Trello from '../index'
import {isUrl} from '../utils/string-utils'
import {isValidOrganizationDisplayName, isValidOrganizationName} from '../domain/validators/organization-validators'

export default class TeamRepository {

  constructor(trello) {
    if (_.isNil(trello) || !(trello instanceof Trello)) {
      throw new TypeError('trello parameter must be a not null Trello instance')
    }
    this._trello = trello
  }

  async create(displayName, desc, name, website) {
    if (!isValidOrganizationDisplayName(displayName)) {
      throw new TypeError('displayName parameter must be a not null 1 character long and not begin or end with a space')
    }

    if (!isValidOrganizationName(name)) {
      throw new TypeError('name parameter must have at least 3 lowercase letters, underscores, and numbers')
    }

    if (!_.isNil(website) && !isUrl(website)) {
      throw new TypeError('name parameter must be a valid absolute URL')
    }

    return this._trello.post('/organizations', {
      displayName: displayName,
      desc: desc,
      name: name,
      website: website
    })
  }

  async findById(id) {

  }

  async deleteById(id) {

  }

  async update(organizations) {

  }
}
