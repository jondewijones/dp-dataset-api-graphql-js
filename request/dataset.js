const { request } = require("./request")

const DEFAULT_OFFSET_SIZE = 0;
const DEFAULT_LIMIT_SIZE = 20;

class dataset {
    static get = (id) => {
        const url = `/datasets/${id}`;
        return request.get(url);
    } 

    static getAll = (offset, limit) => {
        const url = `/datasets?offset=${ offset ? offset : DEFAULT_OFFSET_SIZE }&limit=${ limit ? limit : DEFAULT_LIMIT_SIZE }`;
        return request.get(url).then(response => (response.items))
    }
}

exports.dataset = dataset