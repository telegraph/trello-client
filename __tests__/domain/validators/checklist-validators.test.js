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

import {ValidationError} from '../../../src/domain/validators/ValidationError'
import {validateCheckItemStatus} from '../../../src/domain/validators/checklist-validators'

describe('Checklist custom validators', () => {
  describe('Validate check item status', () => {
    test.each([
      'complete',
      'incomplete'
    ])('%p should be valid', value =>
      expect(() => validateCheckItemStatus(value))
        .not.toThrow(ValidationError)
    )

    test.each([
      undefined,
      null,
      true,
      -6.7,
      100,
      'sadfdksajalkfds',
      [1, 2, 3],
      {foo: 'bar'}
    ])('%p should throw ValidationError', value =>
      expect(() => validateCheckItemStatus(value))
        .toThrow(ValidationError)
    )
  })
})
