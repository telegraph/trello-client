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

import Enterprise from '../../src/domain/Enterprise'
import TRELLO_ENTERPRISE from '../data/trello-enterprise.json'

describe('Enterprise domain object', () => {
  describe('Constructor', () => {
    test('Should construct an object', () => {
      const enterprise = new Enterprise(TRELLO_ENTERPRISE)

      expect(enterprise)
        .not.toBeNull()
      expect(enterprise)
        .toBeInstanceOf(Enterprise)
      expect(enterprise._trelloObject)
        .toEqual(TRELLO_ENTERPRISE)
      expect(enterprise._trelloObject)
        .not.toBe(TRELLO_ENTERPRISE)
    })

    test.each([
      undefined,
      null,
      'foo'
    ])('Should throw error on construction new Enterprise(%p)', value =>
      expect(() => new Enterprise(value))
        .toThrow(TypeError)
    )
  })

  describe('Properties', () => {
    let enterprise = null

    beforeEach(() => {
      enterprise = new Enterprise(TRELLO_ENTERPRISE)
    })

    describe('id', () => {
      test('Should return id', () =>
        expect(enterprise.id)
          .toBe(TRELLO_ENTERPRISE.id)
      )

      test('Should not set id', () =>
        expect(() => {
          enterprise.id = '5e9dd8888f2c1f46aeb8eff3'
        })
          .toThrow(TypeError)
      )
    })

    describe('name', () => {
      test('Should return name', () =>
        expect(enterprise.name)
          .toBe(TRELLO_ENTERPRISE.name)
      )

      test('Should not set name', () =>
        expect(() => {
          enterprise.name = '5e9dd8888f2c1f46aeb8eff3'
        })
          .toThrow(TypeError)
      )
    })

    describe('displayName', () => {
      test('Should return displayName', () =>
        expect(enterprise.displayName)
          .toBe(TRELLO_ENTERPRISE.displayName)
      )

      test('Should not set displayName', () =>
        expect(() => {
          enterprise.displayName = '5e9dd8888f2c1f46aeb8eff3'
        })
          .toThrow(TypeError)
      )
    })

    describe('preferences', () => {
      test('Should return a copy of the prefs', () => {
        expect(enterprise.preferences)
          .toEqual(TRELLO_ENTERPRISE.prefs)
        expect(enterprise.preferences)
          .not.toBe(TRELLO_ENTERPRISE.prefs)
      })

      test('Should not set prefs', () =>
        expect(() => {
          enterprise.preferences = '5e9dd8888f2c1f46aeb8eff3'
        })
          .toThrow(TypeError)
      )
    })

    describe('ssoActivationFailed', () => {
      test('Should return the sso activation failed value', () => {
        expect(enterprise.ssoActivationFailed)
          .toBe(TRELLO_ENTERPRISE.ssoActivationFailed)
      })

      test('Should not set ssoActivationFailed', () =>
        expect(() => {
          enterprise.ssoActivationFailed = true
        })
          .toThrow(TypeError)
      )
    })

    describe('adminsIds', () => {
      test('Should return a copy of the admins ids array', () => {
        expect(enterprise.adminsIds)
          .toEqual(TRELLO_ENTERPRISE.idAdmins)
        expect(enterprise.adminsIds)
          .not.toBe(TRELLO_ENTERPRISE.idAdmins)
      })

      test('Should not set adminsId', () =>
        expect(() => {
          enterprise.adminsIds = ['5e9dd8888f2c1f46aeb8eff3']
        })
          .toThrow(TypeError)
      )
    })

    describe('membersIds', () => {
      test('Should return a copy of the members ids array', () => {
        expect(enterprise.membersIds)
          .toEqual(TRELLO_ENTERPRISE.idMembers)
        expect(enterprise.membersIds)
          .not.toBe(TRELLO_ENTERPRISE.idMembers)
      })

      test('Should not set membersIds', () =>
        expect(() => {
          enterprise.membersIds = ['5e9dd8888f2c1f46aeb8eff3']
        })
          .toThrow(TypeError)
      )
    })

    describe('organizationsIds', () => {
      test('Should return a copy of the organizations ids array', () => {
        expect(enterprise.organizationsIds)
          .toEqual(TRELLO_ENTERPRISE.idOrganizations)
        expect(enterprise.organizationsIds)
          .not.toBe(TRELLO_ENTERPRISE.idOrganizations)
      })

      test('Should not set membersIds', () =>
        expect(() => {
          enterprise.organizationsIds = ['5e9dd8888f2c1f46aeb8eff3']
        })
          .toThrow(TypeError)
      )
    })

    describe('products', () => {
      test('Should return a copy of the products array', () => {
        expect(enterprise.products)
          .toEqual(TRELLO_ENTERPRISE.products)
        expect(enterprise.products)
          .not.toBe(TRELLO_ENTERPRISE.products)
      })

      test('Should not set products', () =>
        expect(() => {
          enterprise.products = [110]
        })
          .toThrow(TypeError)
      )
    })

    describe('userTypes', () => {
      test('Should return a copy of the user types', () => {
        expect(enterprise.userTypes)
          .toEqual(TRELLO_ENTERPRISE.userTypes)
        expect(enterprise.userTypes)
          .not.toBe(TRELLO_ENTERPRISE.userTypes)
      })

      test('Should not set userTypes', () =>
        expect(() => {
          enterprise.userTypes = {
            all: 6,
            member: 5,
            collaborator: 0,
            none: 1
          }
        })
          .toThrow(TypeError)
      )
    })
  })
})
