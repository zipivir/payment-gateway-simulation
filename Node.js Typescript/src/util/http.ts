import config from "../config";
const rp = require('request-promise');


const getDefaultHeaders = (headers: any) => ({
    Connection: 'keep-alive',
    Identifier: headers.identifier ? headers.identifier : config.app.identifier
});

module.exports = {
    post: (uri: URL, headers: Headers, body: Body) => rp({
        method: 'POST',
        uri,
        body,
        json: true,
        headers: getDefaultHeaders(headers)
    })
}