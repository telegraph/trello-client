
'use strict';

const request     = require('request');
const queryString = require('querystring');

function extractQueryObj(uri){
    return !uri.includes('?') ? {} : queryString.parse(uri.split('?').join("?"))
}

function doRequest( method, uri, config, data ){

    let queryObj    = extractQueryObj(uri);
    let httpRequest = {
        method: method,
        url   : `${config.baseUrl}/${uri}`,
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

module.exports = doRequest;
