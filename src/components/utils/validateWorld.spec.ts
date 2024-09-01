import { CELL_COLOR } from "../../constants";
import { validateWord } from "./validateWord";

describe("validateWord", () => {
  it("validateWord should return correct feedback for a correct guess", () => {
    const guess = "apple";
    const target = "apple";
    const expected = [
      CELL_COLOR.GREEN,
      CELL_COLOR.GREEN,
      CELL_COLOR.GREEN,
      CELL_COLOR.GREEN,
      CELL_COLOR.GREEN,
    ];
    const result = validateWord(guess, target);
    expect(result).toEqual(expected);
  });

  it("validateWord should return correct feedback for a partially correct guess", () => {
    const guess = "apple";
    const target = "grape";
    const expected = [
      CELL_COLOR.ORANGE,
      CELL_COLOR.ORANGE,
      CELL_COLOR.NO_COLOR,
      CELL_COLOR.NO_COLOR,
      CELL_COLOR.GREEN,
    ];
    const result = validateWord(guess, target);
    expect(result).toEqual(expected);
  });

  it("validateWord should return correct feedback for an incorrect guess", () => {
    const guess = "apple";
    const target = "grapo";
    const expected = [
      CELL_COLOR.ORANGE,
      CELL_COLOR.ORANGE,
      CELL_COLOR.NO_COLOR,
      CELL_COLOR.NO_COLOR,
      CELL_COLOR.NO_COLOR,
    ];
    const result = validateWord(guess, target);
    expect(result).toEqual(expected);
  });

  it("validateWord should return correct feedback for a partially correct guess and consider duplicated letters", () => {
    const guess = "hello";
    const target = "aloha";
    const expected = [
      CELL_COLOR.ORANGE,
      CELL_COLOR.NO_COLOR,
      CELL_COLOR.ORANGE,
      CELL_COLOR.NO_COLOR,
      CELL_COLOR.ORANGE,
    ];
    const result = validateWord(guess, target);
    expect(result).toEqual(expected);
  });

  it("validateWord should return correct feedback for a partially correct guess and consider duplicated letters", () => {
    const guess = "aaaaa";
    const target = "aloha";
    const expected = [
      CELL_COLOR.GREEN,
      CELL_COLOR.NO_COLOR,
      CELL_COLOR.NO_COLOR,
      CELL_COLOR.NO_COLOR,
      CELL_COLOR.GREEN,
    ];
    const result = validateWord(guess, target);
    expect(result).toEqual(expected);
  });
});
