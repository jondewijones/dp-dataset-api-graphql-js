import axios  from "axios";

const DATASET_API_URL = process.env.DATASET_API_URL || "https://api.beta.ons.gov.uk/v1"

const request = (url) => {
    return axios.get(url, {
        baseURL: DATASET_API_URL,
        headers: {
            "User-Agent": "dp-dataset-api-graphql-js/Version0.0.1 (+https://github.com/jondewijones/dp-dataset-api-graphql-js)"
        }
    })
    .then(response => (response.data))
}

export default request