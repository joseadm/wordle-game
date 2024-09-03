// components/Keyboard.tsx
import React from "react";
import "./Keyboard.css";
import { useTranslation } from "react-i18next";

interface KeyboardProps {
  keysStatus: Record<string, string>;
  onLetter: (letter: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
}

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const Keyboard: React.FC<KeyboardProps> = ({
  keysStatus,
  onLetter,
  onBackspace,
  onEnter,
}) => {
  const { t } = useTranslation();

  const handleKeyClick = (key: string) => {
    if (key === "Enter") onEnter();
    else if (key === "Backspace") onBackspace();
    else onLetter(key);
  };

  return (
    <section className="keyboard-container">
      <div className="keyboard">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                aria-label={`${key}-key`}
                data-testid={`${key}-key`}
                onClick={() => handleKeyClick(key)}
                className={`keyboard-key ${
                  keysStatus[key.toLocaleUpperCase()] || ""
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        <div className="keyboard-row">
          <button
            aria-label="keyboard-button"
            data-testid="enter-button"
            onClick={() => handleKeyClick("Enter")}
            className="keyboard-key enter-key"
          >
            {t("keyboard.enter_button")}
          </button>
          <button
            aria-label="backaspace-button"
            data-testid="backspace-button"
            onClick={() => handleKeyClick("Backspace")}
            className="keyboard-key backspace-key"
          >
            {t("keyboard.backspace_button")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Keyboard;
