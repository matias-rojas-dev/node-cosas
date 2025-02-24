import { User } from "./03-callbacks"

const users: User[] = [
  { id: 1, name: "Luffy" },
  { id: 2, name: "Zoro" },
  { id: 3, name: "Sanji" },
  { id: 4, name: "Nami" },
  { id: 5, name: "Usopp" },
  { id: 6, name: "Neko" },
]

export const findByUserId = (
  id: number,
  callback: (err?: string, user?: User) => void
) => {
  const user = users.find(function (user) {
    return user.id === id
  })

  return user
    ? callback(undefined, user)
    : callback(`User not found with id: ${id}`)
}
