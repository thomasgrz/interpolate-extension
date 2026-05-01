import { describe, expect, it } from "vitest";
import { getCaptureGroupsFromString } from "./getCaptureGroupsFromString";

describe("getCaptureGroupsFromString", () => {
  it("should return array of capture group tuples", () => {
    const result = getCaptureGroupsFromString({
      source: "https://something.google.com/path?query",
      regex: ".*(something\.).*\/(.*)\\?(.*)",
    });
    expect(result).toEqual([
      ["$1", "something."],
      ["$2", "path"],
      ["$3", "query"],
    ]);
  });
});
