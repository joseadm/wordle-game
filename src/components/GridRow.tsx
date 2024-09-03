import React from "react";
import GridCell from "./GridCell";

interface GridRowProps {
  guess: string;
  feedback: string[];
  wordSize: number;
}

const GridRow: React.FC<GridRowProps> = ({ guess, feedback, wordSize }) => {
  return (
    <div className="grid-row" data-testid="grid-row">
      {Array.from({ length: wordSize }).map((_, colIndex) => (
        <GridCell
          key={colIndex}
          value={guess[colIndex] || ""}
          feedback={feedback[colIndex] || ""}
        />
      ))}
    </div>
  );
};

export default React.memo(GridRow);
