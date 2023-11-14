import request from "./request.js";

const DEFAULT_OFFSET_SIZE = 0;
const DEFAULT_LIMIT_SIZE = 20;

export const getEdition = (datasetID, editionID) => {
    const url = `/datasets/${datasetID}/editions/${editionID}`;
    return request(url);
} 

export const getAllEditions = (datasetID, offset, limit) => {
    const url = `/datasets/${datasetID}/editions?offset=${ offset ? offset : DEFAULT_OFFSET_SIZE }&limit=${ limit ? limit : DEFAULT_LIMIT_SIZE }`;
    return request(url).then(response => response.items);
}