const { getAge } = require("./get-age.plugin")
const { getUuid } = require("./get-id.plugin")
const { httpClientPlugin } = require("./http-client.plugin")
module.exports = {
  getUuid,
  getAge,
  httpClientPlugin,
}
