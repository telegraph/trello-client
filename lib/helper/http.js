
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
    let path;
    let queryObj;
    if( uri.includes('?') ){
        path     = uri.split('?')[0];
        queryObj = queryString.parse(uri.replace(`${path}?`, ''))
    }else{
        path     = uri;
        queryObj = {};
    }
    let httpRequest = {
        method: method,
        url   : `${config.baseUrl}/${path}`,
        qs    : Object.assign(queryObj, {token: config.token, key: config.key }),
        body  : data,
        json  : true
    };

    return new Promise(function(resolve, reject){
        request(httpRequest, (error, response, data) => {
            if( error || response.statusCode >= 400 ){
                if( error ){
                    reject(error);
                }else if( response.statusCode === 401 ){
                    reject( new Error('Unauthorized request - invalid Key/Token Ids.'));
                }
                if( response.statusCode === 404 ){
                    reject( new Error('Not found - requested item was not found.'));
                }
            }else{
                resolve(data);
            }
        })
    });
}

/**
 * @type {doRequest}
 */
module.exports = doRequest;
