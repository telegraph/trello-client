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
 * Boards are fundamental to Trello. A board may belong to 0
 * or 1 teams and can have 0 or more lists.
 */
export default class Board {
  constructor(trelloBoardObject) {
    if (_.isNil(trelloBoardObject) || !_.isObject(trelloBoardObject)) {
      throw new TypeError('trelloTeamObject parameter must be a not null object')
    }
    this._trelloObject = trelloBoardObject
  }

  /**
   * Returns the ID of the board.
   * @return string
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Returns the name of the board.
   * @return string
   */
  get name() {
    return this._trelloObject.name
  }

  /**
   * Sets the name of the board.
   * @param name Board name
   */
  set name(name) {
    this._trelloObject.name = name
  }

  /**
   * Returns whether the board has been closed or not.
   * @return boolean
   */
  get closed() {
    return this._trelloObject.closed
  }

  /**
   * Sets whether the board has been closed or not.
   * @param closed Closed status.
   */
  set closed(closed) {
    this._trelloObject.closed = closed
  }

  /**
   * Returns whether the board has been pinned or not.
   * @return {boolean}
   */
  get pinned() {
    return this._trelloObject.pinned
  }

  /**
   * Sets whether the board has been pinned or not.
   * @param pinned
   */
  set pinned(pinned) {
    this._trelloObject.pinned = pinned
  }

  /**
   * Persistent URL for the board.
   * @return string
   */
  get url() {
    return this._trelloObject.url
  }

  /**
   * Returns URL for the board using only its shortMongoID.
   * @return string
   */
  get shortUrl() {
    return this._trelloObject.shortUrl
  }
}
