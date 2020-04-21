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
import Team from '../domain/Team'
import TeamRepository from '../repositories/TeamRepository'

/**
 * Team active record.
 */
export default class TeamEntity extends Team {

  /**
   * Team entity constructor.
   * @param {!Object} trelloObject Trello API team object.
   * @param {!TeamRepository} repository Team repository object.
   * @throws TypeError If parameters are null or not valid objects.
   */
  constructor(trelloObject, repository) {
    super(trelloObject)
    if (_.isNil(repository) || !(repository instanceof TeamRepository)) {
      throw new TypeError('trelloObject parameter must be a not null TeamRepository')
    }
    this._repository = repository
  }

  /**
   * Apply property updates
   * @returns {Promise} Operation promise
   */
  async save() {
    await this._repository.update(this)
      .then(updatedTeam => {
        this._trelloObject = updatedTeam._trelloObject
      })
  }
}
