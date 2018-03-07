
'use strict';

const TrelloCard = require('../lib/trello-card');
/**
 * @type {TrelloClient}
 * @private
 */
const _clientMock = {
    put   : () => {},
    post  : () => {},
    get   : () => {},
    delete: () => {},
    list : {
        create: () => {},
        delete: () => {}
    }
};


describe("Given a 'Trello Card'", () => {


    describe("'getCardDetails'", () =>{
        const Card = new TrelloCard(_clientMock);

        describe("should succeed if", () => {
            it("card is found and no options are passed", (done) => {
                spyOn(_clientMock, 'get').and.returnValue(Promise.resolve());


                Card.getCardDetails('CardId')
                    .then((data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `cards/CardId`
                        ]);
                        done();
                    });
            });
            it("card is found and options.customFields is true", (done) => {
                spyOn(_clientMock, 'get').and.returnValue(Promise.resolve());
                Card.getCardDetails('CardId', {customFields: true})
                    .then((data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args[0]).toContain([
                            'cards/CardId'
                        ]);
                        expect(_clientMock.get.calls.mostRecent().args[0]).toContain([
                            'customFieldItems=true'
                        ]);
                        done();
                    });
            });
            it("card is found and options.customFields is false", (done) => {
                spyOn(_clientMock, 'get').and.returnValue(Promise.resolve());
                Card.getCardDetails('CardId', {customFields: false})
                    .then((data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args[0]).toContain([
                            'cards/CardId'
                        ]);
                        expect(_clientMock.get.calls.mostRecent().args[0]).not.toContain([
                            'customFieldItems=true'
                        ]);
                        done();
                    });
            });
        });

    });
});
