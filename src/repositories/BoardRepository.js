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
import BoardEntity from '../entities/BoardEntity'
import {validateNotNullId} from '../domain/validators/common-validators'

const HTTP_404_ERROR = 404

export default class BoardRepository {
  /**
   * Creates a new instance.
   * @param {!Trello} trello Trello object.
   * @throws {TypeError} If trello is not a valid Trello client object.
   */
  constructor(trello) {
    if (_.isNil(trello) || !(trello instanceof Trello)) {
      throw new TypeError('trello parameter must be a not null Trello instance')
    }
    this._trello = trello
  }

  /**
   * Find a board by id.
   * @param {!string} boardId The board id.
   * @return {BoardEntity}
   */
  findById(boardId) {
    validateNotNullId(boardId, 'boardId')
    return this._trello.get(`/boards/${boardId}`)
      .then(board => new BoardEntity(board, this))
      .catch(error => {
        if (error.isAxiosError
          && error.response.status === HTTP_404_ERROR) {
          return Promise.resolve(null)
        }
        return Promise.reject(error)
      })
  }
}
