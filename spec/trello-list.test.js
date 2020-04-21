'use strict';

const TrelloList = require('../lib/trello-list');

/**
 * @type {TrelloClient}
 * @private
 */
const _clientMock = {
    get : () => {},
    put : () => {},
    post: () => {},
    board: {
        getLists: () => {}
    }
};

describe("Given a 'Trello List'", () => {

    let lists = [
        {id: "listA", name: "List A", idBoard:"boardA"},
        {id: "listB", name: "List B", idBoard:"boardB"},
        {id: "listC", name: "List B", idBoard:"boardB"}
    ];

    describe('create', () => {
        const List = new TrelloList(_clientMock);

        describe("should succeed when", () => {
            it('when no exist and the list is created', (done) => {
                spyOn(_clientMock, 'post').and.returnValue(Promise.resolve(lists[0]));
                spyOn(List, 'getByName').and.returnValue(Promise.reject("Not Found"));

                List.create({name:"Board A", idBoard:"boardA"}).then((data) => {

                    expect(List.getByName).toHaveBeenCalledTimes(1);
                    expect(List.getByName.calls.mostRecent().args).toEqual([
                        "boardA",
                        "Board A"
                    ]);

                    expect(_clientMock.post).toHaveBeenCalledTimes(1);
                    expect(_clientMock.post.calls.mostRecent().args).toEqual([
                        `/lists`,
                        {name: "Board A", idBoard:"boardA"}
                    ]);
                    expect(data).toEqual(lists[0]);
                    done()
                });
            });

            it('when exists', (done) => {
                spyOn(_clientMock, 'post').and.throwError("Failure");
                spyOn(List, 'getByName').and.returnValue(Promise.resolve(lists[0]));

                List.create({name:"Board A", idBoard:"boardA"}).then((data) => {

                    expect(List.getByName).toHaveBeenCalledTimes(1);
                    expect(List.getByName.calls.mostRecent().args).toEqual([
                        "boardA",
                        "Board A"
                    ]);

                    expect(_clientMock.post).toHaveBeenCalledTimes(0);
                    expect(data).toEqual(lists[0]);
                    done()
                });
            });

            it('when created with force flag', (done) => {
                spyOn(_clientMock, 'post').and.returnValue(Promise.resolve(lists[0]));
                spyOn(List, 'getByName').and.throwError("Failure");

                List.create({name:"Board A", idBoard:"boardA"}, true).then((data) => {
                    expect(List.getByName).not.toHaveBeenCalled();

                    expect(_clientMock.post).toHaveBeenCalledTimes(1);
                    expect(_clientMock.post.calls.mostRecent().args).toEqual([
                        `/lists`,
                        {name: "Board A", idBoard:"boardA"}
                    ]);
                    expect(data).toEqual(lists[0]);
                    done()
                });
            });
        });

        describe("should fail when", () => {
            it('when the create fails', (done) => {
                spyOn(_clientMock, 'post').and.returnValue(Promise.reject("Failure Create"));
                spyOn(List, 'getByName'  ).and.returnValue(Promise.reject("Not Found"));

                List.create({name:"Board A", idBoard:"boardA"}).then(
                    () => {
                        fail("Should Fail");
                        done();
                    },
                    (error) => {
                        expect(List.getByName).toHaveBeenCalledTimes(1);
                        expect(List.getByName.calls.mostRecent().args).toEqual([
                            "boardA",
                            "Board A"
                        ]);

                        expect(_clientMock.post).toHaveBeenCalledTimes(1);
                        expect(_clientMock.post.calls.mostRecent().args).toEqual([
                            `/lists`,
                            {name: "Board A", idBoard:"boardA"}
                        ]);
                        expect(error).toEqual("Failure Create");
                        done()
                    });
            });
        });
    });

    describe("'setPosition'", () => {

        const List = new TrelloList(_clientMock);

        describe("should succeed when", () => {
            it("the rest operation succeeds", (done) => {
                spyOn(_clientMock, 'put').and.returnValue(Promise.resolve({}));
                List.setPosition("listA", 1).then(
                    (data) => {
                        expect(_clientMock.put).toHaveBeenCalledTimes(1);
                        expect(_clientMock.put.calls.mostRecent().args).toEqual([
                            "/lists/listA/pos?value=1"
                        ]);
                        expect(data).toEqual({});
                        done()
                    }
                );
            });
        });

        describe("should fail when", () => {
            it("rest operation fails", (done) => {
                spyOn(_clientMock, 'put').and.returnValue(Promise.reject("Failure"));
                List.setPosition("listA", 1).then(
                    () => {
                        fail("Should fail");
                        done()
                    },
                    (error) => {
                        expect(_clientMock.put).toHaveBeenCalledTimes(1);
                        expect(_clientMock.put.calls.mostRecent().args).toEqual([
                            "/lists/listA/pos?value=1"
                        ]);
                        expect(error).toEqual("Failure");
                        done()
                    }
                );
            });
        });
    });

    describe("'getByName'", () => {

        const List = new TrelloList(_clientMock);
        let boardId = "boardA";

        describe("should succeed when", () => {
            it("a single list is found", (done) => {
                spyOn(_clientMock.board, 'getLists').and.returnValue(Promise.resolve(lists));

                List.getByName(boardId, "List A").then(
                    (data) => {
                        expect(_clientMock.board.getLists).toHaveBeenCalledTimes(1);
                        expect(_clientMock.board.getLists.calls.mostRecent().args).toEqual([
                            boardId
                        ]);

                        expect(data).toEqual(lists[0]);
                        done()
                    }
                );
            });
            it("multiple lists are found and allowMultiple is true", (done) => {
                let listsMultiple = [
                    {id: "listA", name: "List A", idBoard:"boardA"},
                    {id: "listAB", name: "List A", idBoard:"boardA"},
                    {id: "listB", name: "List B", idBoard:"boardB"},
                    {id: "listC", name: "List B", idBoard:"boardB"}
                ];
                spyOn(_clientMock.board, 'getLists').and.returnValue(Promise.resolve(listsMultiple));

                List.getByName(boardId, "List A", true).then(
                    (data) => {
                        expect(_clientMock.board.getLists).toHaveBeenCalledTimes(1);
                        expect(_clientMock.board.getLists.calls.mostRecent().args).toEqual([
                            boardId
                        ]);

                        expect(data.length).toEqual(2);
                        expect(data[0]).toEqual(listsMultiple[0]);
                        expect(data[1]).toEqual(listsMultiple[1]);
                        done()
                    }
                );
            });
            it("no lists are found and allowMultiple is true", (done) => {
                spyOn(_clientMock.board, 'getLists').and.returnValue(Promise.resolve([]));

                List.getByName(boardId, "List A", true).then(
                    (data) => {
                        expect(_clientMock.board.getLists).toHaveBeenCalledTimes(1);
                        expect(_clientMock.board.getLists.calls.mostRecent().args).toEqual([
                            boardId
                        ]);

                        expect(data.length).toEqual(0);
                        expect(typeof data).toEqual("object");
                        done()
                    }
                );
            });
        });

        describe("should fail when", () => {
            it("multiple list are found", (done) => {
                spyOn(_clientMock.board, 'getLists').and.returnValue(Promise.resolve(lists));

                List.getByName(boardId, "List B").then(
                    () => {
                        fail("Should Fail");
                        done();
                    },
                    (error) => {
                        expect(_clientMock.board.getLists).toHaveBeenCalledTimes(1);
                        expect(_clientMock.board.getLists.calls.mostRecent().args).toEqual([
                            boardId
                        ]);

                        expect(error.message.startsWith("Zero or multiple lists were found with the matching")).toBeTruthy();
                        done()
                    }
                );
            });

            it("no list are found", (done) => {
                spyOn(_clientMock.board, 'getLists').and.returnValue(Promise.resolve([]));

                List.getByName(boardId, "List B").then(
                    () => {
                        fail("Should Fail");
                        done();
                    },
                    (error) => {
                        expect(_clientMock.board.getLists).toHaveBeenCalledTimes(1);
                        expect(_clientMock.board.getLists.calls.mostRecent().args).toEqual([
                            boardId
                        ]);

                        expect(error.message.startsWith("Zero or multiple lists were found with the matching")).toBeTruthy();
                        done()
                    }
                );
            });
        });
    });

    describe('getAllCards', () => {
        const List = new TrelloList(_clientMock);
        describe("should succeed when", () => {
            it("no params are passed", (done) => {
                const fromListId = '12345';
                spyOn(_clientMock, 'get').and.returnValue(Promise.resolve());
                List.getAllCards(fromListId)
                    .then(() => {
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/lists/${fromListId}/cards`
                        ]);
                        done();
                    });

            });
            it("params are passed", (done) => {
                const fromListId = '12345';
                spyOn(_clientMock, 'get').and.returnValue(Promise.resolve());
                List.getAllCards(fromListId, ['field1','field2'])
                    .then(() => {
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/lists/${fromListId}/cards?fields=field1,field2`
                        ]);
                        done();
                    });

            });
        });
    });

    describe("'moveList'", () => {

        const List = new TrelloList(_clientMock);
        const toBoardId  = "boardId";
        const fromListId = "listA";
        const toListName = "List A";
        const position   = "Top";

        describe("should succeed when", () => {
            it("the rest operation succeeds", (done) => {
                spyOn(_clientMock, 'put').and.returnValue(Promise.resolve({}));

                List.moveList(toBoardId, fromListId, toListName, position).then(
                    (data) => {
                        expect(_clientMock.put).toHaveBeenCalledTimes(1);
                        expect(_clientMock.put.calls.mostRecent().args).toEqual([
                            `/lists/${fromListId}?name=${encodeURIComponent(toListName)}&closed=false&idBoard=${toBoardId}&pos=${position}`
                        ]);
                        expect(data).toEqual({});
                        done()
                    }
                );
            });
        });

        describe("should fail when", () => {
            it("rest operation fails", (done) => {
                spyOn(_clientMock, 'put').and.returnValue(Promise.reject("Failure"));
                List.moveList(toBoardId, fromListId, toListName, position).then(
                    () => {
                        fail("Should fail");
                        done()
                    },
                    (error) => {
                        expect(_clientMock.put).toHaveBeenCalledTimes(1);
                        expect(_clientMock.put.calls.mostRecent().args).toEqual([
                            `/lists/${fromListId}?name=${encodeURIComponent(toListName)}&closed=false&idBoard=${toBoardId}&pos=${position}`
                        ]);
                        expect(error).toEqual("Failure");
                        done()
                    }
                );
            });
        });
    });

    describe("'copyList'", () => {
        const List = new TrelloList(_clientMock);
        const toBoardId  = "boardId";
        const fromListId = "listA";
        const toListName = "List A";
        const position   = "Top";

        describe("should succeed when", () => {
            it("the rest operation succeeds", (done) => {
                spyOn(_clientMock, 'post').and.returnValue(Promise.resolve({}));

                List.copyList(toBoardId, fromListId, toListName, position).then(
                    (data) => {
                        expect(_clientMock.post).toHaveBeenCalledTimes(1);
                        expect(_clientMock.post.calls.mostRecent().args).toEqual([
                            `/lists/?name=${encodeURIComponent(toListName)}&idBoard=${toBoardId}&idListSource=${fromListId}&pos=${position}`
                        ]);
                        expect(data).toEqual({});
                        done()
                    }
                );
            });
        });

        describe("should fail when", () => {
            it("rest operation fails", (done) => {
                spyOn(_clientMock, 'post').and.returnValue(Promise.reject("Failure"));
                List.copyList(toBoardId, fromListId, toListName, position).then(
                    () => {
                        fail("Should fail");
                        done()
                    },
                    (error) => {
                        expect(_clientMock.post).toHaveBeenCalledTimes(1);
                        expect(_clientMock.post.calls.mostRecent().args).toEqual([
                            `/lists/?name=${encodeURIComponent(toListName)}&idBoard=${toBoardId}&idListSource=${fromListId}&pos=${position}`
                        ]);
                        expect(error).toEqual("Failure");
                        done()
                    }
                );
            });
        });
    });

    describe("'moveCards'", () => {
        const List = new TrelloList(_clientMock);
        const toBoardId  = "boardId";
        const listId = "listA";
        const toListId = "List A";

        describe("should succeed when", () => {
            it("the rest operation succeeds", (done) => {
                spyOn(_clientMock, 'post').and.returnValue(Promise.resolve({}));

                List.moveCards(toBoardId, listId, toListId).then(
                    (data) => {
                        expect(_clientMock.post).toHaveBeenCalledTimes(1);
                        expect(_clientMock.post.calls.mostRecent().args).toEqual([
                            `/lists/${listId}/moveAllCards?idList=${toListId}&idBoard=${toBoardId}`
                        ]);
                        expect(data).toEqual({});
                        done()
                    }
                );
            });
        });

        describe("should fail when", () => {
            it("rest operation fails", (done) => {
                spyOn(_clientMock, 'post').and.returnValue(Promise.reject("Failure"));

                List.moveCards(toBoardId, listId, toListId).then(
                    () => {
                        fail("Should fail");
                        done()
                    },
                    (error) => {
                        expect(_clientMock.post).toHaveBeenCalledTimes(1);
                        expect(_clientMock.post.calls.mostRecent().args).toEqual([
                            `/lists/${listId}/moveAllCards?idList=${toListId}&idBoard=${toBoardId}`
                        ]);
                        expect(error).toEqual("Failure");
                        done()
                    }
                );
            });
        });
    });

    describe("'archiveList'", () => {
        const List = new TrelloList(_clientMock);
        const listId = "listA";

        describe("should succeed when", () => {
            it("the rest operation succeeds and no there are no cards to be archived", (done) => {
                spyOn(List, 'archiveAllCardsOnList').and.throwError("Error");
                spyOn(_clientMock, 'put').and.returnValue(Promise.resolve({}));

                List.archiveList(listId).then(
                    (data) => {
                        expect(List.archiveAllCardsOnList).not.toHaveBeenCalled();

                        expect(_clientMock.put).toHaveBeenCalledTimes(1);
                        expect(_clientMock.put.calls.mostRecent().args).toEqual([
                            `/lists/${listId}/closed?value=true`
                        ]);
                        expect(data).toEqual({});
                        done()
                    }
                );
            });

            it("the rest operation succeeds and no there are no cards to be archived", (done) => {
                spyOn(List, 'archiveAllCardsOnList').and.returnValue(Promise.resolve({}));
                spyOn(_clientMock, 'put').and.returnValue(Promise.resolve({}));

                List.archiveList(listId, {archiveCards:true}).then(
                    (data) => {
                        expect(List.archiveAllCardsOnList).toHaveBeenCalledTimes(1);
                        expect(List.archiveAllCardsOnList.calls.mostRecent().args).toEqual([
                            listId
                        ]);

                        expect(_clientMock.put).toHaveBeenCalledTimes(1);
                        expect(_clientMock.put.calls.mostRecent().args).toEqual([
                            `/lists/${listId}/closed?value=true`
                        ]);
                        expect(data).toEqual({});
                        done()
                    }
                );
            });
        });

        describe("should fail when", () => {
            it("if the archive cards fail", (done) => {
                spyOn(List, 'archiveAllCardsOnList').and.returnValue(Promise.reject("Failure"));
                spyOn(_clientMock, 'put').and.throwError("Error");

                List.archiveList(listId, {archiveCards:true}).then(
                    () => {
                        fail("Should Fail");
                        done();
                    },
                    (error) => {
                        expect(List.archiveAllCardsOnList).toHaveBeenCalledTimes(1);
                        expect(List.archiveAllCardsOnList.calls.mostRecent().args).toEqual([
                            listId
                        ]);

                        expect(_clientMock.put).not.toHaveBeenCalled();
                        expect(error).toEqual("Failure");
                        done()
                    }
                );
            });
        });
    });

    describe("'archiveAllCardsOnList'", () => {
        const List = new TrelloList(_clientMock);
        const listId = "listA";

        describe("should succeed when", () => {
            it("the rest operation succeeds", (done) => {
                spyOn(_clientMock, 'post').and.returnValue(Promise.resolve({}));

                List.archiveAllCardsOnList(listId).then(
                    (data) => {
                        expect(_clientMock.post).toHaveBeenCalledTimes(1);
                        expect(_clientMock.post.calls.mostRecent().args).toEqual([
                            `/lists/${listId}/archiveAllCards`
                        ]);
                        expect(data).toEqual({});
                        done()
                    }
                );
            });
        });

        describe("should fail when", () => {
            it("rest operation fails", (done) => {
                spyOn(_clientMock, 'post').and.returnValue(Promise.reject("Failure"));

                List.archiveAllCardsOnList(listId).then(
                    () => {
                        fail("Should fail");
                        done()
                    },
                    (error) => {
                        expect(_clientMock.post).toHaveBeenCalledTimes(1);
                        expect(_clientMock.post.calls.mostRecent().args).toEqual([
                            `/lists/${listId}/archiveAllCards`
                        ]);
                        expect(error).toEqual("Failure");
                        done()
                    }
                );
            });
        });
    });

    describe("'update'", () => {
        const List = new TrelloList(_clientMock);
        let update = {
            id: "listA",
            name: "List B"
        };
        describe("should succeed when", () => {
            it("the rest operation succeeds and valid keys are provided", (done) => {
                spyOn(_clientMock, 'put').and.returnValue(Promise.resolve({}));

                List.update(update).then(
                    (data) => {
                        expect(_clientMock.put).toHaveBeenCalledTimes(1);
                        expect(_clientMock.put.calls.mostRecent().args).toEqual([
                            `/lists/${update.id}?name=${update.name}`
                        ]);
                        expect(data).toEqual({});
                        done()
                    }
                );
            });
        });

        describe("should fail when", () => {
            it("if no Id is provided", (done) => {
                spyOn(_clientMock, 'put').and.throwError("Fail");

                List.update({name:"List B"}).then(
                    () => {
                        fail("Should Fail");
                        done();
                    },
                    (error) => {
                        expect(_clientMock.put).toHaveBeenCalledTimes(0);
                        expect(error.message).toEqual("No board 'id' found to proceed with update.");
                        done()
                    }
                );
            });

            it("if no valid keys are provided", (done) => {
                spyOn(_clientMock, 'put').and.throwError("Fail");

                List.update({id:"listA", non_valid_key: "test"}).then(
                    () => {
                        fail("Should Fail");
                        done();
                    },
                    (error) => {
                        expect(_clientMock.put).toHaveBeenCalledTimes(0);
                        expect(error.message.startsWith("No updatable keys were found at ")).toBeTruthy();
                        done()
                    }
                );
            });
        });
    });

    describe('rotateLeft & rotateRight', () => {
        const List    = new TrelloList(_clientMock);
        const boardId = "boardA";
        const count   = 1;

        it("it should rotate left", (done) => {
            spyOn(_clientMock.board, 'getLists').and.returnValue(Promise.resolve([
                {id: "listA", pos:"1"},
                {id: "listB", pos:"2"},
                {id: "listC", pos:"3"}
            ]));
            spyOn(List, 'setPosition').and.returnValue(Promise.resolve({}));

            List.rotateLeft(boardId, count).then(
                () => {
                    expect(_clientMock.board.getLists).toHaveBeenCalledTimes(1);
                    expect(_clientMock.board.getLists.calls.mostRecent().args).toEqual([
                        boardId
                    ]);

                    expect(List.setPosition).toHaveBeenCalledTimes(3);
                    expect(List.setPosition.calls.argsFor(0)).toEqual([
                        "listB", "1"
                    ]);
                    expect(List.setPosition.calls.argsFor(1)).toEqual([
                        "listC", "2"
                    ]);
                    expect(List.setPosition.calls.argsFor(2)).toEqual([
                        "listA", "3"
                    ]);
                    done();
                });
        });
        it("it should rotate right", (done) => {
            spyOn(_clientMock.board, 'getLists').and.returnValue(Promise.resolve([
                {id: "listA", pos:"1"},
                {id: "listB", pos:"2"},
                {id: "listC", pos:"3"}
            ]));
            spyOn(List, 'setPosition').and.returnValue(Promise.resolve({}));

            List.rotateRight(boardId, count).then(
                () => {
                    expect(_clientMock.board.getLists).toHaveBeenCalledTimes(1);
                    expect(_clientMock.board.getLists.calls.mostRecent().args).toEqual([
                        boardId
                    ]);

                    expect(List.setPosition).toHaveBeenCalledTimes(3);
                    expect(List.setPosition.calls.argsFor(0)).toEqual([
                        "listC", "1"
                    ]);
                    expect(List.setPosition.calls.argsFor(1)).toEqual([
                        "listA", "2"
                    ]);
                    expect(List.setPosition.calls.argsFor(2)).toEqual([
                        "listB", "3"
                    ]);
                    done();
                });
        });
    });

});
