import { isEven } from "../src/utils/isEven";

describe("isEven", () => {
  test("should return true for an even number", () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(0)).toBe(true);
    expect(isEven(100)).toBe(true);
  });

  test("should return false for an odd number", () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(3)).toBe(false);
    expect(isEven(99)).toBe(false);
  });

  test("should return true for negative even numbers", () => {
    expect(isEven(-2)).toBe(true);
    expect(isEven(-100)).toBe(true);
  });

  test("should return false for negative odd numbers", () => {
    expect(isEven(-1)).toBe(false);
    expect(isEven(-99)).toBe(false);
  });

  test("should return false for floating point numbers", () => {
    expect(isEven(2.5)).toBe(false);
  });
});
