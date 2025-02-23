const buildMakePerson = ({getUuid, getAge}) => {
    return ({name, birthday}) => {
        return {
            id: getUuid(),
            name,
            birthday,
            age: getAge(birthday)
        }
    }
}

module.exports = {
    buildMakePerson
}