import request from "./request.js";

const DEFAULT_OFFSET_SIZE = 0;
const DEFAULT_LIMIT_SIZE = 20;

export class version {
    static get = (datasetID, editionID, versionID) => {
        const url = `/datasets/${datasetID}/editions/${editionID}/versions/${versionID}`;
        return request.get(url);
    } 

    static getAll = (datasetID, editionID, offset, limit) => {
        const url = `/datasets/${datasetID}/editions/${editionID}/versions?offset=${ offset ? offset : DEFAULT_OFFSET_SIZE }&limit=${ limit ? limit : DEFAULT_LIMIT_SIZE }`;
        return request.get(url).then(response => (response.items));
    }
}