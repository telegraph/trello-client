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
import {ValidationError} from './ValidationError'

const AVATAR_SOURCE_VALUES = [
  'gravatar',
  'upload'
]

export function validateAvatarSource(value) {
  if (_.isNil(value) || !_.isString(value) || !AVATAR_SOURCE_VALUES.includes(value)) {
    throw new ValidationError(`AvatarSource must be gravatar or upload: ${value}`)
  }
}
