const http = require('http');
const url = require('url');
const resourceManager = require('./resourceManager');

const resource = new resourceManager.ResourceManager();

//main server for call coming from outside
const getServer = http.createServer((req, res) => {
    let returned = undefined;
    let status = 200; 
    const fullUrl = url.parse(req.url, true);
    console.log("we got request from url ", fullUrl);

    if (fullUrl.pathname === '/api/resource') {
        const returnResource = resource.getResource();
        console.log("getting resource ", returnResource);
        res.setHeader('Content-Type', 'application/json');
        returned = JSON.stringify(returnResource);
    }

    res.statusCode = status;
    res.end(returned);
});

// I am using another server for internal calls
const postServer = http.createServer((req, res) => {
    if (fullUrl.pathname === '/api/resource/set') {
        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            const resourceToAdd = JSON.parse(jsonString);
            console.log(console.log('we got an request with body: ', 
            resourceToAdd));
            resource.setResource(resourceToAdd);
            returned = "resource set";
        });
    }
});

getServer.listen(8080);
postServer.listen(3000);