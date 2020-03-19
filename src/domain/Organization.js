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
  constructor(trelloService, trelloObject) {
    if (_.isNil(trelloService) || _.isNil(trelloObject)) {
      throw new Error('trelloService and trelloObject parameters are mandatory')
    }
    this._trelloService = trelloService
    initValuesFromTrelloObject(this, trelloObject)
  }

  getId() {
    return this._id
  }

  getDesc() {
    return this._desc
  }

  async setDesc(desc) {
    updateOrganizationField(this, 'desc', desc)
      .then(() => this._desc = desc)
  }

  toJSON() {
    return JSON.stringify({
      id: this._id
    })
  }
}

function initValuesFromTrelloObject(organization, trelloObject) {
  organization._id = _.get(trelloObject, 'id')
  organization._desc = _.get(trelloObject, 'desc')
}

async function updateOrganizationField(organization, field, value) {
  return Promise.resolve(null)
}
