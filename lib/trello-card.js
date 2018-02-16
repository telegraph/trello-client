
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
     *
     */
    getCardDetails(idCard){
        return this._client.get(`cards/${idCard}`);
    }
}

module.exports = TrelloCards;
