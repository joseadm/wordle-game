import React from "react";
import "./Modal.css";
import { useTranslation } from "react-i18next";
import monkeyIcon from "../assets/icons/monkey.svg";
import trophyIcon from "../assets/icons/trophy.svg";
import muscleIcon from "../assets/icons/muscle.svg";
import gameIcon from "../assets/icons/game.svg";
import celebrateIcon from "../assets/icons/celebrate.svg";
import { GameStatus } from "../types";
import { GAME_STATE } from "../constants";

interface ModalProps {
  gameState: GameStatus;
  resetGame: () => void;
}

const Modal: React.FC<ModalProps> = ({ gameState, resetGame }) => {
  const { t } = useTranslation();

  const message =
    gameState === GAME_STATE.WIN ? (
      <div data-testid="modal-win">
        <img className="icon" src={trophyIcon} alt="trophy" />
        <h2>{t("modal.win_title")}</h2>
        <p>
          {t("modal.win_body")}
          <img className="icon-s" src={celebrateIcon} alt="celebrate" />
        </p>
      </div>
    ) : (
      <div data-testid="modal-loss">
        <img className="icon" src={monkeyIcon} alt="monkey" />
        <h2>{t("modal.loss_title")}</h2>
        <p>
          {t("modal.loss_body")}
          <img className="icon-s" src={muscleIcon} alt="muscle" />
          <img className="icon-s" src={gameIcon} alt="game" />
        </p>
      </div>
    );

  return (
    <div className={`modal ${gameState}`}>
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={resetGame} className="modal-button">
          {t("modal.try_again_button")}
        </button>
      </div>
    </div>
  );
};

export default Modal;
