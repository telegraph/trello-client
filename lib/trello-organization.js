
'use strict';

const _ = require('lodash');

class TrelloOrganizations {

    /**
     *
     * @param trelloClient {TrelloClient}
     */
    constructor(trelloClient){
        this._client = trelloClient;
    }

    /**
     * This method allow us to search for an organization given a 'searchTerm' String
     * @param searchTerm {String}
     *
     * @returns {Promise<Array<Object>>} Array containing organizations
     */
    searchFor(searchTerm){
        return this._client.get(`/search?query="${searchTerm}"&modelTypes=organizations`)
            .then( body => body.organizations );
    }

    /**
     * This method allow us to create an organization if it doesn't exist or force the
     * creation of it if another organization with the same name already exists.
     * If the organization contains boards, then they are created.
     *
     * @param data {{name:String, boards:?Array<{name:String}>}}
     * @param force {Boolean} Force the organization creation even if it already exists another
     * with the same name.
     * @returns {Promise<>}
     */
    create(data, force = false){
        return (force ? Promise.reject(null) : this.getByName(data.name))
            .catch( ignore => this._client.post(`/organizations`, _.omit(data, 'boards')) )
            .then( organization => {
                let boardsPromise = _.get(data, 'boards', []).length === 0 ? Promise.resolve([]) : Promise.all( data.boards.map( item => {
                    item.idOrganization = organization.id;
                    return this._client.board.create(item, force)
                }));
                return boardsPromise
                    .then( boards => _.set(organization, 'boards', boards) );
            })
            ;
    }

    /**
     * Deletes an organization and inner structure (boards) if the `deleteBoards` is set to true.
     * At least the organization id or name must be provided.
     *
     * @param data {{id:?String, name:?String}}
     * @param deleteBoards {Boolean} When true, deletes all inner boards.
     * @returns {Promise<*>}
     */
    delete(data, deleteBoards = false){
        if( !data.id && !data.name ){
            return Promise.resolve( data );
        }
        return (data.id ? Promise.resolve({id:data.id}) : this.getByName(data.name) )
            .then( organization => {
                return ( deleteBoards ? this.getBoards(organization.id) : Promise.resolve([]) )
                    .then( boards => _.set(organization, 'boards', boards) )
            })
            .then( organization => {
                let resultP = organization.boards.map( board => this._client.board.delete(board.id));
                resultP.push(this._client.delete(`/organizations/${organization.id}`));
                return Promise.all(resultP)
            })
            .then(_ => data, _ => data)
            ;
    }

    /**
     * Gets an organization for a given Id
     * @param idOrganization {String}
     * @returns {Promise<{}>} Object that describes an organization wrapped inside a promise
     */
    getById(idOrganization){
        return this._client.get(`/organizations/${idOrganization}`);
    }

    getByName(organizationName){
        return this.searchFor(organizationName)
            .then( organizations => {
                if(organizations.length === 1){
                    return organizations[0];
                }
                throw new Error(`Zero or multiple organizations were found with the matching name '${organizationName}' - [${organizations.map( item => JSON.stringify(item)).join(",")}]`);
            })
            ;
    }

    getBoards(idOrganization) {
        return this._client.get(`/organizations/${idOrganization}/boards`);
    }
}

module.exports = TrelloOrganizations;
