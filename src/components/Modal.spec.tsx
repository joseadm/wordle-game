import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal component", () => {
  test("renders win message correctly", () => {
    render(<Modal gameState="win" />);

    const modalWinContent = screen.getByTestId("modal-win");

    const titleElement = modalWinContent.querySelector("h2");

    const bodyElement = modalWinContent.querySelector("p");

    // Check the content div is rendered
    expect(modalWinContent).toBeInTheDocument();

    // Check the title win to be win_title
    expect(titleElement?.textContent).toBe("modal.win_title");

    // Check the body win to be win_body
    expect(bodyElement?.textContent).toBe("modal.win_body");
  });

  test("renders loss message correctly", () => {
    render(<Modal gameState="loss" />);

    const modalLossContent = screen.getByTestId("modal-loss");

    const titleElement = modalLossContent.querySelector("h2");

    const bodyElement = modalLossContent.querySelector("p");

    // Check the content div is rendered
    expect(modalLossContent).toBeInTheDocument();

    // Check the title win to be loss_title
    expect(titleElement?.textContent).toBe("modal.loss_title");

    // Check the body win to be loss_body
    expect(bodyElement?.textContent).toBe("modal.loss_body");
  });
});
