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

import Organization from '../domain/Organization'
import _ from 'lodash'
import OrganizationRepository from '../repositories/OrganizationRepository'

export default class OrganizationEntity extends Organization {
  constructor(trelloObject, repository) {
    super(trelloObject)
    if (_.isNil(repository) || !(repository instanceof OrganizationRepository)) {
      throw new TypeError('trelloObject parameter must be a not null ObjectRepository')
    }
    this._repository = repository
  }
}
