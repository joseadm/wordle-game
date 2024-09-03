import React from "react";
import wordleIcon from "./assets/wordle-icon.jpg";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header>
      <img className="icon" src={wordleIcon} />
      <label>
        <h1>Guess the word you have 5 tries </h1>
        <div className="tooltip">
          Instructions
          <span className="tooltiptext">
            Colors:
            <ul>
              <li>
                No Background Color: If the letter isn't in the word at all.
              </li>
              <li>
                Green Background: If the letter is in the correct position
                within the word.
              </li>
              <li>
                Orange Background: If the letter is present in the word but not
                in the correct
              </li>
            </ul>
          </span>
        </div>
      </label>
    </header>
  );
};

export default Header;
