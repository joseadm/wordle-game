// utils/validateWord.ts
export const validateWord = (guess: string, target: string): string[] => {
  const feedback = Array(5).fill("");
  const targetLetters = target.split("");
  const guessLetters = guess.split("");

  guessLetters.forEach((letter, index) => {
    if (letter.toLocaleLowerCase() === target[index]) {
      feedback[index] = "green";
      targetLetters[index] = ""; // Mark this letter as used
    } else if (targetLetters.includes(letter.toLocaleLowerCase())) {
      feedback[index] = "orange";
      const targetIndex = targetLetters.indexOf(letter.toLocaleLowerCase());
      targetLetters[targetIndex] = ""; // Mark this letter as used
    } else {
      feedback[index] = "no-color";
    }
  });

  return feedback;
};
