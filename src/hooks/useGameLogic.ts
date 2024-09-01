import { useCallback, useEffect, useState } from "react";
import {
  CELL_COLOR,
  EVENT_KEY_BACKSPACE,
  EVENT_KEY_ENTER,
  GAME_STATE,
  WORD_SIZE,
} from "../constants";
import { GameStatus } from "../types";
import { fetchWord } from "../api";
import { validateWord } from "../components/utils/validateWord";

interface GameState {
  gameState: GameStatus;
  guesses: string[];
  feedback: string[][];
  currentGuess: string;
  keys: any;
  handleLetterInput: (letter: string) => void;
  handleBackspace: () => void;
  handleEnter: () => void;
  resetGame: () => void;
}

// Custom Hook for managing game state
export const useGameLogic = (): GameState => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[][]>([]);
  const [keys, setKeys] = useState<any>({});
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameState, setGameState] = useState<GameStatus>(
    GAME_STATE.IN_PROGRESS as GameStatus
  );
  const [targetWord, setTargetWord] = useState<string>("");

  const fetchData = useCallback(async () => {
    const word = await fetchWord();
    setTargetWord(word);
  }, []);

  const resetGame = () => {
    setGuesses([]);
    setFeedback([]);
    setKeys({});
    setCurrentGuess("");
    setGameState(GAME_STATE.IN_PROGRESS as GameStatus);
    setTargetWord("");
  };

  const handleLetterInput = (letter: string) => {
    if (
      currentGuess.length < WORD_SIZE &&
      gameState === GAME_STATE.IN_PROGRESS
    ) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleBackspace = () => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }
  };

  const generateBestGuess = (guesses: string[], feedback: string[][]) => {
    const result = {} as any;
    guesses.forEach((guess, index) => {
      guess.split("").forEach((letter, letterIndex) => {
        if (result[letter] === CELL_COLOR.GREEN) return;
        if (feedback[index][letterIndex] === CELL_COLOR.GREEN) {
          result[letter] = CELL_COLOR.GREEN;
          return;
        }
        if (result[letter] === CELL_COLOR.ORANGE) return;
        if (feedback[index][letterIndex] === CELL_COLOR.ORANGE) {
          result[letter] = CELL_COLOR.ORANGE;
          return;
        }
        result[letter] = CELL_COLOR.NO_COLOR;
      });
    });
    return result;
  };

  const handleEnter = () => {
    if (
      currentGuess.length === WORD_SIZE &&
      gameState === GAME_STATE.IN_PROGRESS
    ) {
      const currentFeedback = validateWord(currentGuess, targetWord);
      setGuesses([...guesses, currentGuess]);
      setFeedback([...feedback, currentFeedback]);
      setKeys(
        generateBestGuess(
          [...guesses, currentGuess],
          [...feedback, currentFeedback]
        )
      );
      if (currentGuess.toLocaleLowerCase() === targetWord) {
        setGameState(GAME_STATE.WIN as GameStatus);
      } else if (guesses.length === 4) {
        setGameState(GAME_STATE.LOSS as GameStatus);
      }

      setCurrentGuess("");
    }
  };

  useEffect(() => {
    if (!targetWord) fetchData();
  }, [targetWord, fetchData]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== GAME_STATE.IN_PROGRESS) return;

      if (event.key === EVENT_KEY_ENTER) {
        handleEnter();
      } else if (event.key === EVENT_KEY_BACKSPACE) {
        handleBackspace();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleLetterInput(event.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, gameState]);

  return {
    gameState,
    guesses,
    feedback,
    currentGuess,
    keys,
    handleLetterInput,
    handleBackspace,
    handleEnter,
    resetGame,
  };
};
