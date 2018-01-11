
'use strict';

const _ = require('lodash');

class TrelloBoards{

    /**
     * @param {TrelloClient} trelloClient
     */
    constructor(trelloClient){
        this._client = trelloClient;
    }

    /**
     * @param {String} searchTerm
     */
    searchFor(searchTerm){
        return this._client.get(`/search?query="${searchTerm}"&modelTypes=boards`)
            .then( body => body.boards);
    }

    /**
     * Create a board if it does not exist.
     *
     * @param {object} data
     * @param {String} data.name
     * @param {String} data.idOrganization
     * @param {Array} data.lists
     * @param {Boolean} force force list creation
     * @return {Promise<Array.<{name:String, idOrganization:String, id:String, lists:Array}>>}
     *
     */

    create(data, force = false){
        return (force ? Promise.reject(null) : this.getByName(data.idOrganization, data.name))
            .catch( ignore => this._client.post(`/boards`, _.omit(data, 'lists')) )
            .then( board => {
                let listsPromise = _.get(data, 'lists', []).length === 0 ? Promise.resolve([]) : Promise.all( data.lists.map( item => {
                    item.idBoard = board.id;
                    return this._client.list.create(item, force)
                }));
                return listsPromise.then( lists => _.set(board, 'lists', lists) );
            })
            ;
    }

    /**
     * TODO: Delete an existing board
     *
     * @param {string} boardId
     *
     **/

    delete(boardId){
        return this._client.delete(`/boards/${boardId}`);
    }


    /**
     * TODO: Delete an existing board
     *
     * @param {object} fromBoard
     * @param {string} [fromBoard.name] This must be set if id is not defined
     * @param {string} [fromBoard.id] This must be set if name is not defined
     * @param {object} toBoard
     * @param {String} toBoard.name
     * @param {String} toBoard.idOrganization
     * @param {Array}  toBoard.lists
     *
     **/

    clone(fromBoard, toBoard){
        if( !fromBoard.name && !fromBoard.id ){
            return Promise.reject(new Error(`Invalid fromBoard/toBoard objects - Id or name must be set '${JSON.stringify(fromBoard)}' - '${JSON.stringify(toBoard)}' `));
        }
        return (fromBoard.name ? this.searchFor(fromBoard.name) : this.getById(fromBoard.id))
            .then( fromBoard => this.getLists(fromBoard.id).then(lists => _.set(fromBoard, 'lists', lists)) )
            .then( fromBoard => {
                _.set(toBoard, 'lists',          fromBoard.lists);
                _.set(toBoard, 'idOrganization', fromBoard.idOrganization);
                return this.create(toBoard);
            })
            ;

    }

    /**
     * Get board by ID
     *
     * @param {string} idBoard
     *
     **/

    getById(idBoard){
        return this._client.get(`/boards/${idBoard}?fields=all`);
    }

    /**
     * TODO - Update
     *
     **/

    update(){
        console.info("Update")
    }

    /**
     * Create a board if it does not exist.
     *
     * @param {String} idBoards
     *
     */

    getLists(idBoards){
        return this._client.get(`/boards/${idBoards}/lists`);
    }


    /**
     * Get a board by name
     *
     * @param {String} idOrganization
     * @param {String} boardName
     *
     */

    getByName(idOrganization, boardName){
        return this.searchFor(boardName)
            .then( boards => !idOrganization ? boards : boards.filter(_ => _.idOrganization === idOrganization) )
            .then( boards => {
                if(boards.length === 1){
                    return boards[0];
                }
                if( boards.length > 1 ){
                    console.error(`Zero or multiple boards were found with the matching name '${boards}' at organization '${idOrganization}' - [${boardName.map( item => JSON.stringify(item)).join(",")}]`);
                }
                throw new Error(`Zero or multiple boards were found with the matching name '${boards}' at organization '${idOrganization}' - [${boardName.map( item => JSON.stringify(item)).join(",")}]`);
            })
    }

    /**
     * rename a board
     *
     * @param boardId {String} ID of the board to be renamed
     * @param newName {Number} Name for the list to be changed to
     */
    renameBoard(boardId, newName) {
        return this._client.put(`/boards/${boardId}?name=${newName}`);
    }
}

module.exports = TrelloBoards;
