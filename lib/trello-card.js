
'use strict';

const _ = require('lodash');

class TrelloCards {

    /**
     * @param trelloClient {TrelloClient}
     */
    constructor(trelloClient){
        this._client = trelloClient;
    }

    /**
     * Update a card
     *
     * @param {String} idCard
     * @param {Object} parameters - valid options can be found here https://developers.trello.com/reference#cardsid-1
     *
     */
    updateCard(idCard, parameters){
        let queryString= '';
        Object.keys(parameters).forEach(function(key) {
            if (queryString.length > 0) {
                queryString += '&';
            }
            queryString += `${key}=${encodeURIComponent(parameters[key])}`;

        });
        return this._client.put(`cards/${idCard}/?${queryString}`);
    }

    /**
     * Get a cards details
     *
     * @param {String} idCard
     * @param {Object} options
     * @param {Boolean} [options.customFields] If custom fields should be included in the response
     *
     */
    getCardDetails(idCard, options){
        let queryParams = [];
        if (options.customFields) {
            queryParams.push('');
        }
        let url = `cards/${idCard}`;
        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }
        return this._client.get(url);
    }
}

module.exports = TrelloCards;
