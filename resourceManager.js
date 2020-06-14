
// this is the resource manager, while it is simple her and only holds one resource it can be extended
// e.g. using multiple resources or using a DB instead of in-memory

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