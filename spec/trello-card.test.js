
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
    board : {
        getCustomFields: () => {}
    }
};


describe("Given a 'Trello Card'", () => {
    const Card = new TrelloCard(_clientMock);

    describe("'updateCard'", () =>{
        describe("should succeed if", () => {
            it('No params are passed', (done) => {
                spyOn(_clientMock, 'put').and.returnValue(Promise.resolve());
                Card.updateCard('12345', {})
                    .then((res) => {
                        expect(_clientMock.put.calls.mostRecent().args).toEqual([
                            `cards/12345/?`
                        ]);
                        done();
                    })
            });
            it('Params are passed', (done) => {
                spyOn(_clientMock, 'put').and.returnValue(Promise.resolve());
                Card.updateCard('12345', {param1: 'value1', param2: 'value2'})
                    .then((res) => {
                        expect(_clientMock.put.calls.mostRecent().args).toEqual([
                            `cards/12345/?param1=value1&param2=value2`
                        ]);
                        done();
                    })
            });
        });
    });
    describe("'getCardDetails'", () =>{
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

        describe('getCardCustomDataByName', () => {

            const cardDetails = {
                customFieldItems: [
                    {
                        idCustomField: '1',
                        value: {
                            text: 'valueFor1'
                        }
                    },
                    {
                        idCustomField: '2',
                        value: {
                            text: 'valueFor2'
                        }
                    },
                    {
                        idCustomField: '3',
                        value: {
                            text: 'valueFor3'
                        }
                    }
                ]
            };
            const customFields = [
                {
                    id: '1',
                    name: 'CardOne'
                },
                {
                    id: '2',
                    name: 'CardTwo'
                },
                {
                    id: '4',
                    name: 'CardFour'
                }
            ];
            describe('should succeed if', () => {
                it('card and custom field is found', (done) => {
                    spyOn(Card, 'getCardDetails').and.returnValue(Promise.resolve(cardDetails));
                    spyOn(_clientMock.board, 'getCustomFields').and.returnValue(Promise.resolve(customFields));

                    Card.getCardCustomDataByName('1', 'CardTwo')
                        .then((customField) => {
                            expect(customField.name).toEqual('CardTwo');
                            expect(customField.value.text).toEqual('valueFor2');
                            done();
                        });
                });
            });
            describe('should fail if', () => {
                it('card is found but custom field is not', (done) => {
                    spyOn(Card, 'getCardDetails').and.returnValue(Promise.resolve(cardDetails));
                    spyOn(_clientMock.board, 'getCustomFields').and.returnValue(Promise.resolve(customFields));

                    Card.getCardCustomDataByName('1', 'CardThree')
                        .then((customField) => {
                            expect(customField).toEqual(undefined);
                            done();
                        });
                });
            });
        });

    });
});
