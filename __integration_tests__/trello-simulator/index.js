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
const loki = require('lokijs')
const morgan = require('morgan')

const actions = require('./actions')
const organizations = require('./organizations')

const CONFIG = require('./config')
const ACTIONS = require('./data/actions.json')

global.trelloDatabase = initDatabase()

const app = express()
app.use(morgan('combined'))
app.use(authenticationMiddleware)
app.use('/organizations', organizations)
app.use('/actions', actions)
app.get('/health', (req, res) => res.status(200).send('OK'))

app.listen(CONFIG.port, () => console.log(`Trello simulator listening on port ${CONFIG.port}!`))

function authenticationMiddleware(req, res, next) {
  if (req.path === '/health' || _.get(req, 'query.key') === CONFIG.apiKey
      && _.get(req, 'query.token') === CONFIG.apiToken) {
    next()
  } else {
    res.status(403).send('Unauthorized')
  }
}

function initDatabase() {
  const database = new loki('Trello Database')

  database.addCollection('actions')
  database.addCollection('organizations')

  ACTIONS.map(action =>
    database.getCollection('actions').insert(action))

  return database
}
