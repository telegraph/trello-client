const proxyquire = require('proxyquire');
const sinon = require('sinon');

'use strict';


const TrelloList = require('../lib/trello-list');
const _clientMock = {
    put: () => {},
    post: () => {},
};
const List = new TrelloList(_clientMock);

describe("Given a 'Trello List'", () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
       sandbox.restore();
    });
    describe('archiveList', () => {
       it('Should call archiveAllCardsOnList if parameter is set', (done) => {
            let putStub = sandbox.stub(_clientMock, 'put').resolves();
            let postStub = sandbox.stub(_clientMock, 'post').resolves();
            let boardId = '1234abc';
            List.archiveList(boardId, {archiveCards: true})
                .then(() => {
                    expect(postStub.called).toBe(true);
                    expect(postStub.calledBefore(putStub)).toBe(true);
                    expect(putStub.called).toBe(true);

                    const postCalledUrl = postStub.getCall(0).args[0];
                    const putCalledUrl = putStub.getCall(0).args[0];
                    expect(postCalledUrl).toBe(`/lists/${boardId}/archiveAllCards`);
                    expect(putCalledUrl).toBe(`/lists/${boardId}/closed`);
                })
                .then(done);
       });
       it('Should not call archiveAllCardsOnList if parameter is not set', (done) => {
            let putStub = sandbox.stub(_clientMock, 'put').resolves();
            let postStub = sandbox.stub(_clientMock, 'post').resolves();
            List.archiveList('1234', {archiveCards: false})
                .then(() => {
                    expect(postStub.called).toBe(false);
                    expect(putStub.called).toBe(true);
                })
                .then(done);
       });
    });
});