const users = [
  { id: 1, name: "Luffy" },
  { id: 2, name: "Zoro" },
  { id: 3, name: "Sanji" },
  { id: 4, name: "Nami" },
  { id: 5, name: "Usopp" },
  { id: 6, name: "Neko" },
]

const findByUserId = (id, callback) => {
  const user = users.find(function (user) {
    return user.id === id
  })

  return user
    ? callback(null, user)
    : callback(new Error("User not found"), null)
}

module.exports = {
  findByUserId,
}
