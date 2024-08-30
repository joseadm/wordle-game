// components/Keyboard.tsx
import React from 'react';
import './Keyboard.css';

interface KeyboardProps {
  onLetter: (letter: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
}

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const Keyboard: React.FC<KeyboardProps> = ({ onLetter, onBackspace, onEnter }) => {
  const handleKeyClick = (key: string) => {
    if (key === 'Enter') onEnter();
    else if (key === 'Backspace') onBackspace();
    else onLetter(key);
  };

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className="keyboard-key"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button onClick={() => handleKeyClick('Enter')} className="keyboard-key enter-key">Enter</button>
        <button onClick={() => handleKeyClick('Backspace')} className="keyboard-key backspace-key">Backspace</button>
      </div>
    </div>
  );
};

export default Keyboard;
