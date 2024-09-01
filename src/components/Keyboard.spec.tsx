import { render, fireEvent, screen } from "@testing-library/react";
import Keyboard from "./Keyboard";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("Keyboard component", () => {
  it("calls onLetter callback when a letter key is clicked", () => {
    const onLetterMock = jest.fn();
    const onBackspaceMock = jest.fn();
    const onEnterMock = jest.fn();

    const { getByText } = render(
      <Keyboard
        keysStatus={{}}
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

  it("calls onBackspace callback when the backspace key is clicked", () => {
    const onLetterMock = jest.fn();
    const onBackspaceMock = jest.fn();
    const onEnterMock = jest.fn();

    render(
      <Keyboard
        keysStatus={{}}
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

  it("calls onEnter callback when the enter key is clicked", () => {
    const onLetterMock = jest.fn();
    const onBackspaceMock = jest.fn();
    const onEnterMock = jest.fn();

    render(
      <Keyboard
        keysStatus={{}}
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
});
