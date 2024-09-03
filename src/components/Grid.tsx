import React from "react";
import "./Grid.css";
import { TRIES, WORD_SIZE } from "../constants";
import GridRow from "./GridRow";

interface GridProps {
  guesses: string[];
  feedback: string[][];
  currentGuess: string;
  wordSize: number;
}

const Grid: React.FC<GridProps> = ({
  guesses,
  feedback,
  currentGuess,
  wordSize,
}) => {
  const renderRow = (rowIndex: number) => {
    const guess =
      rowIndex === guesses.length ? currentGuess : guesses[rowIndex] || "";
    const rowFeedback = feedback[rowIndex] || [];

    return (
      <GridRow
        key={rowIndex}
        guess={guess}
        feedback={rowFeedback}
        wordSize={wordSize}
      />
    );
  };

  return (
    <section className="grid-container">
      <div className="grid">
        {Array.from({ length: TRIES }).map((_, rowIndex) =>
          renderRow(rowIndex)
        )}
      </div>
    </section>
  );
};

export default Grid;
