import React, { Suspense, useState, useEffect, useCallback } from "react";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import { validateWord } from "./components/utils/validateWord";
import { fetchWord } from "./api";
import Loading from "./Loading";
import { useTranslation } from "react-i18next";
import { GameStatus } from "./types";
import {
  EVENT_KEY_BACKSPACE,
  EVENT_KEY_ENTER,
  GAME_STATE,
  WORD_SIZE,
} from "./constants";

const App: React.FC = () => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameState, setGameState] = useState<GameStatus>(
    GAME_STATE.IN_PROGRESS as GameStatus
  );
  const [targetWord, setTargetWord] = useState<string>("");
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const fetchData = useCallback(async () => {
    const word = await fetchWord();
    setTargetWord(word);
  }, []);

  const handleLetterInput = (letter: string) => {
    if (currentGuess.length < 5 && gameState === GAME_STATE.IN_PROGRESS) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleBackspace = () => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }
  };

  const handleEnter = () => {
    if (
      currentGuess.length === WORD_SIZE &&
      gameState === GAME_STATE.IN_PROGRESS
    ) {
      const currentFeedback = validateWord(currentGuess, targetWord);
      setGuesses([...guesses, currentGuess]);
      setFeedback([...feedback, currentFeedback]);

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

  useEffect(() => {
    const paramLang = window.location.pathname.split("/")[1];
    handleLanguageChange(paramLang ? paramLang : i18n.language);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className="app">
        <Grid
          guesses={guesses}
          feedback={feedback}
          currentGuess={currentGuess}
        />
        <Keyboard
          onLetter={handleLetterInput}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
        />

        {gameState !== GAME_STATE.IN_PROGRESS && (
          <Modal gameState={gameState} />
        )}
      </div>
    </Suspense>
  );
};

export default App;
