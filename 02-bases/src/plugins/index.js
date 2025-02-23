const { getAge } = require("./get-age.plugin")
const { getUuid } = require("./get-id.plugin")
const { httpClientPlugin } = require("./http-client.plugin")
const buildLogger = require("./logger.plugin")

module.exports = {
  getUuid,
  getAge,
  httpClientPlugin,
  buildLogger,
}
