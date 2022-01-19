const { request } = require("./request")

const DEFAULT_OFFSET_SIZE = 0;
const DEFAULT_LIMIT_SIZE = 20;

class edition {
    static get = (datasetID, editionID) => {
        const url = `/datasets/${datasetID}/editions/${editionID}`;
        return request.get(url);
    } 

    static getAll = (datasetID, offset, limit) => {
        const url = `/datasets/${datasetID}/editions?offset=${ offset ? offset : DEFAULT_OFFSET_SIZE }&limit=${ limit ? limit : DEFAULT_LIMIT_SIZE }`;
        return request.get(url).then(response => (response.items));
    }
}

exports.edition = edition