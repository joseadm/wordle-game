import React from "react";
import { render } from "@testing-library/react";
import Grid from "./Grid";

test("renders the correct guess in each cell", () => {
  const guesses = ["ABC", "DEF", "GHI"];
  const feedback = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const currentGuess = "JKL";

  const { getAllByTestId } = render(
    <Grid guesses={guesses} feedback={feedback} currentGuess={currentGuess} wordSize={5} />
  );

  const cells = getAllByTestId("grid-cell");
  cells.forEach((cell, index) => {
    const rowIndex = Math.floor(index / 5);
    const colIndex = index % 5;
    const guess =
      rowIndex === guesses.length ? currentGuess : guesses[rowIndex] || "";
    expect(cell.textContent).toBe(guess[colIndex] || "");
  });
});
