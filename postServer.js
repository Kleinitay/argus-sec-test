const http = require('http');
const url = require('url');
const axios = require('axios');

// Since the servers are very simple I didn't use express

async function sendResource(url, resource) {
    console.log(`now sending ${resource} to ${url}`);
    return axios.post(url, resource);
}

// Server for setting the reource
 
const server = http.createServer((req, res) => {
    let returned = undefined;
    let status = 200; 
    const remoteServerUrl = `${process.env.REMOTE_SERVER_URL}/api/resource/set`;
    const fullUrl = url.parse(req.url, true);
    if (fullUrl.pathname === '/api/resource' && req.method === 'POST') {
        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', async function () {
            const resourceToAdd = JSON.parse(jsonString);
            console.log(console.log('we got an request with body: ', 
            resourceToAdd));
            const response = await sendResource(remoteServerUrl, resourceToAdd);
            if (response.statusCode === 200) {
                returned = "resource set";
            } else {
                returned = "error occured";
            }
        });
    }

    res.statusCode = status;
    res.end(returned);
});

server.listen(8080);