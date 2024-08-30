// components/Grid.tsx
import React from 'react';
import './Grid.css';

interface GridProps {
  guesses: string[];
  feedback: string[][];
  currentGuess: string;
}

const Grid: React.FC<GridProps> = ({ guesses, feedback, currentGuess }) => {
  const renderRow = (rowIndex: number) => {
    const guess = rowIndex === guesses.length ? currentGuess : guesses[rowIndex] || '';
    const rowFeedback = feedback[rowIndex] || [];

    return (
      <div className="grid-row" key={rowIndex}>
        {Array.from({ length: 5 }).map((_, colIndex) => (
          <div
            key={colIndex}
            className={`grid-cell ${rowFeedback[colIndex] || ''}`}
          >
            {guess[colIndex] || ''}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid">
      {Array.from({ length: 5 }).map((_, rowIndex) => renderRow(rowIndex))}
    </div>
  );
};

export default Grid;
