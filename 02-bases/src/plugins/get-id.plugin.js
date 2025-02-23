const {v4: uuid } = require("uuid")

const getUuid = () => {
    return uuid()
}

module.exports = {
    getUuid
}