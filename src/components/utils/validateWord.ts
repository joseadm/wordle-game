import { CELL_COLOR } from "../../constants";

// utils/validateWord.ts
export const validateWord = (guess: string, target: string): string[] => {
  const targetLetters = target.toLocaleLowerCase().split("");
  const guessLetters = guess.toLocaleLowerCase().split("");

  const feedback: Array<string> = guessLetters.map((letter, index) => {
    if (letter === target[index]) {
      targetLetters[index] = ""; // Mark this letter as used
      return CELL_COLOR.GREEN;
    }
    return "";
  });

  guessLetters.forEach((letter, index) => {
    if (feedback[index]) return; // Skip already matched letters
    if (targetLetters.includes(letter)) {
      feedback[index] = CELL_COLOR.ORANGE;
      const targetIndex = targetLetters.indexOf(letter);
      targetLetters[targetIndex] = ""; // Mark this letter as used
    } else {
      feedback[index] = CELL_COLOR.NO_COLOR;
    }
  });

  return feedback;
};
