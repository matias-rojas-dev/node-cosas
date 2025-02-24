const axios = require("axios")

export const httpClientPlugin = {
  GET_FETCH: async (url: string) => {
    const resp = await fetch(url)
    return await resp.json()
  },

  GET_AXIOS: async (url: string) => {
    const { data } = await axios.get(url)
    return data
  },
}
