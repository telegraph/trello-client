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

import {validateNotNullNumberField} from './validators/common-validators'

const COORDINATE_ORIGIN = 0

/**
 * Spacial coordinates.
 */
export default class Coordinates {

  constructor(
    latitude = COORDINATE_ORIGIN,
    longitude = COORDINATE_ORIGIN
  ) {
    this._latitude = latitude
    this._longitude = longitude
  }

  /**
   * Latitude.
   * @type {!number}
   */
  get latitude() {
    return this._latitude
  }

  /**
   * Latitude.
   * @type {!number}
   */
  set latitude(latitude) {
    validateNotNullNumberField('latitude', latitude)
    this._latitude = latitude
  }

  /**
   * Longitude.
   * @type {!number}
   */
  get longitude() {
    return this._longitude
  }

  /**
   * Longitude.
   * @type {!number}
   */
  set longitude(longitude) {
    validateNotNullNumberField('longitude', longitude)
    this._longitude = longitude
  }

}
