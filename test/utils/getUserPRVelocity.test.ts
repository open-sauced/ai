import { describe, it, expect } from "vitest";
import { getUserPRVelocity } from "../../src/utils/getUserPRVelocity";
import { IUserPR } from "../../src/ts/types";

describe("getUserPRVelocity", () => {
  it("should return consider all enteries to return averageVelocity", () => {
    const prDetails = [
      { state: "merged", created_at: "2022-12-24", closed_at: "2023-01-15" },
      { state: "merged", created_at: "2023-02-18", closed_at: "2023-02-19" },
      { state: "merged", created_at: "2023-02-20", closed_at: "2023-03-1" },
    ] as IUserPR[];
    const averageVelocity = getUserPRVelocity(prDetails);
    expect(averageVelocity).toBe(10);
  });

  it("should only consider closed entries it has a cloesd_at property", () => {
    const prDetails = [
      { state: "open", created_at: "2023-06-01", closed_at: "2023-06-03" },
      { state: "open", created_at: "2023-06-05", closed_at: "" },
    ] as IUserPR[];
    const averageVelocity = getUserPRVelocity(prDetails);
    expect(averageVelocity).toBe(0);
  });

  it("should return 0 if there are not enteries ", () => {
    const prDetails = [];
    const averageVelocity = getUserPRVelocity(prDetails);
    expect(averageVelocity).toBe(0);
  });
});
