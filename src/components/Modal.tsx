import React from "react";
import "./Modal.css";
import { useTranslation } from "react-i18next";
import monkeyIcon from "../assets/icons/monkey.svg";
import trophyIcon from "../assets/icons/trophy.svg";

interface ModalProps {
  gameState: "win" | "loss";
}

const Modal: React.FC<ModalProps> = ({ gameState }) => {
  const { t } = useTranslation();

  const message =
    gameState === "win" ? (
      <>
        <img className="icon" src={trophyIcon} />
        <h2>{t("modal.winner_title")}</h2>
        <p>
          Congrats! You've just crushed it and won the game. Now, bask in your
          glory and celebrate like a boss!{" "}
          <img className="icon-s" src={trophyIcon} />
        </p>
      </>
    ) : (
      <>
        <img className="icon" src={trophyIcon} />
        <h2>Oops! Tough Luck, But Don't Give Up!</h2>
        <p>
          You didn't quite make it this time, but hey, no worries! Give it
          another shot, and who knows, the next round might be your moment of
          glory! Keep going, champ! 💪🎮
        </p>
      </>
    );

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{message}</h2>
        <button
          onClick={() => window.location.reload()}
          className="modal-button"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
