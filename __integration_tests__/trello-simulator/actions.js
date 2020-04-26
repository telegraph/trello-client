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

const _ = require('lodash')
const express = require('express')
const router = express.Router()

router.get('/:id', getAction)
router.get('/:id/display', getActionDisplay)

function getAction(req, res) {
  const action = actionsDatabase().findOne({id: req.params.id})

  if (_.isNil(action)) {
    res.status(404).send()
  } else {
    res.status(200).send(_.omit(action, ['$loki', 'meta']))
  }
}

function getActionDisplay(req, res) {
  const action = actionsDatabase().findOne({id: req.params.id})

  if (_.isNil(action)) {
    res.status(404).send()
  } else {
    res.status(200).send(action.display)
  }
}

function actionsDatabase() {
  return trelloDatabase.getCollection('actions')
}

module.exports = router
