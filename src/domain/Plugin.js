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

import TrelloDomain from './TrelloDomain'

export default class Plugin extends TrelloDomain {
  /**
   * ID.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * The board ID.
   * @type {string}
   */
  get idBoard() {
    return this._trelloObject.idBoard
  }

  /**
   * The plugin ID.
   * @type {string}
   */
  get idPlugin() {
    return this._trelloObject.idPlugin
  }
}
