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

const {dest, parallel, series, src} = require('gulp')
const babel = require('gulp-babel')
const del = require('del')
const jeditor = require('gulp-json-editor')
const nodemon = require('gulp-nodemon')

const SRC_FOLDER = 'src'
const BUILD_FOLDER = 'dist'
const DOCUMENTATION_FOLDER = 'docs'
const INTEGRATION_TEST_FOLDER = '__integration_tests__'
const REPORTS_FOLDER = 'reports'
const VERSION = process.env.TAG_NAME ? process.env.TAG_NAME : '2.0.0-LOCAL_SNAPSHOT'

exports.build = series(clean, productionEnv, parallel(transpileSources, copyResources))
exports.clean = clean
exports['clean-all'] = parallel(clean, cleanDependencies)
exports['trello-watch'] = trelloSimulatorWatch

function clean() {
  return del([
    BUILD_FOLDER,
    DOCUMENTATION_FOLDER,
    REPORTS_FOLDER
  ])
}

function cleanDependencies() {
  return del(['node_modules'])
}

async function productionEnv() {
  process.env.NODE_ENV = 'production'
}

function copyResources() {
  return src('package.json')
    .pipe(
      jeditor({
        devDependencies: [],
        version: VERSION
      })
    )
    .pipe(
      dest(BUILD_FOLDER)
    )
}

function transpileSources() {
  return src(`${SRC_FOLDER}/**/*.js`)
    .pipe(
      babel()
    )
    .pipe(
      dest(`${BUILD_FOLDER}/src`)
    )
}

async function trelloSimulatorWatch() {
  return nodemon({
    delay: 2000,
    script: `${INTEGRATION_TEST_FOLDER}/trello-simulator/index.js`,
    watch: [`${INTEGRATION_TEST_FOLDER}/trello-simulator`]
  })
}
