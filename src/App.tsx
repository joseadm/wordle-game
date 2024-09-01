import React, { Suspense, useEffect } from "react";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import Loading from "./Loading";
import { useTranslation } from "react-i18next";
import { GAME_STATE } from "./constants";
import { useGameLogic } from "./hooks/useGameLogic";
import "./App.css";

const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const paramLang = window.location.pathname.split("/")[1];
    i18n.changeLanguage(paramLang ? paramLang : i18n.language);
  }, []);

  const {
    gameState,
    guesses,
    feedback,
    error,
    currentGuess,
    keysStatus,
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
      <main className="app" data-testid="app">
        <div className="container">
          <Grid
            guesses={guesses}
            feedback={feedback}
            currentGuess={currentGuess}
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
    </Suspense>
  );
};

export default App;
