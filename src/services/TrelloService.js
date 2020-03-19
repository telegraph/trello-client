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
import axios from 'axios'

const TRELLO_API_BASE_URL = 'https://api.trello.com/1'

export default class TrelloService {

  constructor(apiKey, apiToken) {
    if (_.isNil(apiKey) || _.isNil(apiToken)) {
      throw new Error('apiKey and apiToken parameters are mandatory')
    }
    configureAxios(apiKey, apiToken)
  }

  async get(path, params = {}) {
    if (_.isNil(path)) {
      throw new Error('path parameter is mandatory')
    }

    return await axios.get(path, {
      params: params
    }).then(response => {
      return response.data
    })
  }

  async put(path, body = {}) {
    if (_.isNil(path)) {
      throw new Error('path parameter is mandatory')
    }
    return axios.post(path, {
      data: body
    })
  }

  async delete(path) {
    if (_.isNil(path)) {
      throw new Error('path parameter is mandatory')
    }
    return axios.delete(path)
  }
}

function configureAxios(apiKey, apiToken) {
  axios.defaults.baseURL = TRELLO_API_BASE_URL

  axios.interceptors.request.use(config => {
    config.params = {
      key: apiKey,
      token: apiToken,
      ...config.params,
    }
    return config
  })
}
