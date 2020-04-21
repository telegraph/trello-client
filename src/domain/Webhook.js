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
import {
  validateNotBlankTextField, validateNotNullBooleanField,
  validateNotNullUrlField,
  validateNullableTextField
} from './validators/common-validators'

/**
 * Webhooks allow developers to receive updates regarding actions that have occurred in Trello.
 */
export default class Webhook {

  /**
   * Webhook constructor.
   * @param {!Object} trelloWebhookObject Trello API webhook object.
   */
  constructor(trelloWebhookObject) {
    if (_.isNil(trelloWebhookObject) || !_.isObject(trelloWebhookObject)) {
      throw new TypeError('trelloCardObject parameter must be a not null object')
    }
    this._trelloObject = _.cloneDeep(trelloWebhookObject)
  }

  /**
   * ID of the webhook.
   * @type {string}
   */
  get id() {
    return this._trelloObject.id
  }

  /**
   * Webhook's description.
   * @type {string}
   */
  get description() {
    return this._trelloObject.description
  }

  /**
   * Sets webhook's description.
   * @type {string}
   */
  set description(value) {
    validateNullableTextField('description', value)
    this._trelloObject.description = value
  }

  /**
   * ID of the Trello object the webhook is watching.
   * This can be any Trello object ID (list, board, card, member, etc.).
   * @type {string}
   */
  get modelId() {
    return this._trelloObject.idModel
  }

  /**
   * Sets ID of the Trello object the webhook is watching.
   * This can be any Trello object ID (list, board, card, member, etc.).
   * @type {string}
   */
  set modelId(value) {
    validateNotBlankTextField('modelId', value)
    this._trelloObject.idModel = value
  }

  /**
   * The URL that the webhook will POST information to.
   * @type {string}
   */
  get callbackUrl() {
    return this._trelloObject.callbackURL
  }

  /**
   * Sets the URL that the webhook will POST information to.
   * @type {string}
   */
  set callbackUrl(value) {
    validateNotNullUrlField('callbackUrl', value)
    this._trelloObject.callbackURL = value
  }

  /**
   * Determines whether the webhook is active or not.
   * @type {boolean}
   */
  get active() {
    return this._trelloObject.active
  }

  /**
   * Sets if the webhook is active or not.
   * @type {boolean}
   */
  set active(value) {
    validateNotNullBooleanField('active', value)
    this._trelloObject.active = value
  }
}
