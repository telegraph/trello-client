import _ from 'lodash'
import {ValidationError} from './ValidationError'

const STATUS_VALID_VALUES = ['complete', 'incomplete']

/**
 * Validates a check item status field value, it should be:
 *   - not null
 *   - 'complete' or 'incomplete'
 * @param {*} value
 * @throws {ValidationError}
 */
export function validateCheckItemStatus(value) {
  if (_.isNil(value) || !_.isString(value)) {
    throw new ValidationError('Status must be a not null string')
  }

  if (!STATUS_VALID_VALUES.includes(value)) {
    throw new ValidationError('Status string must be "complete" or "incomplete"')
  }
}
