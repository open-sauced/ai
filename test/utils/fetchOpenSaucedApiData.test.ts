import { describe, it, expect } from "vitest"
import { isOpenSaucedUser } from "../../src/utils/fetchOpenSaucedApiData"

describe("isOpenSaucedUser", () => {
    it("should return true for an open sauced user", async () => {
        expect(await isOpenSaucedUser("bdougie")).toBe(true)
    })
    it("should return false for a non open sauced user", async () => {
        expect(await isOpenSaucedUser("1")).toBe(false)
    })
})