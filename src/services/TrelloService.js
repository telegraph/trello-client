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

import axios from 'axios'
import {isBlank} from '../utils/string-utils'

const TRELLO_API_BASE_URL = 'https://api.trello.com/1'

export default class TrelloService {

  constructor(apiKey, apiToken, baseUrl = TRELLO_API_BASE_URL) {
    if (isBlank(apiKey) || isBlank(apiToken)) {
      throw new TypeError('apiKey and apiToken parameters are mandatory')
    }
    configureAxios(apiKey, apiToken, baseUrl)
  }

  async get(path, params = {}) {
    if (isBlank(path)) {
      throw new TypeError('path parameter is mandatory')
    }

    return axios.get(path, {
      params: params
    })
      .then(response => response.data)
  }

  async put(path, params = {}) {
    if (isBlank(path)) {
      throw new TypeError('path parameter is mandatory')
    }

    return axios.put(path, null, {
      params: params
    }).then(response => response.data)
  }

  async post(path, params = {}) {
    if (isBlank(path)) {
      throw new TypeError('path parameter is mandatory')
    }

    return axios.post(path, null,{
      params: params
    }).then(response => response.data)
  }

  async delete(path) {
    if (isBlank(path)) {
      throw new TypeError('path parameter is mandatory')
    }
    return axios.delete(path)
  }
}

function configureAxios(apiKey, apiToken, baseUrl) {
  axios.defaults.baseURL = baseUrl

  axios.interceptors.request.use(config => {
    config.params = {
      key: apiKey,
      token: apiToken,
      ...config.params,
    }
    return config
  })

}
