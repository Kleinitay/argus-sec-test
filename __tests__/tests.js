// for simplicity I am placing all tests in a single file

jest.mock('axios');

describe('resourceManager', () => {
    it('Sets and gets a resource', () => {
        const resourceManager = require('../resourceManager');
        const resource = new resourceManager.ResourceManager();
        const theResource = {something: 'something'};
        resource.setResource(theResource);
        expect(resource.getResource()).toEqual(theResource);
    });
});

// Due to shortness of time I did not add endpoint tests