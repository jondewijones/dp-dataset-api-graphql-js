const axios = require("axios")

const DATASET_API_URL = process.env.DATASET_API_URL || "https://api.beta.ons.gov.uk/v1"

class request {
    static get = (url) => {
        return axios.get(url, {
            baseURL: DATASET_API_URL,
        })
        .then(response => (response.data))
        .catch(error => console.error(error))
    }


}

exports.request = request