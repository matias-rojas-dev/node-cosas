const getAgePlugin = require("get-age")

export const getAge = (birthday: string) => {
  return getAgePlugin(birthday)
}
