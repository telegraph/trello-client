
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
     * @param {Object} parameters - valid options can be found here https://developers.trello.com/reference#cardsid
     *
     */
    getCardDetails(idCard, parameters = {}){
        let queryString = '';
        Object.keys(parameters).forEach( (key) => {
            if (queryString.length > 0) {
                queryString += '&';
            }
            queryString += `${key}=${encodeURIComponent(parameters[key])}`;

        });

		const path = `cards/${idCard}`;
		const url = path + (queryString ? '?' + queryString : '');

		return this._client.get(url);
    }

    /**
     * Get a custom field on a card by name
     *
     * @param {String} idCard
     * @param {String} customFieldName
     *
     */
    getCardCustomDataByName(idCard, customFieldName) {
        return this.getCardDetails(idCard, {customFields: true})
            .then((cardDetails) => {
                return this._client.board.getCustomFields(cardDetails.idBoard)
                    .then((customFields) => {
                        return cardDetails.customFieldItems.map((cardCustomField) => {
                            const foundFields = customFields.filter((customField) => {
                                return customField.id === cardCustomField.idCustomField;
                            });
                            if (foundFields.length > 0) {
                                cardCustomField.name = foundFields[0].name;
                            }
                            return cardCustomField;
                        });
                    })
                    .then((customFields) => {
                        const foundFields = cardDetails.customFieldItems.filter((customField) => {
                            return customField.name === customFieldName;
                        });
                        if (foundFields.length > 0) {
                            return foundFields[0];
                        }
                        return Promise.reject('Field not found');
                    });
            });
    }

	/**
	 * Get a custom field on a card by name
	 *
	 * @param {String} idCard
	 *
	 */

	getChecklistData(idCard) {
		let url = `cards/${idCard}/checklists`;
		return this._client.get(url);
	}
}

module.exports = TrelloCards;
