
module.exports = {
    ResourceManager: class ResourceManager {
        constructor() {
            this.resource = undefined;
        }

        setResource(resourceToAdd) {
            this.resource = resourceToAdd;
        }

        getResource() {
            return this.resource;
        }
    }
}