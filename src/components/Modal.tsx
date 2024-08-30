import React from "react";
import "./Modal.css";

interface ModalProps {
  gameState: "win" | "loss";
}

const Modal: React.FC<ModalProps> = ({ gameState }) => {
  const message =
    gameState === "win" ? (
      <>
        <div className="icon">🏆</div>
        <h2>You're a Winner, Champ!</h2>
        <p>
          Congrats! You've just crushed it and won the game. Now, bask in your
          glory and celebrate like a boss!
        </p>
      </>
    ) : (
      <>
        <div className="icon">🙈</div>
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
