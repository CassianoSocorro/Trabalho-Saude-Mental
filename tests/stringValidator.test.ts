import { isNonEmptyString } from "../src/utils/stringValidator";

describe("isNonEmptyString Validation", () => {
  test("should return true for a valid, non-empty string", () => {
    expect(isNonEmptyString("Sessão de Terapia")).toBe(true);
    expect(isNonEmptyString("Dr. Almeida")).toBe(true);
  });

  test("should return false for empty strings or strings with only whitespace", () => {
    expect(isNonEmptyString("")).toBe(false);
    expect(isNonEmptyString("   ")).toBe(false);
  });

  test("should return false for non-string inputs (null, undefined, number)", () => {
    expect(isNonEmptyString(null)).toBe(false);
    expect(isNonEmptyString(undefined)).toBe(false);
    expect(isNonEmptyString(12345)).toBe(false);
    expect(isNonEmptyString({})).toBe(false);
  });
});
