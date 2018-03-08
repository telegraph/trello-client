
'use strict';

const _ = require('lodash');
const UpdatableListKeys = [
    'name'
];

function doRotate (arr, count) {
    let res = [].concat(arr);

    count -= res.length * Math.floor(count / res.length);
    res.push.apply(res, res.splice(0, count));
    return res;
}

class TrelloLists {

    /**
     * @param trelloClient {TrelloClient}
     */
    constructor(trelloClient){
        this._client = trelloClient;
    }

    /**
     * Create a list if it does not exist.
     *
     * @param {object} data
     * @param {string} data.name
     * @param {string} data.idBoard
     * @param {(String | Number)} [data.pos] The position to place the list, possible values are "top", "bottom", or a positive floating point number
     * @param {Boolean} force force list creation
     * @return {Promise<{name:String, idBoard:String, id:String}>}
     */
    create(data, force = false){
        return (force ? Promise.reject( null ) : this.getByName(data.idBoard, data.name))
            .catch( (ignore) => this._client.post('/lists', data) );
    }

    /**
     * This method sets a list position.
     *
     * @param idList {String} List Id.
     * @param position {String|Number} List Position
     * @return {Promise<*>}
     */
    setPosition(idList, position){
        return this._client.put(`/lists/${idList}/pos?value=${position}`);
    }

    /**
     * This method is used to search for a list By name in a Board.
     * The board is identified by a `idBoard`.
     *
     * @param idBoard {String} Board Identifier
     * @param listName {String} List Name to search for
     * @param allowMultiple {Boolean} If this is set to true, an array of lists will be returned, otherwise only one list will be returned or an error thown if the number of found list !==1
     * @return {PromiseLike<T>}
     */
    getByName(idBoard, listName, allowMultiple){
        return this._client.board.getLists(idBoard)
            .then( (lists) => lists.filter((_) => _.name === listName) )
            .then( (lists) => {
                if (allowMultiple) {
                    return Promise.resolve(lists);
                }
                if(lists.length === 1){
                    return Promise.resolve(lists[0]);
                }
                return Promise.reject(new Error  (`Zero or multiple lists were found with the matching name '${listName}' - [${lists.map( (item) => JSON.stringify(item)).join(',')}]`));
            });
    }


    /***
     * This method returns the id of all cards on a list
     *
     * @param idList {String} List Identifier
     * @param [params] {Array<{String}>} Optional array of fields to return, if none are provided then all will be returned
     * @return {Promise<Array.<{id:String}>>}
     */
    getAllCards(idList, params){
        let queryString = '';
        if (params) {
            queryString = `?fields=${params.join(',')}`;
        }
        return this._client.get(`/lists/${idList}/cards${queryString}`);
    }

    /**
     * Apply a Rotate Left Operation to all lists inside a board.
     *
     * Operation:
     *```
     *   +------------------------------------+
     *   |   +---+---+---+---+---+---+---+    |
     *   +-- | 1 | 2 | 3 | . | . | . | n | <--+
     *       +---+---+---+---+---+---+---+
     *```
     *
     * Outcome:
     *```
     *        +---+---+---+---+---+---+---+
     *        | 2 | 3 | . | . | . | n | 1 |
     *        +---+---+---+---+---+---+---+
     *```
     *
     * @param idBoard {String} Board Identifier
     * @param count   {Number} number of items to be rotated
     */
    rotateLeft(idBoard, count) {
        return this._rotate(idBoard, Math.abs(count));
    }

    /**
     * Apply a Rotate Right Operation to all lists inside a board.
     *
     * Operation:
     *```
     *   +------------------------------------+
     *   |    +---+---+---+---+---+---+---+   |
     *   +--> | 1 | 2 | 3 | . | . | . | n | --+
     *        +---+---+---+---+---+---+---+
     *```
     *
     * Outcome:
     *```
     *        +---+---+---+---+---+---+---+
     *        | n | 1 | 2 | . | . | . |n-1|
     *        +---+---+---+---+---+---+---+
     *```
     *
     * @param idBoard {String} Board Identifier
     * @param count   {Number} number of items to be rotated
     */
    rotateRight(idBoard, count) {
        return this._rotate(idBoard, -Math.abs(count));
    }

    _rotate(idBoard, count){
        return this._client.board.getLists(idBoard)
            .then( (lists) => {
                let posList = lists.map( (_) => _.pos);
                let idsList = doRotate(lists.map( (_) => _.id ), count);

                return Promise.all( idsList.map((idList, idx) => {
                    return this.setPosition(idList, posList[idx]);
                }));
            });
    }

