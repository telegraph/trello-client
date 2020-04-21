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

export default class TokenPermission {

  /**
   * Token permission constructor.
   * @param {!Object} trelloTokenPermissionObject Trello API token permission object.
   */
  constructor(trelloTokenPermissionObject) {
    if (_.isNil(trelloTokenPermissionObject) || !_.isObject(trelloTokenPermissionObject)) {
      throw new TypeError('trelloTokenPermissionObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloTokenPermissionObject)
  }

  /**
   * Permission target model id.
   * @type {string}
   */
  get modelId() {
    return this._trelloObject.idModel
  }

  /**
   * Permission target model type.
   * @type {string}
   */
  get modelType() {
    return this._trelloObject.modelType
  }

  /**
   * Whether the permission allows read.
   * @type {boolean}
   */
  get read() {
    return this._trelloObject.read
  }

  /**
   * Whether the permission allows write.
   * @type {boolean}
   */
  get write() {
    return this._trelloObject.write
  }

}
