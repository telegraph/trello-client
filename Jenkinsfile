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

pipeline {
  agent any

  options {
    ansiColor('xterm')
    disableConcurrentBuilds()
  }

  environment {
    BUILD_VERSION = "${env.TAG_NAME ? env.TAG_NAME : 'commit-' + env.GIT_COMMIT.substring(0, 7)}"
    DEPLOYMENT_ENVIRONMENT = "${env.TAG_NAME ? 'prod' : 'preprod'}"
    MAIN_BRANCH = '2.x.x'
    PROJECT_NAME = 'trello-client'
  }

  tools {
    nodejs 'NodeJS-12.16'
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Quality Assurance') {
      when {
        not { buildingTag() }
      }
      parallel {
        stage('Static code analysis') {
          steps {
            sh '''
              npm run lint -- -f checkstyle -o reports/eslint.xml || true
              npm run cpd
            '''
          }
          post {
            always {
              recordIssues aggregatingResults: true, sourceCodeEncoding: 'UTF-8', tools: [
                esLint(pattern: 'reports/eslint.xml'),
                cpd(pattern: 'reports/cpd/jscpd-report.xml')
              ]
            }
          }
        }

        stage('Unit testing') {
          steps {
            sh 'npm test'
          }
          post {
            always {
              junit 'reports/test/junit.xml'
            }
            success {
              step([
                $class: "CloverPublisher",
                cloverReportDir: "reports/coverage",
                cloverReportFileName: "clover.xml"
              ])
            }
          }
        }

        stage('Integration testing') {
          when {
            anyOf {
              branch "${env.MAIN_BRANCH}"
              changeRequest()
            }
          }
          steps {
            sh '''
              npm run trello &
              TRELLO_SERVICE_PID=$!
              timeout 60 bash -c 'while [[ "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health)" != "200" ]]; do sleep 1; done'
              npm run test:integration
              kill $TRELLO_SERVICE_PID
            '''
          }
          post {
            always {
              junit 'reports/test/junit-integration.xml'
            }
          }
        }

        stage('Vulnerabilities analysis') {
          when {
            branch "${env.MAIN_BRANCH}"
          }
          tools {
            snyk 'snyk-latest'
          }
          environment {
            SNYK_TOKEN = credentials('snyk-newsroom')
          }
          steps {
            sh 'snyk monitor --org=newsroom'
          }
        }

        stage('Comment pull request') {
          when { changeRequest() }
          environment {
            REPOSITORY_NAME = "${env.GIT_URL.tokenize('/')[3].split('\\.')[0]}"
            REPOSITORY_OWNER = "${env.GIT_URL.tokenize('/')[2]}"
          }
          steps {
            ViolationsToGitHub([
              gitHubUrl: env.GIT_URL,
              repositoryName: env.REPOSITORY_NAME,
              pullRequestId: env.CHANGE_ID,
              repositoryOwner: env.REPOSITORY_OWNER,

              createCommentWithAllSingleFileComments: false,
              createSingleFileComments: true,
              commentOnlyChangedContent: true,
              keepOldComments: false,
              violationConfigs: [
                [parser: 'CHECKSTYLE', reporter: 'ESLint', pattern: 'reports/eslint.xml'],
                [parser: 'CPD', reporter: 'CPD', pattern: 'reports/cpd/jscpd-report.xml']
            ]])
          }
        }
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }
}
