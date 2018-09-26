
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
        getCustomFields: () => {},
		getChecklistData: () => {}
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

                Card.getCardDetails('12345')
                    .then((data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `cards/12345?`
                        ]);
                        done();
                    });
            });

            it('card id found and Params are passed', (done) => {
                spyOn(_clientMock, 'get').and.returnValue(Promise.resolve());

                Card.getCardDetails('12345', {customFieldItems: true, actions: 'createCard,copyCard', actions_limit: 50})
                    .then((data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args[0]).toContain([
                            'cards/12345?customFieldItems=true&actions=createCard%2CcopyCard&actions_limit=50'
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
                        .catch((customField) => {
                            expect(customField).toEqual('Field not found');
                            done();
                        });
                });
            });
        });

		describe("getChecklistData", () => {
			const Board = new TrelloCard(_clientMock);

			it("should return success if the rest call succeeds", (done) => {
				spyOn(_clientMock, 'get').and.returnValue(Promise.resolve({}));

				Board.getChecklistData("boardA")
					.then(
						(data) => {
							expect(_clientMock.get).toHaveBeenCalledTimes(1);
							expect(_clientMock.get.calls.mostRecent().args).toEqual([
								`cards/boardA/checklists`
							]);
							expect(data).toEqual({});
							done();
						},
						() => {
							fail("Should not fail");
							done()
						}
					);
			});

			it("should fail if the rest call fails", (done) => {
				spyOn(_clientMock, 'get').and.returnValue(Promise.reject("Failure"));

				Board.getChecklistData("boardA").then(
					() => {
						fail("Should not succeed");
						done();
					},
					(error) => {
						expect(_clientMock.get).toHaveBeenCalledTimes(1);
						expect(_clientMock.get.calls.mostRecent().args).toEqual([
							`cards/boardA/checklists`
						]);
						expect(error).toEqual("Failure");
						done()
					}
				);
			});
		});

    });
});
