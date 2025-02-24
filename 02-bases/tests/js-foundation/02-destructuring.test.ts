import { characters } from "../../src/js-foundation/02-destructuring"

describe("02-destructuring", () => {
  test("array containt a luffy", () => {
    expect(characters).toContain("Luffy")
  })

  test("Second character should be Zoro", () => {
    const [, Zoro] = characters

    expect(Zoro).toBe("Zoro")
  })
})
