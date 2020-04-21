const Proxyquire = require('proxyquire');

const HttpMock = {
    request: function(){}
};
const HttpHelper = Proxyquire('../lib/helper/http', {
    'request': function(data, callback){
        HttpMock.request(data, callback)
    }
});


describe("Given a 'HttpHelper' library", () => {
    const baseUrl = 'http://www.test.com/';
    const token = 'token1234';
    const key = 'key1234';

    const mockConfig = {
        baseUrl,
        token,
        key
    };

    describe("it should succeed when", () => {
        it("no data nor queryString is set", (done) => {
            const method = 'POST';
            const uri = 'resource';
            const expectedBody = {
                method: method,
                url   : `${baseUrl}/${uri}`,
                qs    : {
                    key:   key,
                    token: token
                },
                body: undefined,
                json: true
            };
            spyOn(HttpMock, 'request').and.callFake(function(data, callback){
                callback(undefined, {statusCode: 200}, {})
            });
            HttpHelper(method, uri, mockConfig).then(
                data => {
                    expect(HttpMock.request).toHaveBeenCalledTimes(1);
                    expect(HttpMock.request.calls.mostRecent().args[0]).toEqual(expectedBody);
                    expect(data).toEqual({});
                    done()
                });
        });

        it("when using data", (done) => {
            const method = 'POST';
            const uri = 'resource';
            const expectedBody = {
                method: method,
                url   : `${baseUrl}/${uri}`,
                qs    : {
                    key:   key,
                    token: token
                },
                body: {
                    param1: "value1"
                },
                json: true
            };
            spyOn(HttpMock, 'request').and.callFake(function(data, callback){
                callback(undefined, {statusCode: 200}, {})
            });
            HttpHelper(method, uri, mockConfig, {param1: "value1"}).then(
                data => {
                    expect(HttpMock.request).toHaveBeenCalledTimes(1);
                    expect(HttpMock.request.calls.mostRecent().args[0]).toEqual(expectedBody);
                    expect(data).toEqual({});
                    done()
                });
        });

        it("when using queryString", (done) => {
            const method = 'GET';
            const uri = 'resource';
            const expectedBody = {
                method: method,
                url   : `${baseUrl}/${uri}`,
                qs    : {
                    key:   key,
                    token: token,
                    param1: "value1",
                    param2: "???"
                },
                body: undefined,
                json: true
            };
            spyOn(HttpMock, 'request').and.callFake(function(data, callback){
                callback(undefined, {statusCode: 200}, {})
            });
            HttpHelper(method, `${uri}?param1=value1&param2=???`, mockConfig).then(
                data => {
                    expect(HttpMock.request).toHaveBeenCalledTimes(1);
                    expect(HttpMock.request.calls.mostRecent().args[0]).toEqual(expectedBody);
                    expect(data).toEqual({});
                    done()
                });
        });
    });

    describe("it should fail when", () => {
        it("when an error is returned", (done) => {
            const method = 'GET';
            const uri = 'resource';
            const expectedBody = {
                method: method,
                url   : `${baseUrl}/${uri}`,
                qs    : {
                    key:   key,
                    token: token,
                    param1: "value1",
                    param2: "???"
                },
                body: undefined,
                json: true
            };
            spyOn(HttpMock, 'request').and.callFake(function(data, callback){
                callback("Failure", {statusCode: 200}, {})
            });
            HttpHelper(method, `${uri}?param1=value1&param2=???`, mockConfig).then(
                () => {
                    fail("should fail");
                    done();
                },
                error => {
                    expect(HttpMock.request).toHaveBeenCalledTimes(1);
                    expect(HttpMock.request.calls.mostRecent().args[0]).toEqual(expectedBody);
                    expect(error).toEqual("Failure");
                    done()
                });
        });

        it("when status code 401 is returned", (done) => {
            const method = 'GET';
            const uri = 'resource';
            const expectedBody = {
                method: method,
                url   : `${baseUrl}/${uri}`,
                qs    : {
                    key:   key,
                    token: token,
                    param1: "value1",
                    param2: "???"
                },
                body: undefined,
                json: true
            };
            spyOn(HttpMock, 'request').and.callFake(function(data, callback){
                callback(null, {statusCode: 401}, {})
            });
            HttpHelper(method, `${uri}?param1=value1&param2=???`, mockConfig).then(
                () => {
                    fail("should fail");
                    done();
                },
                error => {
                    expect(HttpMock.request).toHaveBeenCalledTimes(1);
                    expect(HttpMock.request.calls.mostRecent().args[0]).toEqual(expectedBody);
                    expect(error.message).toEqual('Unauthorized request - invalid Key/Token Ids.');
                    done()
                });
        });

        it("when status code 401 is returned with a body", (done) => {
            const method = 'GET';
            const uri = 'resource';
            spyOn(HttpMock, 'request').and.callFake(function(data, callback){
                callback(null, {statusCode: 401, body:'Error happened within the test'}, {})
            });
            HttpHelper(method, `${uri}?param1=value1&param2=???`, mockConfig).then(
                () => {
                    fail("should fail");
                    done();
                },
                error => {
                    expect(error.message).toEqual('Error happened within the test');
                    done()
                });
        });

        it("when back end error status code is returned", (done) => {
            const method = 'GET';
            const uri = 'resource';
            spyOn(HttpMock, 'request').and.callFake(function(data, callback){
                callback(null, {statusCode: 500}, {})
            });
            HttpHelper(method, `${uri}?param1=value1&param2=???`, mockConfig).then(
                () => {
                    fail("should fail");
                    done();
                },
                error => {
                    expect(error.message).toEqual('An unknown error occurred');
                    done()
                });
        });

        it("when status code 401 is returned", (done) => {
            const method = 'GET';
            const uri = 'resource';
            const expectedBody = {
                method: method,
                url   : `${baseUrl}/${uri}`,
                qs    : {
                    key:   key,
                    token: token,
                    param1: "value1",
                    param2: "???"
                },
                body: undefined,
                json: true
            };
            spyOn(HttpMock, 'request').and.callFake(function(data, callback){
                callback(null, {statusCode: 404}, {})
            });
            HttpHelper(method, `${uri}?param1=value1&param2=???`, mockConfig).then(
                () => {
                    fail("should fail");
                    done();
                },
                error => {
                    expect(HttpMock.request).toHaveBeenCalledTimes(1);
                    expect(HttpMock.request.calls.mostRecent().args[0]).toEqual(expectedBody);
                    expect(error.message).toEqual('Not found - requested item was not found.');
                    done()
                });
        });
    });
});
