// components/Grid.tsx
import React from "react";
import "./Grid.css";
import { WORD_SIZE } from "../constants";

interface GridProps {
  guesses: string[];
  feedback: string[][];
  currentGuess: string;
}

const Grid: React.FC<GridProps> = ({ guesses, feedback, currentGuess }) => {
  const renderRow = (rowIndex: number) => {
    const guess =
      rowIndex === guesses.length ? currentGuess : guesses[rowIndex] || "";
    const rowFeedback = feedback[rowIndex] || [];

    return (
      <div className="grid-row" data-testid="grid-row" key={rowIndex}>
        {Array.from({ length: WORD_SIZE }).map((_, colIndex) => (
          <div
            key={colIndex}
            data-testid="grid-cell"
            className={`grid-cell ${rowFeedback[colIndex] || ""}`}
          >
            {guess[colIndex] || ""}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid-container">
      <div className="grid">
        {Array.from({ length: WORD_SIZE }).map((_, rowIndex) =>
          renderRow(rowIndex)
        )}
      </div>
    </div>
  );
};

export default Grid;
