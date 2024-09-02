import React, { Suspense, useEffect } from "react";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import Loading from "./Loading";
import { useTranslation } from "react-i18next";
import { GAME_STATE, WORD_SIZE } from "./constants";
import { useGameLogic } from "./hooks/useGameLogic";
import "./App.css";

const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get("lang");
    const paramSizeWord = urlParams.get("size");

    i18n.changeLanguage(paramLang ? paramLang : i18n.language);

    document.documentElement.style.setProperty(
      "--word-size",
      paramSizeWord ? paramSizeWord : WORD_SIZE.toString()
    );

    setWordSize(paramSizeWord ? parseInt(paramSizeWord) : WORD_SIZE);
  }, []);

  const {
    gameState,
    guesses,
    feedback,
    error,
    currentGuess,
    keysStatus,
    targetWord,
    wordSize,
    setWordSize,
    handleLetterInput,
    handleBackspace,
    handleEnter,
    resetGame,
  } = useGameLogic();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <Suspense fallback={<Loading />}>
      {targetWord ? (
        <main className="app" data-testid="app">
          <div className="container">
            <Grid
              guesses={guesses}
              feedback={feedback}
              currentGuess={currentGuess}
              wordSize={wordSize}
            />
            <Keyboard
              keysStatus={keysStatus}
              onLetter={handleLetterInput}
              onBackspace={handleBackspace}
              onEnter={handleEnter}
            />

            {gameState !== GAME_STATE.IN_PROGRESS && (
              <Modal gameState={gameState} resetGame={resetGame} />
            )}
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </Suspense>
  );
};

export default App;
