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

export default class OrganizationRepository {

  constructor(trello) {
    if (_.isNil(trello) || !(trello instanceof Trello)) {
      throw new Error('trello parameter must be a not null Trello instance')
    }
    this._trello = trello
  }

  create(displayName, desc, name, website) {

  }

  delete(organization) {

  }

  findById(id) {

  }

  deleteById(id) {

  }

  update(organizations) {

  }
}
