
'use strict';

const _ = require('lodash');

class TrelloCards {

    /**
     * @param trelloClient {TrelloClient}
     */
    constructor(trelloClient){
        this._client = trelloClient;
    }
}

module.exports = TrelloCards;
