import { render, fireEvent, screen } from "@testing-library/react";
import Keyboard from "./Keyboard";

test("calls onLetter callback when a letter key is clicked", () => {
  const onLetterMock = jest.fn();
  const onBackspaceMock = jest.fn();
  const onEnterMock = jest.fn();

  const { getByText } = render(
    <Keyboard
      onLetter={onLetterMock}
      onBackspace={onBackspaceMock}
      onEnter={onEnterMock}
    />
  );

  const letterKey = getByText("A");
  fireEvent.click(letterKey);

  expect(onLetterMock).toHaveBeenCalledWith("A");
  expect(onBackspaceMock).not.toHaveBeenCalled();
  expect(onEnterMock).not.toHaveBeenCalled();
});

test("calls onBackspace callback when the backspace key is clicked", () => {
  const onLetterMock = jest.fn();
  const onBackspaceMock = jest.fn();
  const onEnterMock = jest.fn();

  render(
    <Keyboard
      onLetter={onLetterMock}
      onBackspace={onBackspaceMock}
      onEnter={onEnterMock}
    />
  );

  const backspaceKey = screen.getByTestId("backspace-button");
  fireEvent.click(backspaceKey);

  expect(onLetterMock).not.toHaveBeenCalled();
  expect(onBackspaceMock).toHaveBeenCalled();
  expect(onEnterMock).not.toHaveBeenCalled();
});

test("calls onEnter callback when the enter key is clicked", () => {
  const onLetterMock = jest.fn();
  const onBackspaceMock = jest.fn();
  const onEnterMock = jest.fn();

  render(
    <Keyboard
      onLetter={onLetterMock}
      onBackspace={onBackspaceMock}
      onEnter={onEnterMock}
    />
  );

  const enterKey = screen.getByTestId("enter-button");
  fireEvent.click(enterKey);

  expect(onLetterMock).not.toHaveBeenCalled();
  expect(onBackspaceMock).not.toHaveBeenCalled();
  expect(onEnterMock).toHaveBeenCalled();
});
