import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  EVENT_KEY_BACKSPACE,
  EVENT_KEY_DOWN,
  EVENT_KEY_ENTER,
  GAME_STATE,
  LETTER_REGEX,
  TRIES,
  WORD_SIZE,
} from "../constants";
import { GameStatus } from "../types";
import { fetchWord, fetchWordIsValid } from "../api";
import { validateWord } from "../components/utils/validateWord";
import { updateKeysStatus } from "./utils";
import { useTranslation } from "react-i18next";

interface GameState {
  gameState: GameStatus;
  guesses: string[];
  feedback: string[][];
  currentGuess: string;
  error: Error | null;
  keysStatus: Record<string, string>;
  targetWord: string;
  wordSize: number;
  setWordSize: Dispatch<SetStateAction<number>>;
  handleLetterInput: (letter: string) => void;
  handleBackspace: () => void;
  handleEnter: () => void;
  resetGame: () => void;
}

// Custom Hook for managing game state
export const useGameLogic = (): GameState => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[][]>([]);
  const [keysStatus, setKeysStatus] = useState<Record<string, string>>({});
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [wordSize, setWordSize] = useState<number>(WORD_SIZE);

  const [gameState, setGameState] = useState<GameStatus>(
    GAME_STATE.IN_PROGRESS
  );
  const cacheWords: Record<string, boolean> = {};

  const { i18n } = useTranslation();
  const [targetWord, setTargetWord] = useState<string>("");
  const [error, setError] = useState<Error | null>(null as Error | null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchWord(wordSize, i18n.language);
      setTargetWord(response);
    } catch (error) {
      setError(error as Error);
    }
  }, [wordSize]);

  const resetGame = () => {
    setGuesses([]);
    setFeedback([]);
    setKeysStatus({});
    setCurrentGuess("");
    setGameState(GAME_STATE.IN_PROGRESS as GameStatus);
    setTargetWord("");
  };

  const handleLetterInput = (letter: string) => {
    if (
      currentGuess.length < wordSize &&
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

  const isValidWord = async () => {
    try {
      // Check if word was validated before
      if (cacheWords[currentGuess] !== undefined) {
        return cacheWords[currentGuess];
      } else {
        const response = await fetchWordIsValid(currentGuess, i18n.language);
        cacheWords[currentGuess] = response;
        return response;
      }
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleEnter = async () => {
    const wordIsValid = await isValidWord();
    if (!wordIsValid) {
      alert("Word is not valid...");
    } else if (
      currentGuess.length === wordSize &&
      gameState === GAME_STATE.IN_PROGRESS
    ) {
      const currentFeedback = validateWord(currentGuess, targetWord);
      setGuesses([...guesses, currentGuess]);
      setFeedback([...feedback, currentFeedback]);
      setKeysStatus(
        updateKeysStatus(currentGuess, currentFeedback, keysStatus)
      );
      if (currentGuess.toLocaleLowerCase() === targetWord) {
        setGameState(GAME_STATE.WIN);
      } else if (guesses.length === TRIES - 1) {
        setGameState(GAME_STATE.LOSS);
      }

      setCurrentGuess("");
    }
  };

  useEffect(() => {
    if (!targetWord) fetchData();
  }, [targetWord, fetchData]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameState !== GAME_STATE.IN_PROGRESS) return;
      if (event.key === EVENT_KEY_ENTER) handleEnter();
      if (event.key === EVENT_KEY_BACKSPACE) handleBackspace();
      if (LETTER_REGEX.test(event.key))
        handleLetterInput(event.key.toUpperCase());
    },
    [gameState, handleEnter, handleBackspace, handleLetterInput]
  );

  useEffect(() => {
    window.addEventListener(EVENT_KEY_DOWN, handleKeyDown);
    return () => {
      window.removeEventListener(EVENT_KEY_DOWN, handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    gameState,
    guesses,
    feedback,
    currentGuess,
    error,
    keysStatus,
    targetWord,
    wordSize,
    setWordSize,
    handleLetterInput,
    handleBackspace,
    handleEnter,
    resetGame,
  };
};
