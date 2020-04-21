
'use strict';

const TrelloOrganization = require('../lib/trello-organization');
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
        create: () => {},
        delete: () => {}
    }
};

const Organization = new TrelloOrganization(_clientMock);

describe("Given a 'Trello Organization'", () => {
    let Results = {
        organizations: [
            {
                id:"organizationA",
                name: "Organization A",
                boards:[
                    {id: "boardA", name: "Board A", idOrganization:"organizationA"}
                ]
            },
            {
                id:"organizationAA",
                name: "Organization AA",
                boards:[
                    {id: "boardAA"}
                ]
            }
        ]
    };

    describe('searchFor', () => {
        it('Should return a success if the rest call succeeds', (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.resolve(Results));
            Organization.searchFor("fake-org")
                .then(
                    (data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/search?query="fake-org"&modelTypes=organizations`
                        ]);
                        expect(data).toEqual(Results.organizations);
                        done();
                    },
                    () => fail("Should not throw an error")
                );
       });
       it('Should fail if the rest call fails', (done) => {
           spyOn(_clientMock, 'get').and.returnValue(Promise.reject("failure"));
           Organization.searchFor("fake-org")
               .then(
                   () => {
                       fail("Should throw an error")
                   },
                   (error) => {
                       expect(_clientMock.get).toHaveBeenCalledTimes(1);
                       expect(_clientMock.get.calls.mostRecent().args).toEqual([
                           `/search?query="fake-org"&modelTypes=organizations`
                       ]);
                       expect(error).toEqual("failure");
                       done();
                   }
               );
       });
    });

    describe('getById', () => {
        it('Should return a success if the rest call succeeds', (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.resolve(Results.organizations[0]));
            Organization.getById("organizationA")
                .then(
                    (data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/organizations/organizationA`
                        ]);
                        expect(data).toEqual(Results.organizations[0]);
                        done();
                    },
                    () => fail("Should not throw an error")
                );
        });
        it('Should fail if the rest call fails', (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.reject("failure"));
            Organization.getById("organizationA")
                .then(
                    () => {
                        fail("Should throw an error")
                    },
                    (error) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/organizations/organizationA`
                        ]);
                        expect(error).toEqual("failure");
                        done();
                    }
                );
        });
    });

    describe('getBoards', () => {
        it('Should return a success if the rest call succeeds', (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.resolve(Results.organizations[0].boards));
            Organization.getBoards("organizationA")
                .then(
                    (data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/organizations/organizationA/boards`
                        ]);
                        expect(data).toEqual(Results.organizations[0].boards);
                        done();
                    },
                    () => fail("Should not throw an error")
                );
        });
        it('Should fail if the rest call fails', (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.reject("failure"));
            Organization.getBoards("organizationA")
                .then(
                    () => {
                        fail("Should throw an error")
                    },
                    (error) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/organizations/organizationA/boards`
                        ]);
                        expect(error).toEqual("failure");
                        done();
                    }
                );
        });
    });

    describe('getByName', () => {
        it('Should return a success if the rest call succeeds', (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.resolve({organizations: [Results.organizations[0]]}));
            Organization.getByName("Organization A")
                .then(
                    (data) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/search?query="Organization A"&modelTypes=organizations`
                        ]);
                        expect(data).toEqual(Results.organizations[0]);
                        done();
                    },
                    () => fail("Should not throw an error")
                );
        });
        it('Should fail if the rest call fails', (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.reject("failure"));
            Organization.getByName("Organization A")
                .then(
                    () => {
                        fail("Should throw an error")
                    },
                    (error) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/search?query="Organization A"&modelTypes=organizations`
                        ]);
                        expect(error).toEqual("failure");
                        done();
                    }
                );
        });
        it('Should fail if multiple organizations are found', (done) => {
            spyOn(_clientMock, 'get').and.returnValue(Promise.resolve(Results));
            Organization.getByName("Organization A")
                .then(
                    () => {
                        fail("Should throw an error")
                    },
                    (error) => {
                        expect(_clientMock.get).toHaveBeenCalledTimes(1);
                        expect(_clientMock.get.calls.mostRecent().args).toEqual([
                            `/search?query="Organization A"&modelTypes=organizations`
                        ]);
                        expect(error.message).toEqual(`Zero or multiple organizations were found with the matching name 'Organization A' - [${Results.organizations.map( item => JSON.stringify(item)).join(",")}]`);
                        done();
                    }
                );
        });
    });

    describe('create', () => {
        let newOrganizationWithBoards = {
            name: 'Organization A',
            boards: [
                {
                    name: "Board A"
                }
            ]
        };
        let newOrganizationWithoutBoards = {
            name: 'Organization A',
        };

        describe("Should succeed when ", () => {
            it('creating an organization and boads if it does not exist', (done) => {
                spyOn(_clientMock, 'get' ).and.returnValue(Promise.reject("failure"));
                spyOn(_clientMock, 'post').and.returnValue(Promise.resolve({name:"Organization A", id:"organizationA"}));

                spyOn(_clientMock.board, 'create').and.returnValue(Promise.resolve({name:"Board A", id:"boardA", idOrganization:"organizationA"}));

                Organization.create(newOrganizationWithBoards)
                    .then(
                        (data) => {
                            expect(_clientMock.get).toHaveBeenCalledTimes(1);
                            expect(_clientMock.get.calls.mostRecent().args).toEqual([
                                `/search?query="Organization A"&modelTypes=organizations`
                            ]);
                            expect(_clientMock.post).toHaveBeenCalledTimes(1);
                            expect(_clientMock.post.calls.mostRecent().args).toEqual([
                                `/organizations`,
                                {name:"Organization A"}
                            ]);
                            expect(_clientMock.board.create).toHaveBeenCalledTimes(1);
                            expect(_clientMock.board.create.calls.mostRecent().args).toEqual([
                                {name: "Board A", idOrganization: "organizationA"},
                                false
                            ]);
                            expect(data).toEqual(Results.organizations[0]);
                            done();
                        },
                        () => fail("Should not throw an error")
                    );
            });

            it('forcing the creation of organization and board creation', (done) => {
                spyOn(_clientMock, 'get' ).and.throwError("Failure");
                spyOn(_clientMock, 'post').and.returnValue(Promise.resolve({name:"Organization A", id:"organizationA"}));

                spyOn(_clientMock.board, 'create').and.returnValue(Promise.resolve({name:"Board A", id:"boardA", idOrganization:"organizationA"}));

                Organization.create(newOrganizationWithBoards, true)
                    .then(
                        (data) => {
                            expect(_clientMock.get).toHaveBeenCalledTimes(0);

                            expect(_clientMock.post).toHaveBeenCalledTimes(1);
                            expect(_clientMock.post.calls.mostRecent().args).toEqual([
                                `/organizations`,
                                {name:"Organization A"}
                            ]);
                            expect(_clientMock.board.create).toHaveBeenCalledTimes(1);
                            expect(_clientMock.board.create.calls.mostRecent().args).toEqual([
                                {name: "Board A", idOrganization: "organizationA"},
                                true
                            ]);
                            expect(data).toEqual(Results.organizations[0]);
                            done();
                        },
                        () => fail("Should not throw an error")
                    );
            });

            it('the organization already exists and the organization has no boards', (done) => {
                spyOn(_clientMock, 'get' ).and.returnValue(Promise.resolve({organizations:[{name:"Organization A", id:"organizationA"}]}));
                spyOn(_clientMock, 'post').and.throwError("Failure");
                spyOn(_clientMock.board, 'create').and.throwError("Failure");

                Organization.create(newOrganizationWithoutBoards)
                    .then(
                        (data) => {
                            expect(_clientMock.get).toHaveBeenCalledTimes(1);
                            expect(_clientMock.get.calls.mostRecent().args).toEqual([
                                `/search?query="Organization A"&modelTypes=organizations`
                            ]);
                            expect(_clientMock.post).not.toHaveBeenCalled();
                            expect(_clientMock.board.create).not.toHaveBeenCalled();

                            expect(data).toEqual({id:"organizationA", name:"Organization A", boards:[]});
                            done();
                        },
                        () => fail("Should not throw an error")
                    );
            });
        });

        describe("Should fail when ", () => {
            it('the organization creation fails', (done) => {
                spyOn(_clientMock, 'get' ).and.throwError("Error");
                spyOn(_clientMock, 'post').and.returnValue(Promise.reject("Failure"));

                spyOn(_clientMock.board, 'create').and.throwError("Error");

                Organization.create(newOrganizationWithBoards, true)
                    .then(() => {
                        fail("Should not succeed")
                    },
                    (error) => {
                        expect(_clientMock.get).not.toHaveBeenCalled();

                        expect(_clientMock.post).toHaveBeenCalledTimes(1);
                        expect(_clientMock.post.calls.mostRecent().args).toEqual([
                            `/organizations`,
                            {name:"Organization A"}
                        ]);
                        expect(_clientMock.board.create).not.toHaveBeenCalled();

                        expect(error).toEqual("Failure");
                        done();
                    });
            });
        });

    });

    describe('delete', () => {
        describe("Should succeed when ", () => {
            it('deleting with Id', (done) => {
                spyOn(_clientMock, 'get'         ).and.returnValue( Promise.resolve([{id:"boardA"}]) );
                spyOn(_clientMock, 'delete'      ).and.returnValue( Promise.resolve());
                spyOn(_clientMock.board, 'delete').and.returnValue( Promise.resolve());

                Organization.delete({id:"organizationA"}, true)
                    .then(
                        (data) => {
                            expect(_clientMock.get).toHaveBeenCalledTimes(1);
                            expect(_clientMock.get.calls.mostRecent().args).toEqual([
                                `/organizations/organizationA/boards`
                            ]);
                            expect(_clientMock.delete).toHaveBeenCalledTimes(1);
                            expect(_clientMock.delete.calls.mostRecent().args).toEqual([
                                `/organizations/organizationA`
                            ]);
                            expect(_clientMock.board.delete).toHaveBeenCalledTimes(1);
                            expect(_clientMock.board.delete.calls.mostRecent().args).toEqual([
                                "boardA"
                            ]);
                            expect(data).toEqual({id:"organizationA"});
                            done();
                        },
                        () => fail("Should not throw an error")
                    );
            });

            it('deleting with name', (done) => {
                spyOn(_clientMock, 'get'         ).and.returnValues(
                    Promise.resolve({organizations:[{id:"organizationA"}]}),
                    Promise.resolve([{id:"boardA"}])
                );
                spyOn(_clientMock, 'delete'      ).and.returnValue( Promise.resolve());
                spyOn(_clientMock.board, 'delete').and.returnValue( Promise.resolve());

                Organization.delete({name:"Organization A"}, true)
                    .then(
                        (data) => {
                            expect(_clientMock.get).toHaveBeenCalledTimes(2);
                            expect(_clientMock.get.calls.argsFor(0)).toEqual([
                                `/search?query="Organization A"&modelTypes=organizations`
                            ]);
                            expect(_clientMock.get.calls.argsFor(1)).toEqual([
                                `/organizations/organizationA/boards`
                            ]);
                            expect(_clientMock.delete).toHaveBeenCalledTimes(1);
                            expect(_clientMock.delete.calls.mostRecent().args).toEqual([
                                `/organizations/organizationA`
                            ]);
                            expect(_clientMock.board.delete).toHaveBeenCalledTimes(1);
                            expect(_clientMock.board.delete.calls.mostRecent().args).toEqual([
                                "boardA"
                            ]);
                            expect(data).toEqual({name:"Organization A"});
                            done();
                        },
                        () => fail("Should not throw an error")
                    );
            });

            it('deleting with Id and without boards', (done) => {
                spyOn(_clientMock, 'get'         ).and.returnValue( Promise.resolve([]) );
                spyOn(_clientMock, 'delete'      ).and.returnValue( Promise.resolve());
                spyOn(_clientMock.board, 'delete').and.returnValue( Promise.resolve());

                Organization.delete({id:"organizationA"}, true)
                    .then(
                        (data) => {
                            expect(_clientMock.get).toHaveBeenCalledTimes(1);
                            expect(_clientMock.get.calls.mostRecent().args).toEqual([
                                `/organizations/organizationA/boards`
                            ]);
                            expect(_clientMock.delete).toHaveBeenCalledTimes(1);
                            expect(_clientMock.delete.calls.mostRecent().args).toEqual([
                                `/organizations/organizationA`
                            ]);
                            expect(_clientMock.board.delete).toHaveBeenCalledTimes(0);
                            expect(data).toEqual({id:"organizationA"});
                            done();
                        },
                        () => fail("Should not throw an error")
                    );
            });

            it('deleting with Id and keep the boards', (done) => {
                spyOn(_clientMock, 'get'         ).and.throwError("should not be called");
                spyOn(_clientMock, 'delete'      ).and.returnValue( Promise.resolve());
                spyOn(_clientMock.board, 'delete').and.returnValue( Promise.resolve());

                Organization.delete({id:"organizationA"})
                    .then(
                        (data) => {
                            expect(_clientMock.get).toHaveBeenCalledTimes(0);
                            expect(_clientMock.delete).toHaveBeenCalledTimes(1);
                            expect(_clientMock.delete.calls.mostRecent().args).toEqual([
                                `/organizations/organizationA`
                            ]);
                            expect(_clientMock.board.delete).toHaveBeenCalledTimes(0);
                            expect(data).toEqual({id:"organizationA"});
                            done();
                        },
                        () => fail("Should not throw an error")
                    );
            });
        });

        describe("Should not fail even when", () => {
            it('no Organization id or name is set', (done) => {
                spyOn(_clientMock, 'delete'      ).and.throwError("Error");
                spyOn(_clientMock, 'get'         ).and.throwError("Error");
                spyOn(_clientMock.board, 'delete').and.throwError("Error");

                Organization.delete({})
                    .then((data) => {
                            expect(_clientMock.get).not.toHaveBeenCalled();
                            expect(_clientMock.delete).not.toHaveBeenCalled();
                            expect(_clientMock.board.delete).not.toHaveBeenCalled();

                            expect(data).toEqual({});
                            done();
                        },
                        () => {
                            fail("Should not fail");
                            done();
                        });
            });

            it("the 'getByName' fails", (done) => {
                spyOn(_clientMock, 'delete'      ).and.throwError("Error");
                spyOn(_clientMock, 'get'         ).and.returnValue(Promise.reject("Error"));
                spyOn(_clientMock.board, 'delete').and.throwError("Error");

                Organization.delete({name:"Organization A"})
                    .then(
                        (data) => {
                            expect(_clientMock.get).toHaveBeenCalledTimes(1);
                            expect(_clientMock.get.calls.mostRecent().args).toEqual([
                                `/search?query="Organization A"&modelTypes=organizations`
                            ]);
                            expect(_clientMock.delete).not.toHaveBeenCalled();
                            expect(_clientMock.board.delete).not.toHaveBeenCalled();

                            expect(data).toEqual({name:"Organization A"});
                            done();
                        },
                        () => {
                            fail("Should not fail");
                            done()
                        });
            });
        });

    });
});