    /**
     * Archive all cards on a list
     *
     * @param listId  {String}
     */
    archiveAllCardsOnList(listId){
        return this._client.post(`/lists/${listId}/archiveAllCards`);
    }


    /**
     * Archive a list
     *
     * @param listId  {String}
     * @param options {?Object}
     * @param options.archiveCards {Boolean} If this is set to true, all cards on the list will be archived before the list is archived
     */
    archiveList(listId, options){
        return (_.get(options, 'archiveCards', false) ? this.archiveAllCardsOnList(listId) : Promise.resolve())
            .then(() => this._client.put(`/lists/${listId}/closed?value=true`));
    }

/*
    /!**
     * TODO - Apply a Shift Right Operation to all lists inside a board
     *
     * @param data  {{name:String, idBoard:String}} List Details
     * @param index {Number} list index
     *!/
    createAtIndex(data, index){

    }

    /!**
     * TODO - Apply a Shift Left Operation to all lists inside a board
     *
     * @param idBoard {String} Board Identifier
     * @param count   {Number} number of items to be shifted
     *!/
    shiftLeft(idBoard, count) {
        // return this.listForBoardId(idBoard)
    }

    /!**
     * TODO - Apply a Shift Right Operation to all lists inside a board
     *
     * @param idBoard {String} Board Identifier
     * @param count   {Number} number of items to be shifted
     *!/
    shiftRight(idBoard, count) {
        // return this.listForBoardId(idBoard)
    }
*/

    /**
     * Move a list
     *
     * @param toBoardId {String} Board Identifier to move the list to
     * @param fromListId {String} ID of the list to be moved
     * @param toListName {String} New name of the list
     * @param pos {(String | Number)} The position to place the list, possible values are "top", "bottom", or a positive floating point number
     */
    moveList(toBoardId, fromListId, toListName, pos = 'bottom') {
        return this._client.put(`/lists/${fromListId}?name=${encodeURIComponent(toListName)}&closed=false&idBoard=${toBoardId}&pos=${pos}`);
    }

    /**
     * copy a list
     *
     * @param toBoardId {String} Board Identifier to copy the list to
     * @param fromListId {String} ID of the list to be copied
     * @param toListName {String} Name of the cloned list
     * @param pos {(String | Number)} The position to place the list, possible values are "top", "bottom", or a positive floating point number
     */
    copyList(toBoardId, fromListId, toListName, pos = 'bottom') {
        return this._client.post(`/lists/?name=${encodeURIComponent(toListName)}&idBoard=${toBoardId}&idListSource=${fromListId}&pos=${pos}`);
    }

    /**
     * Move all cards to list
     *
     * @param toBoardId {String} Board Identifier of the board containing the list to move the cards to
     * @param listId {String} ID of the list cards should be move to
     * @param toListId {String} ID of the list to move the cards to
     */
    moveCards(toBoardId, listId, toListId) {
        return this._client.post(`/lists/${listId}/moveAllCards?idList=${toListId}&idBoard=${toBoardId}`);
    }

    /**
     * This method allow us to update a list definition. If the list id is not present or not
     * valid properties exist to be updated, an error is thrown.
     *
     * @param {object} list List object to be updated
     * @param {string} [list.id]
     * @param {string} [list.name]
     * @return {Promise<*>}
     **/
    update(list){
        if( !list.id ){
            return Promise.reject(new Error('No board \'id\' found to proceed with update.'));
        }
        let keyValues = Object.keys(list)
            .filter( (key) => UpdatableListKeys.includes(key))
            .map( (key) => ([key, list[key]]));

        if( keyValues.length === 0 ){
            return Promise.reject(new Error(`No updatable keys were found at '${JSON.stringify(list)}'.`));
        }
        return this._client.put(`/lists/${list.id}?${keyValues.map(([key, val]) => `${key}=${val}`).join('&')}`);
    }

    /**
     * rename a list
     *
     * @param listId {String} ID of the list to be renamed
     * @param newName {String} Name for the list to be changed to
     *
     * @deprecated Please use `update({id:listId, name:newName})`
     */
    /* istanbul ignore next */
    renameList(listId, newName) {
        /* istanbul ignore next */
        return this.update({id:listId, name:newName});
    }
}

module.exports = TrelloLists;
