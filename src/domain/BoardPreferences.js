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
  validateNotNullBooleanField,
  validateNotNullStringOptionField,
  validateNullableBooleanField, validateNullableStringOptionField
} from './validators/common-validators'

export default class BoardPreferences {

  /**
   * Board preferences constructor.
   * @param {Object} trelloBoardPreferences
   */
  constructor(trelloBoardPreferences) {
    if (_.isNil(trelloBoardPreferences) || !_.isObject(trelloBoardPreferences)) {
      throw new TypeError('trelloBoardPreferences must be a not null Trello board preferences object')
    }

    this._preferences = trelloBoardPreferences
  }

  /**
   * Returns the background.
   * The id of a custom background or one of: blue, orange, green, red, purple, pink, lime, sky, grey.
   * @type {string}
   */
  get background() {
    return this._preferences.background
  }

  /**
   * Sets the background.
   * The id of a custom background or one of: blue, orange, green, red, purple, pink, lime, sky, grey.
   * @type {string}
   */
  set background(background) {
    this._preferences.background = background
  }

  /**
   * Returns if the calendar feed is enabled or not.
   * @type {boolean}
   */
  get calendarFeedEnabled() {
    return this._preferences.calendarFeedEnabled
  }

  /**
   * Sets the calendar feed to enabled.
   * @type {boolean}
   */
  set calendarFeedEnabled(calendarFeedEnabled) {
    validateNullableBooleanField('calendarFeedEnabled', calendarFeedEnabled)
    this._preferences.calendarFeedEnabled = calendarFeedEnabled
  }

  /**
   * Returns card aging plugin mode.
   * One of: pirate, regular.
   * @type {string}
   */
  get cardAging() {
    return this._preferences.cardAging
  }

  /**
   * Sets card aging plugin mode.
   * One of: pirate, regular.
   * @type {string}
   */
  set cardAging(cardAging) {
    validateNullableStringOptionField('cardAging', [
      'pirate',
      'regular'
    ], cardAging)
    this._preferences.cardAging = cardAging
  }

  /**
   * Returns whether card covers should be displayed on this board.
   * @type {boolean}
   */
  get cardCovers() {
    return this._preferences.cardCovers
  }

  /**
   * Sets whether card covers should be displayed on this board.
   * @type {boolean}
   */
  set cardCovers(cardCovers) {
    this._preferences.cardCovers = cardCovers
  }

  /**
   * Returns who can comment on cards on this board.
   * One of: disabled, members, observers, org, public
   * @type {string}
   */
  get comments() {
    return this._preferences.comments
  }

  /**
   * Sets who can comment on cards on this board.
   * One of: disabled, members, observers, org, public
   * @type {string}
   */
  set comments(comments) {
    validateNotNullStringOptionField('comments', [
      'disabled',
      'members',
      'observers',
      'org',
      'public'
    ], comments)
    this._preferences.comments = comments
  }

  /**
   * Returns whether should hide who voted on cards or not.
   * @type {boolean}
   */
  get hideVotes() {
    return this._preferences.hideVotes
  }

  /**
   * Sets whether should hide who voted on cards or not.
   * @type {boolean}
   */
  set hideVotes(hideVotes) {
    validateNullableBooleanField('hideVotes', hideVotes)
    this._preferences.hideVotes = hideVotes
  }

  /**
   * Return who can invite people to this board.
   * One of: admins, members.
   * @type {string}
   */
  get invitations() {
    return this._preferences.invitations
  }

  /**
   * Return who can invite people to this board.
   * One of: admins, members.
   * @type {string}
   */
  set invitations(invitations) {
    validateNotNullStringOptionField('invitations', ['admins', 'members'], invitations)
    this._preferences.invitations = invitations
  }

  /**
   * Returns permission level.
   * One of: org, private, public.
   * @type {string}
   */
  get permissionLevel() {
    return this._preferences.permissionLevel
  }

  /**
   * Sets permission level.
   * One of: org, private, public.
   * @type {string}
   */
  set permissionLevel(level) {
    validateNotNullStringOptionField('permissionLevel', ['org', 'private', 'public'], level)
    this._preferences.permissionLevel = level
  }

  /**
   * Returns whether team members can join the board themselves.
   * @type {boolean}
   */
  get selfJoin() {
    return this._preferences.selfJoin
  }

  /**
   * Sets whether team members can join the board themselves.
   * @type {boolean}
   */
  set selfJoin(selfJoin) {
    validateNotNullBooleanField('selfJoin', selfJoin)
    this._preferences.selfJoin = selfJoin
  }

  /**
   * Returns who can vote on this board.
   * One of disabled, members, observers, org, public
   * @type {string}
   */
  get voting() {
    return this._preferences.voting
  }

  /**
   * Sets who can vote on this board.
   * One of disabled, members, observers, org, public
   * @type {string}
   */
  set voting(voting) {
    validateNotNullStringOptionField('voting', [
      'disabled',
      'members',
      'observers',
      'org',
      'public'
    ], voting)
    this._preferences.voting = voting
  }
}
