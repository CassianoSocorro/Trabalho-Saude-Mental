import { throwErrorIfNegative } from "../src/utils/errorHandler";

describe("error handling", () => {
  test("should throw an error if the number is negative", () => {
    expect(() => throwErrorIfNegative(-1)).toThrow(
      "Número não pode ser negativo."
    );
  });

  test("should not throw an error if the number is positive", () => {
    expect(throwErrorIfNegative(1)).toBe(1);
  });

  test("should not throw an error if the number is zero", () => {
    expect(throwErrorIfNegative(0)).toBe(0);
  });
});
