import { describe, it, expect } from "vitest"

import {
    OPEN_SAUCED_USERS_ENDPOINT,
    OPEN_SAUCED_SESSION_ENDPOINT,
    OPEN_SAUCED_REPOS_ENDPOINT,
    OPEN_SAUCED_USER_INSIGHTS_ENDPOINT,
} from "../../src/constants";
import { UserResponse } from "./types/userResponse";

describe("openSaucedUserEndpoint", () => {
    it("should return a user object", async () => {
        const response = await fetch(`${OPEN_SAUCED_USERS_ENDPOINT}/bdougie`);
        const data = await response.json() as UserResponse;
        expect(data.login).toBe("bdougie");
    })

    it("should return a 404 error for a user that does not exist", async () => {
        const response = await fetch(`${OPEN_SAUCED_USERS_ENDPOINT}/1`);
        expect(response.status).toBe(404);
    })
})