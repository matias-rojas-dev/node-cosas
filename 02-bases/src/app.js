const {getAge, getUuid} = require('./plugins')
const {buildMakePerson} = require('./js-foundation/05-factory')

const makePerson = buildMakePerson({getUuid, getAge})

const obj = {name:"Matías", birthday: "1999-01-22"}

const matias = makePerson(obj)

console.log(matias)