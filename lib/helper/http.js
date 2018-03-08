
'use strict';

const request     = require('request');
const queryString = require('querystring');

/**
 *
 * @param method
 * @param uri
 * @param config
 * @param data
 * @returns {Promise<any>}
 */
function doRequest( method, uri, config, data ){

    const getError = (error, response) => {
        if (response.body) {
            return( new Error(response.body));
        }
        if( response.statusCode === 401 ){
            return( new Error('Unauthorized request - invalid Key/Token Ids.'));
        }
        if( response.statusCode === 404 ){
            return( new Error('Not found - requested item was not found.'));
        }
        return(new Error('An unknown error occurred'));
    };
    let path     = uri;
    let queryObj = {};
    if( uri.includes('?') ){
        path     = uri.split('?')[0];
        queryObj = queryString.parse(uri.replace(`${path}?`, ''));
    }
    let httpRequest = {
        method,
        url   : `${config.baseUrl}/${path}`,
        qs    : Object.assign(queryObj, {token: config.token, key: config.key }),
        body  : data,
        json  : true
    };

    return new Promise(function(resolve, reject){
        request(httpRequest, (error, response, data) => {
            if( error || response.statusCode >= 400 ){
                if( error ){
                    return reject(error);
                }
                return reject(getError(error, response));
            }
            resolve(data);
        });
    });
}

/**
 * @type {doRequest}
 */
module.exports = doRequest;
