
const httpHelper = require('./helper/http');

const DefaultConfig = {
    baseUrl: 'https://api.trello.com/1'
};

const TrelloCards         = require('./trello-card');
const TrelloLists         = require('./trello-list');
const TrelloBoards        = require('./trello-board');
const TrelloOrganizations = require('./trello-organization');

/**
 * Validates the configuration object.
 * @param  {Object} config
 * @param  {String} config.key
 * @param  {String} config.token
 * @return {Array<String>}
 */
function validateConfig(config){
    let errors = [];

    if( !config.key ){
        errors.push('Missing config \'config.key\' - Undefined Trello Key');
    }
    if( !config.token ){
        errors.push('Missing config \'config.token\' - Undefined Trello Token');
    }
    return errors;
}

class TrelloClient {

    /**
     * @param  {Object} config
     * @param  {String} config.key
     * @param  {String} config.token
     * @param  {String} config.baseUrl
     */
    constructor(config){
        this._config = Object.assign({}, DefaultConfig, config);
        /* Validate configurations */

        let errors = validateConfig(this._config);
        if( errors.length > 0 ){
            throw new Error(`Failed to build Trello Client:\n\t${errors.join('\n\t')}`);
        }
    }

    /**
     * Returns a board object containing all board operations
     * @Lazy
     * @return {TrelloBoards}
     */
    get board() {
        if( !this._board ){
            this._board = new TrelloBoards(this);
        }
        return this._board;
    }

    /**
     * Returns a organization object containing all organization operations
     * @Lazy
     * @return {TrelloOrganizations}
     */
    get organization(){
        if( !this._organization ){
            this._organization = new TrelloOrganizations(this);
        }
        return this._organization;
    }

    /**
     * Returns a card object containing all card operations
     * @Lazy
     * @return {TrelloCards}
     */
    get card(){
        if( !this._card ){
            this._card = new TrelloCards(this);
        }
        return this._card;
    }

    /**
     * Returns a list object containing all list operations
     * @Lazy
     * @return {TrelloLists}
     */
    get list(){
        if( !this._list ){
            this._list = new TrelloLists(this);
        }
        return this._list;
    }

    get   (uri      ){return httpHelper('get',    uri, this._config); }
    delete(uri      ){return httpHelper('delete', uri, this._config); }
    post  (uri, data){return httpHelper('post',   uri, this._config, data);}
    put   (uri, data){return httpHelper('put',    uri, this._config, data);}
}

module.exports = TrelloClient;
