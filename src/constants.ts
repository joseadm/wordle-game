import { GameStatus } from "./types";

export const WORD_SIZE = 5;
export const EVENT_KEY_ENTER = "Enter";
export const EVENT_KEY_BACKSPACE = "Backspace";
export const EVENT_KEY_DOWN = "keydown";
export const GAME_STATE: Record<string, GameStatus> = {
  WIN: "win",
  LOSS: "loss",
  IN_PROGRESS: "in-progress",
};
export const CELL_COLOR = {
  GREEN: "green",
  ORANGE: "orange",
  NO_COLOR: "no-color",
};
export const LETTER_REGEX = /^[a-zA-Z]$/;
