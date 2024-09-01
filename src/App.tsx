import React, { Suspense, useState, useEffect, useCallback } from "react";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import { validateWord } from "./components/utils/validateWord";
import { fetchWord } from "./api";
import Loading from "./Loading";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameState, setGameState] = useState<"win" | "loss" | "in-progress">(
    "in-progress"
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
    if (currentGuess.length < 5 && gameState === "in-progress") {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleBackspace = () => {
    if (gameState === "in-progress") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }
  };

  const handleEnter = () => {
    if (currentGuess.length === 5 && gameState === "in-progress") {
      const currentFeedback = validateWord(currentGuess, targetWord);
      setGuesses([...guesses, currentGuess]);
      setFeedback([...feedback, currentFeedback]);

      if (currentGuess.toLocaleLowerCase() === targetWord) {
        setGameState("win");
      } else if (guesses.length === 4) {
        setGameState("loss");
      }

      setCurrentGuess("");
    }
  };

  useEffect(() => {
    if (!targetWord) fetchData();
  }, [targetWord, fetchData]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== "in-progress") return;

      if (event.key === "Enter") {
        handleEnter();
      } else if (event.key === "Backspace") {
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

        {gameState !== "in-progress" && <Modal gameState={gameState} />}
      </div>
    </Suspense>
  );
};

export default App;
