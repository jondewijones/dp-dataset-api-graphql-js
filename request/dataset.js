import request from "./request.js";

const DEFAULT_OFFSET_SIZE = 0;
const DEFAULT_LIMIT_SIZE = 20;

export const getDataset = (id) => {
    const url = `/datasets/${id}`;
    return request.get(url);
} 

export const getAllDatasets = (offset, limit) => {
    const url = `/datasets?offset=${ offset ? offset : DEFAULT_OFFSET_SIZE }&limit=${ limit ? limit : DEFAULT_LIMIT_SIZE }`;
    return request(url).then(response => (response.items));
}