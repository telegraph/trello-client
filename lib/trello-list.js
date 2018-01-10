
'use strict';

const _ = require('lodash');

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
     * @param {Boolean} force force list creation
     * @return {Promise<{name:String, idBoard:String, id:String}>}
     */
    create(data, force = false){
        return (force ? Promise.reject( null ) : this.getByName(data.idBoard, data.name))
            .catch( ignore => this._client.post(`/lists`, data) );
    }

    setPosition(idList, position){
        return this._client.put(`/lists/${idList}/pos?value=${position}`)
    }

    getByName(idBoard, listName){
        return this._client.board.getLists(idBoard)
            .then( lists => lists.filter(_ => _.name === listName) )
            .then( lists => {
                if(lists.length === 1){
                    return lists[0];
                }
                if( lists.length > 1 ){
                    console.error(`Zero or multiple lists were found with the matching name '${listName}' - [${lists.map( item => JSON.stringify(item)).join(",")}]`);
                }
                throw new Error  (`Zero or multiple lists were found with the matching name '${listName}' - [${lists.map( item => JSON.stringify(item)).join(",")}]`);
            })
            ;
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
        return this._rotate(idBoard, -Math.abs(count));
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
        return this._rotate(idBoard, Math.abs(count));
    }

    _rotate(idBoard, count){
        return this.listForBoardId(idBoard)
            .then( lists => {
                let posList = lists.map( _ => _.pos);
                let idsList = lists.map( _ => _.id )
                    .rotate( count );

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
     * @param options {Object}
     * @param options.archiveCards {Boolean} If this is set to true, all cards on the list will be archived before the list is archived
     */
    archiveList(listId, options){
        if (options && options.archiveCards === true) {
            return this.archiveAllCardsOnList(listId).then(() => {
                options.archiveCards = false;
                return this.archiveList(listId, options);
            });
        }
        return this._client.put(`/lists/${listId}/closed?value=true`);

    }



    /**
     * TODO - Apply a Shift Right Operation to all lists inside a board
     *
     * @param data  {{name:String, idBoard:String}} List Details
     * @param index {Number} list index
     */
    createAtIndex(data, index){

    }

    /**
     * TODO - Apply a Shift Left Operation to all lists inside a board
     *
     * @param idBoard {String} Board Identifier
     * @param count   {Number} number of items to be shifted
     */
    shiftLeft(idBoard, count) {
        // return this.listForBoardId(idBoard)
    }

    /**
     * TODO - Apply a Shift Right Operation to all lists inside a board
     *
     * @param idBoard {String} Board Identifier
     * @param count   {Number} number of items to be shifted
     */
    shiftRight(idBoard, count) {
        // return this.listForBoardId(idBoard)
    }

    /**
     * Move a list
     *
     * @param listId {String} ID of the list to be moved
     * @param toBoardId {String} Board Identifier to move the list to
     * @param toListName {Number} New name of the list
     * @param pos {(String | Number)} The position to place the list, possible values are "top", "bottom", or a positive floating point number
     */
    moveList(listId, toBoardId, toListName, pos = 'bottom') {
        return this._client.put(`/lists/${listId}?name=${toListName}&closed=false&idBoard=${toBoardId}&pos=${pos}`);
    }

    /**
     * copy a list
     *
     * @param listId {String} ID of the list to be copied
     * @param toBoardId {String} Board Identifier to copy the list to
     * @param toListName {Number} Name of the cloned list
     * @param pos {(String | Number)} The position to place the list, possible values are "top", "bottom", or a positive floating point number
     */
    copyList(fromListId, toBoardId, toListName, pos = 'bottom') {
        return this._client.post(`/lists/?name=${encodeURIComponent(toListName)}&idBoard=${toBoardId}&idListSource=${fromListId}&pos=${pos}`);
    }

    /**
     * Move all cards to list
     *
     * @param listId {String} ID of the list cards should be move to
     * @param toBoardId {String} Board Identifier of the board containing the list to move the cards to
     * @param toListId {Number} ID of the list to move the cards to
     */
    moveCards(listId, toBoardId, toListId) {
        return this._client.post(`/lists/${listId}/moveAllCards?idList=${toListId}&idBoard=${toBoardId}`);
    }

    /**
     * rename a list
     *
     * @param listId {String} ID of the list to be copied
     * @param newName {Number} Name for the list to be changed to
     */
    renameList(listId, newName) {
        return this._client.put(`/lists/${listId}/?value=${newName}`);
    }


}

module.exports = TrelloLists;
