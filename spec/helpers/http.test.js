const proxyquire = require('proxyquire');
const sinon = require('sinon');






describe("Given a 'HttpHelper' library", () => {
    const baseUrl = 'http://www.test.com/';
    const token = 'token1234';
    const key = 'key1234';

    const mockConfig = {
        baseUrl,
        token,
        key

    };
    describe("When extracting query params from a url", () => {

        const requestStub = sinon.spy();
        const HttpHelper = proxyquire('../../lib/helper/http', {'request': requestStub});

        it("it should call request with correct params if no qs are passed", () => {
            const method = 'POST';
            const uri = 'resource';
            const expectedBody = {
                method,
                url: `${baseUrl}/${uri}`,
                qs: {
                    key,
                    token
                },
                body: undefined,
                json: true
            }
            HttpHelper(method, uri, mockConfig, undefined);
            sinon.assert.calledWith(requestStub, expectedBody, sinon.match.any);
        });
        xit("it should call request with correct params", () => {
           //need to understand extractQueryObj better
        });
    });
    describe("When making a request", () => {
        const requestStub = sinon.stub();
        const HttpHelper = proxyquire('../../lib/helper/http', {'request': requestStub});
        it("it should return a rejected promise if request fails", (done) => {
            const method = 'POST';
            const uri = 'resource';

            requestStub.callsFake((req, cb) => {
                cb('FakeError');
            });
            HttpHelper(method, uri, mockConfig, undefined)
                .catch((error) => {
                    expect(error).toBe('FakeError');
                    done();
                });

        });
        it("it should return a rejected promise with correct warning if request fails with status code 401", (done) => {
            const method = 'POST';
            const uri = 'resource';

            requestStub.callsFake((req, cb) => {
                cb(undefined, {statusCode: 401});
            });
            HttpHelper(method, uri, mockConfig, undefined)
                .catch((error) => {
                    expect(error.message).toBe('Unauthorized request - invalid Key/Token Ids.');
                    done();
                });
        });
        it("it should return a rejected promise with correct warning if request fails with status code 401", (done) => {
            const method = 'POST';
            const uri = 'resource';

            requestStub.callsFake((req, cb) => {
                cb(undefined, {statusCode: 404});
            });
            HttpHelper(method, uri, mockConfig, undefined)
                .catch((error) => {
                    expect(error.message).toBe('Not found - requested item was not found.');
                    done();
                });
        });
        it("it should return a resolved promise with correct data if request is successful", (done) => {
            const sampleData = {message: 'data'};
            const method = 'POST';
            const uri = 'resource';

            requestStub.callsFake((req, cb) => {
                cb(undefined, {statusCode: 200}, sampleData);
            });
            HttpHelper(method, uri, mockConfig, undefined)
                .then((data) => {
                    expect(data).toEqual(sampleData);
                    done();
                });
        });
    });
});