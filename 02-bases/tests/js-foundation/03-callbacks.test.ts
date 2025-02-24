import { findByUserId } from "../../src/js-foundation/03-callbacks"

describe("03-callback", () => {
  test("getUserById should return an error if user doesnt exist", () => {
    const id = 10
    findByUserId(id, (err, user) => {
      expect(user).toBeUndefined()
      expect(err).toBe(`User not found with id: ${id}`)
    })
  })
})
