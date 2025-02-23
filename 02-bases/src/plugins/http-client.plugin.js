const axios = require("axios")

const httpClientPlugin = {
  GET_FETCH: async (url) => {
    const resp = await fetch(url)
    return await resp.json()
  },

  GET_AXIOS: async (url) => {
    const { data } = await axios.get(url)
    return data
  },
}

module.exports = {
  httpClientPlugin,
}
