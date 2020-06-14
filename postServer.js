const http = require('http');
const url = require('url');
const axios = require('axios');

async function sendResource(url, resource) {
    console.log(`now sending ${resource} to ${url}`);
    return axios.post(url, {data: resource});
}

const server = http.createServer((req, res) => {
    let returned = "";
    let status = 200; 
    const remoteServerUrl = `${process.env.REMOTE_SERVER_URL}/api/resource/set`;
    const fullUrl = url.parse(req.url, true);
    if (fullUrl.pathname === '/api/resource') {
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

server.listen(3001);