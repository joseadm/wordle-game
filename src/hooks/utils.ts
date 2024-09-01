import { CELL_COLOR } from "../constants";

export const updateKeysStatus = (
  guesses: string,
  feedback: string[],
  current: Record<string, string> = {}
) => {
  guesses.split("").forEach((letter, letterIndex) => {
    switch (feedback[letterIndex]) {
      case CELL_COLOR.GREEN:
        current[letter] = CELL_COLOR.GREEN;
        break;
      case CELL_COLOR.ORANGE:
        if (current[letter] !== CELL_COLOR.GREEN) {
          current[letter] = CELL_COLOR.ORANGE;
        }
        break;
      default:
        if (
          current[letter] !== CELL_COLOR.GREEN &&
          current[letter] !== CELL_COLOR.ORANGE
        ) {
          current[letter] = CELL_COLOR.NO_COLOR;
        }
        break;
    }
  });
  return current;
};
