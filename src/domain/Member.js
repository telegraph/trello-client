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
import {validateAvatarSource} from './validators/member-validators'

/**
 * Everyone with a Trello account is called a member.
 */
export default class Member {

  /**
   * Member constructor.
   * @param {!Object} trelloMemberObject Trello API card object.
   */
  constructor(trelloMemberObject) {
    if (_.isNil(trelloMemberObject) || !_.isObject(trelloMemberObject)) {
      throw new TypeError('trelloMemberObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloMemberObject)
  }

  /**
   * The ID of the member.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Member profile images are hosted at: https://trello-avatars.s3.amazonaws.com/{avatarHash}/{size}.png
   * @type {string}
   */
  get avatarHash() {
    return this._trelloObject.avatarHash
  }

  /**
   * The URL of the current avatar being used, regardless of whether it is a gravatar or uploaded avatar.
   * @type {string}
   */
  get avatarUrl() {
    return this._trelloObject.avatarUrl
  }

  /**
   * The source of the user's avatar - either via "upload" or "gravatar".
   * @type {string}
   */
  get avatarSource() {
    return this._trelloObject.avatarSource
  }

  /**
   * Sets the source of the user's avatar - either via "upload" or "gravatar".
   * @type {string}
   */
  set avatarSource(value) {
    validateAvatarSource(value)
    this._trelloObject.avatarSource = value
  }
}
