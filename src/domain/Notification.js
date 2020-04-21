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

/**
 * Notifications are displayed under the bell icon button, next to a member's avatar.
 */
export default class Notification {

  /**
   * Notification constructor.
   * @param {!Object} trelloNotificationObject Trello API card object.
   */
  constructor(trelloNotificationObject) {
    if (_.isNil(trelloNotificationObject) || !_.isObject(trelloNotificationObject)) {
      throw new TypeError('trelloNotificationObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloNotificationObject)
  }

  /**
   * The ID of the notification.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Relevant data regarding the notification.
   * @type {Object}
   */
  get data() {
    return this._trelloObject.data
  }
}
