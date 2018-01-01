
'use strict';

const TrelloClient = require('../lib/trello');

describe("Given a 'TrelloClient' library", () => {

    describe("When creating an instance", () => {
        it("it should fail if no key is set", () => {
            expect( () => {
                new TrelloClient({
                    token: "fake-token"
                });
            }).toThrowError(Error, "Failed to build Trello Client:\n\tMissing config 'config.key' - Undefined Trello Key")
        });

        it("it should fail if no token is set", () => {
            expect( () => {
                new TrelloClient({
                    key: "fake-key"
                });
            }).toThrowError(Error, "Failed to build Trello Client:\n\tMissing config 'config.token' - Undefined Trello Token")
        });

        it("it should create an instance if both token and key are set", () => {
            new TrelloClient({
                key  : "fake-key",
                token: "fake-token"
            });
        });

        it("it should be possible to define a custom baseUrl", () => {
            let client = new TrelloClient({
                key    : "fake-key",
                token  : "fake-token",
                baseUrl: "http://fake-url.com"
            });
            expect(client._config.baseUrl).toBe("http://fake-url.com")
        })
    });

    describe("When an instance is created successfully, It should be possible to get a", () => {
        let client = new TrelloClient({
            key  : "fake-key",
            token: "fake-token"
        });

        it("'TrelloOrganizations' instance and a singleton", () => {
            let obj1 = client.organization;
            let obj2 = client.organization;

            expect(obj1).toBeDefined();
            expect(obj1.constructor.name).toBe("TrelloOrganizations");
            expect(obj1).toBe(obj2);
        });

        it("'TrelloBoards' instance and a singleton", () => {
            let obj1 = client.board;
            let obj2 = client.board;

            expect(obj1).toBeDefined();
            expect(obj1.constructor.name).toBe("TrelloBoards");
            expect(obj1).toBe(obj2);
        });

        it("'TrelloLists' instance and a singleton", () => {
            let obj1 = client.list;
            let obj2 = client.list;

            expect(obj1).toBeDefined();
            expect(obj1.constructor.name).toBe("TrelloLists");
            expect(obj1).toBe(obj2);
        });

        it("'TrelloCards' instance and a singleton", () => {
            let obj1 = client.card;
            let obj2 = client.card;

            expect(obj1).toBeDefined();
            expect(obj1.constructor.name).toBe("TrelloCards");
            expect(obj1).toBe(obj2);
        });
    });
});
