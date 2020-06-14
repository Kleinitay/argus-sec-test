const http = require('http');
const url = require('url');
const resourceManager = require('./resourceManager');

const resource = new resourceManager.ResourceManager();

// Since the servers are very simple I didn't use express

// main server for call coming from outside
const getServer = http.createServer((req, res) => {
    let returned = undefined;
    let status = 200; 
    const fullUrl = url.parse(req.url, true);
    console.log("we got request from url ", fullUrl);

    if (fullUrl.pathname === '/api/resource' && req.method === 'GET') {
        const returnResource = resource.getResource();
        console.log("getting resource ", returnResource);
        res.setHeader('Content-Type', 'application/json');
        returned = JSON.stringify(returnResource);
    }

    res.statusCode = status;
    res.end(returned);
});

// Another server for internal calls
const postServer = http.createServer((req, res) => {
    let returned = undefined;
    let status = 200; 
    const fullUrl = url.parse(req.url, true);

    if (fullUrl.pathname === '/api/resource/set' && req.method === 'POST') {
        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            const resourceToAdd = JSON.parse(jsonString);
            console.log(console.log('we got an request with body: ', 
                resourceToAdd));
            resource.setResource(resourceToAdd);
            console.log("resource is set");
            returned = "resource set";
        });
    }

    res.statusCode = status;
    res.end(returned);
});

getServer.listen(8080);
postServer.listen(3000);