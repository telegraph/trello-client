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

import {
  isValidOrganizationDisplayName,
  isValidOrganizationName
} from '../../../src/domain/validators/team-validators'

describe('Organization values validators', () => {
  describe('Validate organization displayName', () =>{
    test.each([
      [undefined, false],
      [null, false],
      ['  abdce4 ', false],
      ['  ', false],
      ['A', true],
      ['Company Name', true],
      ['%Company_Name##', true]
    ])('isValidOrganizationDisplayName(%p) should return %p', (name, expected) =>
      expect(isValidOrganizationDisplayName(name)).toBe(expected)
    )
  })

  describe('Validate organization name', () =>{
    test.each([
      [undefined, true],
      [null, true],
      ['  abdce4 ', false],
      ['abd c e4', false],
      ['ab', false],
      ['CompanyName', false],
      ['%company_name##', false],
      ['company_name45', true]
    ])('isValidOrganizationName(%p) should return %p', (name, expected) =>
      expect(isValidOrganizationName(name)).toBe(expected)
    )
  })
})
