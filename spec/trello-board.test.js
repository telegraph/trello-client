
'use strict';

const TrelloBoard = require('../lib/trello-board');
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


describe("Given a 'Trello Board'", () => {

    let boards= [
        {id:"boardA", name: "Board A", idOrganization: "organizationA"},
        {id:"boardB", name: "Board B", idOrganization: "organizationB"},
        {id:"boardC", name: "Board C", idOrganization: "organizationB"}
    ];

    describe("'clone'", () =>{
        const Board = new TrelloBoard(_clientMock);
        const fromBoard = {
            id: "boardA",
            name:"Board A"
        };
        const toBoard = {
            name: "boardB",
            idOrganization: "organizationB"
        };

        describe("should succeed when", () => {

            it("the id is provided", (done) => {
                spyOn(Board, 'getById').and.returnValue(Promise.resolve({
                    id  : "boardA",
                    name: "Board A",
                    idOrganization: "organizationA"
                }));
                spyOn(Board, 'getLists').and.returnValue(Promise.resolve([{
                    id:"listA", idBoard:"boardA", name: "List A"
                }]));
                spyOn(Board, 'create').and.returnValue(Promise.resolve({}));

                Board.clone({id: "boardA"},{name:"Board B", idOrganization: "organizationB"}).then(
                    (data) => {

                        expect(Board.getById ).toHaveBeenCalledTimes(1);
                        expect(Board.getById.calls.mostRecent().args ).toEqual([
                            "boardA"
                        ]);
                        expect(Board.getLists).toHaveBeenCalledTimes(1);
                        expect(Board.getLists.calls.mostRecent().args ).toEqual([
                            "boardA"
                        ]);
                        expect(Board.create  ).toHaveBeenCalledTimes(1);
                        expect(Board.create.calls.mostRecent().args ).toEqual([
                            {
                                name:"Board B",
                                idOrganization: "organizationA",
                                lists: [{
                                    id:"listA", idBoard:"boardA", name: "List A"
                                }]
                            }
                        ]);

                        expect(data).toEqual({});
                        done();
                    }
                )
            });

            it("the name is provided", (done) => {
                spyOn(Board, 'searchFor').and.returnValue(Promise.resolve({
                    id  : "boardA",
                    name: "Board A",
                    idOrganization: "organizationA"
                }));
                spyOn(Board, 'getLists').and.returnValue(Promise.resolve([{
                    id:"listA", idBoard:"boardA", name: "List A"
                }]));
                spyOn(Board, 'create').and.returnValue(Promise.resolve({}));

                Board.clone({name: "Board A"},{name:"Board B", idOrganization: "organizationB"}).then(
                    (data) => {

                        expect(Board.searchFor ).toHaveBeenCalledTimes(1);
                        expect(Board.searchFor.calls.mostRecent().args ).toEqual([
                            "Board A"
                        ]);
                        expect(Board.getLists).toHaveBeenCalledTimes(1);
                        expect(Board.getLists.calls.mostRecent().args ).toEqual([
                            "boardA"
                        ]);
                        expect(Board.create  ).toHaveBeenCalledTimes(1);
                        expect(Board.create.calls.mostRecent().args ).toEqual([
                            {
                                name:"Board B",
                                idOrganization: "organizationA",
                                lists: [{
                                    id:"listA", idBoard:"boardA", name: "List A"
                                }]
                            }
                        ]);

                        expect(data).toEqual({});
                        done();
                    }
                )
            });
        });

        describe("should fail when", () => {
            it("no name nor id are provided in the 'fromBoard'", (done) => {
                Board.clone({},{}).then(
                    () => {
                        fail("Should fail");
                        done();
                    },
                    (error) => {
                        expect(error.message.startsWith("Invalid fromBoard/toBoard objects - Id or name must be set ")).toBeTruthy();
                        done();
                    }
                )
            })
        })
    });

    describe("'create'", () =>{
        const Board = new TrelloBoard(_clientMock);
        const boardWithLists = {
            name:"Board A",
            idOrganization: "organizationA",
            lists: [ {name: "listA"}]
        };
        const boardWithoutLists = {
            name:"Board A",
            idOrganization: "organizationA"
        };

        describe("should succeed when", () => {
            it("the board does not exist and it is created", (done) => {
                spyOn(_clientMock.list,'create').and.returnValue(Promise.resolve({name: "listA", id:"listA"}));
                spyOn(_clientMock, 'post'      ).and.returnValue(Promise.resolve({
                    id  : "boardA",
                    name: "Board A",
                    idOrganization: "organizationA"
                }));
                spyOn(Board, 'getByName').and.returnValue(Promise.reject("Not Found"));

                Board.create(boardWithLists).then((data) => {
                    expect(_clientMock.post).toHaveBeenCalledTimes(1);
                    expect(_clientMock.post.calls.mostRecent().args).toEqual([
                        `/boards`,
                        {name:"Board A", idOrganization: "organizationA"}
                    ]);
                    expect(_clientMock.list.create).toHaveBeenCalledTimes(1);
                    expect(_clientMock.list.create.calls.mostRecent().args).toEqual([
                        {name: "listA", idBoard: "boardA"},
                        false
                    ]);
                    expect(Board.getByName).toHaveBeenCalledTimes(1);

                    expect(data).toEqual({
                        id  : "boardA",
                        name: "Board A",
                        idOrganization: "organizationA",
                        lists: [
                            {name: "listA", id:"listA"}
                        ]
                    });
                    done();
                });
            });

            it("the board exists but we force the creation", (done) => {
                spyOn(_clientMock.list,'create').and.returnValue(Promise.resolve({name: "listA", id:"listA"}));
                spyOn(_clientMock, 'post'      ).and.returnValue(Promise.resolve({
                    id  : "boardA",
                    name: "Board A",
                    idOrganization: "organizationA"
                }));
                spyOn(Board, 'getByName').and.throwError("Error");

                Board.create(boardWithLists, true).then((data) => {
                    expect(_clientMock.list.create).toHaveBeenCalledTimes(1);
                    expect(_clientMock.list.create.calls.mostRecent().args).toEqual([
                        {name: "listA", idBoard: "boardA"},
                        true
                    ]);
                    expect(_clientMock.post).toHaveBeenCalledTimes(1);
                    expect(_clientMock.post.calls.mostRecent().args).toEqual([
                        `/boards`,
                        {name:"Board A", idOrganization: "organizationA"}
                    ]);
                    expect(Board.getByName).not.toHaveBeenCalled();

                    expect(data).toEqual({
                        id  : "boardA",
                        name: "Board A",
                        idOrganization: "organizationA",
                        lists: [
                            {name: "listA", id:"listA"}
                        ]
                    });
                    done();
                });
            });

            it("the board exists and we don't force the creation", (done) => {
                spyOn(_clientMock.list, 'create').and.throwError("Error");
                spyOn(_clientMock, 'post'       ).and.throwError("Error");
                spyOn(Board, 'getByName').and.returnValue(Promise.resolve({
                    id  : "boardA",
                    name: "Board A",
                    idOrganization: "organizationA"
                }));

                Board.create(boardWithoutLists).then((data) => {
                    expect(_clientMock.list.create).not.toHaveBeenCalled();
                    expect(Board.getByName).toHaveBeenCalledTimes(1);
                    expect(Board.getByName.calls.mostRecent().args).toEqual([
                        "organizationA", "Board A"
                    ]);

                    expect(data).toEqual({
                        id  : "boardA",
                        name: "Board A",
                        idOrganization: "organizationA",
                        lists: [
                        ]
                    });
                    done();
                });
            });
        });
    });

    describe("'searchFor'", () =>{
        const Board = new TrelloBoard(_clientMock);

        it("should return success if the rest call succeeds", (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.resolve({boards: boards }));

            Board.searchFor("Board")
                .then(
                    (data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/search?query="Board"&modelTypes=boards`
                        ]);
                        expect(data).toEqual(boards);
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

            Board.searchFor("Board")
                .then(
                    () => {
                        fail("Should not succeed");
                        done();
                    },
                    (error) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/search?query="Board"&modelTypes=boards`
                        ]);
                        expect(error).toEqual("Failure");
                        done()
                    }
                );
        });
    });

    describe("'delete'", () =>{
        const Board = new TrelloBoard(_clientMock);

        it("should return success if the rest call succeeds", (done) => {
            spyOn(_clientMock, 'delete').and.returnValue(Promise.resolve({}));

            Board.delete("boardA")
                .then(
                    (data) => {
                        expect(_clientMock.delete).toHaveBeenCalledTimes(1);
                        expect(_clientMock.delete.calls.mostRecent().args).toEqual([
                            `/boards/boardA`
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
            spyOn(_clientMock, 'delete').and.returnValue(Promise.reject("Failure"));

            Board.delete("boardA").then(
                    () => {
                        fail("Should not succeed");
                        done();
                    },
                    (error) => {
                        expect(_clientMock.delete).toHaveBeenCalledTimes(1);
                        expect(_clientMock.delete.calls.mostRecent().args).toEqual([
                            `/boards/boardA`
                        ]);
                        expect(error).toEqual("Failure");
                        done()
                    }
                );
        });
    });

    describe("'getById'", () =>{
        const Board = new TrelloBoard(_clientMock);

        it("should return success if the rest call succeeds", (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.resolve({}));

            Board.getById("boardA")
                .then(
                    (data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/boards/boardA?fields=all`
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

            Board.getById("boardA").then(
                () => {
                    fail("Should not succeed");
                    done();
                },
                (error) => {
                    expect(_clientMock.get).toHaveBeenCalledTimes(1);
                    expect(_clientMock.get.calls.mostRecent().args).toEqual([
                        `/boards/boardA?fields=all`
                    ]);
                    expect(error).toEqual("Failure");
                    done()
                }
            );
        });
    });

    describe("'getLists'", () =>{
        const Board = new TrelloBoard(_clientMock);

        it("should return success if the rest call succeeds", (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.resolve({}));

            Board.getLists("boardA")
                .then(
                    (data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/boards/boardA/lists`
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

            Board.getLists("boardA").then(
                () => {
                    fail("Should not succeed");
                    done();
                },
                (error) => {
                    expect(_clientMock.get).toHaveBeenCalledTimes(1);
                    expect(_clientMock.get.calls.mostRecent().args).toEqual([
                        `/boards/boardA/lists`
                    ]);
                    expect(error).toEqual("Failure");
                    done()
                }
            );
        });
    });

    describe("'update'", () =>{
        const Board = new TrelloBoard(_clientMock);

        describe("should succeed if", () => {
            it("proper data is provided and rest call succeeds", (done) => {
                spyOn(_clientMock, 'put').and.returnValue(Promise.resolve({}));

                Board.update({id:"boardA", name:"Board B"}).then(
                    (data) => {
                        expect(_clientMock.put).toHaveBeenCalledTimes(1);
                        expect(_clientMock.put.calls.mostRecent().args).toEqual([
                            `/boards/boardA?name=Board%20B`
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
        });

        describe("should fail if", () => {
            it("no id is provided", (done) => {
                spyOn(_clientMock, 'put').and.throwError("Failure");

                Board.update({name:"Board B"}).then(
                    () => {
                        fail("Should not succeed");
                        done();
                    },
                    (error) => {
                        expect(_clientMock.put).toHaveBeenCalledTimes(0);
                        expect(error.message).toEqual("No board 'id' found to proceed with update.");
                        done()
                    }
                );
            });

            it("no valid property is found", (done) => {
                spyOn(_clientMock, 'put').and.throwError("Failure");

                let request = {id: "name", not_valid_prop:"Board B"};
                Board.update(request).then(
                    () => {
                        fail("Should not succeed");
                        done();
                    },
                    (error) => {
                        expect(_clientMock.put).toHaveBeenCalledTimes(0);
                        expect(error.message).toEqual(`No updatable keys were found at '${JSON.stringify(request)}'.`);
                        done()
                    }
                );
            });
        });
    });

    describe("'getByName'", () =>{
        const Board = new TrelloBoard(_clientMock);

        describe("should succeed if", () => {
            it("a board is found and match the organization Id", (done) => {
                spyOn(_clientMock, 'get').and.returnValue(Promise.resolve({boards: boards }));

                Board.getByName("organizationA", "Board A").then(
                    (data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/search?query="Board A"&modelTypes=boards`
                        ]);
                        expect(data).toEqual(boards[0]);
                        done();
                    },
                    () => {
                        fail("Should not fail");
                        done()
                    }
                );
            });

            it("a single board by name without no filter organizationId", (done) => {
                spyOn(_clientMock, 'get').and.returnValue(Promise.resolve({boards: [boards[0]] }));

                Board.getByName("Board A").then(
                    (data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/search?query="Board A"&modelTypes=boards`
                        ]);
                        expect(data).toEqual(boards[0]);
                        done();
                    },
                    () => {
                        fail("Should not fail");
                        done()
                    }
                );
            });
        });

        describe("should fail if", () => {
            it("no organization id is set", (done) => {
                spyOn(_clientMock, 'get').and.throwError("Failure");

                Board.getByName().then(
                    () => {
                        fail("Should not fail");
                        done()
                    },
                    (error) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(0);
                        expect(error).toEqual("No board name found found!");
                        done();
                    }
                );
            });

            it("multiple boards where found", (done) => {
                spyOn(_clientMock, 'get').and.returnValue(Promise.resolve({boards: boards }));

                Board.getByName("organizationB", "Board B").then(
                    () => {
                        fail("Should not fail");
                        done()
                    },
                    (error) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/search?query="Board B"&modelTypes=boards`
                        ]);
                        expect(error.message.startsWith('Zero or multiple boards were found with the matching name')).toBeTruthy();
                        done();
                    }
                );
            });
        });
    });
});
