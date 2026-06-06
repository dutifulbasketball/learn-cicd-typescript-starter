import { describe, expect, test } from "vitest";
import { API_KEY_HEADER, getAPIKey } from "../api/auth.js";
import { randomUUID } from "node:crypto";

function getValidApiKeyAuth(key: string) {
  return `${API_KEY_HEADER} ${key}`;
}

describe("getAPIKey", () => {
  test("returns null when authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when authorization header has no space", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });

  test("returns null when scheme is not ApiKey", () => {
    expect(getAPIKey({ authorization: "Bearer sometoken" })).toBeNull();
  });

  test("returns null when scheme is wrong case", () => {
    expect(getAPIKey({ authorization: "apikey sometoken" })).toBeNull();
  });

  test("returns the key when header is valid", () => {
    const secretKey = randomUUID();
    expect(getAPIKey({ authorization: getValidApiKeyAuth(secretKey) })).toBe(
      "secretKey",
    );
  });
});
