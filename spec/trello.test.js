
'use strict';

const Proxyquire   = require('proxyquire');

const MockHttp = {
    httpHelper: function(){}
};

const TrelloClient = Proxyquire('../lib/trello', {
    "./helper/http": function(method, uri, config, data){
        return MockHttp.httpHelper(method, uri, config, data);
    }
});

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

    describe("When an instance is created successfully, it should be possible to invoke HTTP Methods directly", () => {
        let client = new TrelloClient({
            key  : "fake-key",
            token: "fake-token"
        });

        it("/GET", (done) => {
            testRequest('get', '/boards/1234', undefined, done)
        });

        it("/POST", (done) => {
            testRequest('post', '/boards', {name: 'test', idOrganization: '1'}, done)
        });

        it("/DELETE", (done) => {
            testRequest('delete', '/boards/1234', undefined, done)
        });

        it("/PUT", (done) => {
            testRequest('put', '/boards/1234', {name: 'test', idOrganization: '1'}, done)
        });

        function testRequest(method, uri, data, done ){
            MockHttp.httpHelper = function(){
                return Promise.resolve({});
            };
            spyOn(MockHttp, 'httpHelper').and.callThrough();

            client[method](uri, data)
                .catch(() => fail("Should not fail execution"))
                .then (() => {
                    expect(MockHttp.httpHelper).toHaveBeenCalledTimes(1);
                    expect(MockHttp.httpHelper.calls.mostRecent().args[0]).toEqual(method);
                    expect(MockHttp.httpHelper.calls.mostRecent().args[1]).toEqual(uri);
                    expect(MockHttp.httpHelper.calls.mostRecent().args[2]).toEqual(client._config);
                    expect(MockHttp.httpHelper.calls.mostRecent().args[3]).toEqual(data);
                    done()
                });
        }
    })

});
