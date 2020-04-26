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
import {isBlank, isUrl} from '../utils/string-utils'
import {isValidOrganizationDisplayName, isValidOrganizationName} from '../domain/validators/team-validators'
import Trello from '../index'
import TeamEntity from '../entities/TeamEntity'

/**
 * Organization objects repository.
 */
export default class TeamRepository {

  /**
   * Creates a new instance.
   * @param {!Trello} trello
   * @throws {TypeError} If trello is not a valid Trello client object
   */
  constructor(trello) {
    if (_.isNil(trello) || !(trello instanceof Trello)) {
      throw new TypeError('trello parameter must be a not null Trello instance')
    }
    this._trello = trello
  }

  /**
   * Creates a new team.
   * @param {{displayName: string, desc: ?string, name: ?string, website: ?string}} teamData Organization data
   * @returns {Promise<TeamEntity>} Created team entity.
   * @throws {TypeError} Throw error when teamData properties does not validate.
   */
  async create(teamData) {
    if (!isValidOrganizationDisplayName(_.get(teamData, 'displayName'))) {
      throw new TypeError('displayName parameter must be a not null 1 character long and not begin or end with a space')
    }

    if (!isValidOrganizationName(_.get(teamData, 'name'))) {
      throw new TypeError('name parameter must have at least 3 lowercase letters, underscores, and numbers')
    }

    const website = _.get(teamData, 'website')
    if (!_.isNil(website) && !isUrl(website)) {
      throw new TypeError('name parameter must be a valid absolute URL')
    }

    return this._trello.post('/organizations', teamData)
      .then(trelloOrganization => new TeamEntity(trelloOrganization, this))
  }

  /**
   * Loads a Organization by id.
   * @param {string} id Organization id.
   * @returns {Promise<TeamEntity>} Loaded team entity.
   * @throws {TypeError} Throws error when id is null or empty.
   */
  async findById(id) {
    if (isBlank(id)) {
      throw new TypeError('id parameter must be a not empty team id')
    }

    return this._trello.get(`/organizations/${id}`)
      .then(trelloOrganization => new TeamEntity(trelloOrganization, this))
  }

  /**
   * Search teams.
   * @param {string} query Query string
   * @returns {Promise<Array<TeamEntity>>} Search results
   * @throws {TypeError} Throws error when query string is null or empty.
   */
  async search(query) {
    if (isBlank(query)) {
      throw new TypeError('query parameter must be a not empty query string')
    }

    return this._trello.get('/search', {
      query: query,
      modelTypes: 'organizations'
    })
      .then(trelloOrganizations => trelloOrganizations
        .map(trelloOrganization => new TeamEntity(trelloOrganization, this))
      )
  }

  /**
   * Deletes a team by id.
   * @param {string} id Organization id.
   * @returns {Promise} Delete operation promise.
   * @throws {TypeError} Throws error when id is null or empty.
   */
  async deleteById(id) {
    if (isBlank(id)) {
      throw new TypeError('id parameter must be a not empty team id')
    }

    return this._trello.delete(`/organizations/${id}`)
  }

  /**
   * Updates a team.
   * @param {TeamEntity} team A team entity to be updated.
   * @returns {Promise<TeamEntity>} Updated team entity.
   * @throws {TypeError} Throws error when team parameter is null or empty.
   */
  async update(team) {
    if (_.isNil(team) || !(team instanceof TeamEntity)) {
      throw new TypeError('team parameter must be a not null TeamEntity object instance')
    }

    return this._trello.put(`/organizations/${team.id}`, {
      displayName: team.displayName,
      desc: team.desc,
      name: team.name,
      website: team.website
    })
      .then(trelloOrganization => new TeamEntity(trelloOrganization, this))
  }
}
