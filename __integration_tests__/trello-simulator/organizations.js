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
const ObjectID = require('bson').ObjectID

router.post('/', createOrganization)
router.get('/:id', getOrganization)
router.put('/:id', updateOrganization)
router.delete('/:id', deleteOrganization)

function getOrganization(req, res) {
  const organization = organizationsDatabase().findOne({id: req.params.id})

  if (_.isNil(organization)) {
    res.status(404).send()
  } else {
    res.status(200).send(_.omit(organization, ['$loki', 'meta']))
  }
}

function createOrganization(req, res) {
  const query = req.query
  const id = new ObjectID()
  const name = _.get(query, 'name', _.replace(_.lowerCase(query.displayName), / /g, ''))

  const organization = {
    id: id.toString(),
    name: name,
    displayName: query.displayName,
    desc: _.get(query, 'desc'),
    descData: {
      emoji: {}
    },
    url: `https://trello.com/${name}`,
    website: _.get(query, 'website'),
    teamType: null,
    logoHash: null,
    logoUrl: null,
    products: [],
    powerUps: [],
    idMemberCreator: '5d73cc19f1fadf09deb88620',
    limits: {}
  }

  organizationsDatabase().insert(organization)

  res.status(201).send(_.omit(organization, ['$loki', 'meta']))
}

function updateOrganization(req, res) {
  const organization = organizationsDatabase()
    .findOne({id: req.params.id})

  if (_.isNil(organization)) {
    res.status(404).send()
  } else {
    const updatedOrganization = _.assign(
      organization,
      _.pick(req.query, ['name', 'displayName', 'desc', 'website'])
    )

    organizationsDatabase().update(updatedOrganization)

    res.status(200).send(_.omit(updatedOrganization, ['$loki', 'meta']))
  }
}

function deleteOrganization(req, res) {
  const organization = organizationsDatabase()
    .findOne({id: req.params.id})

  if (_.isNil(organization)) {
    res.status(404).send()
  } else {
    organizationsDatabase().remove(organization)
    res.status(200).send()
  }
}

function organizationsDatabase() {
  return trelloDatabase.getCollection('organizations')
}

module.exports = router
