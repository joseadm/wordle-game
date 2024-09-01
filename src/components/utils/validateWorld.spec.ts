import { validateWord } from "./validateWord";

test("validateWord should return correct feedback for a correct guess", () => {
  const guess = "apple";
  const target = "apple";
  const expected = ["green", "green", "green", "green", "green"];
  const result = validateWord(guess, target);
  expect(result).toEqual(expected);
});

test("validateWord should return correct feedback for a partially correct guess", () => {
  const guess = "apple";
  const target = "grape";
  const expected = ["orange", "orange", "no-color", "no-color", "green"];
  const result = validateWord(guess, target);
  expect(result).toEqual(expected);
});

test("validateWord should return correct feedback for an incorrect guess", () => {
  const guess = "apple";
  const target = "grapo";
  const expected = ["orange", "orange", "no-color", "no-color", "no-color"];
  const result = validateWord(guess, target);
  expect(result).toEqual(expected);
});
