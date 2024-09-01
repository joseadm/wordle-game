import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { act } from "react";

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

describe("App component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ["apple"],
      } as Response)
    );

    render(<App />);

    act(() => screen.getByTestId("app"));
  });

  it("renders without crashing", () => {
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });

  it("renders Grid and Keyboard components", () => {
    expect(screen.getAllByTestId("grid-cell")[0]).toBeInTheDocument();
    expect(screen.getByTestId("A-key")).toBeInTheDocument();
  });

  it("should register keyboard events and update the grid", async () => {
    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "l" });
    await fireEvent.keyDown(window, { key: "e" });
    const gridCells = screen.getAllByTestId("grid-cell");
    expect(gridCells[0]).toHaveTextContent("A");
    expect(gridCells[1]).toHaveTextContent("P");
    expect(gridCells[2]).toHaveTextContent("P");
    expect(gridCells[3]).toHaveTextContent("L");
    expect(gridCells[4]).toHaveTextContent("E");
  });

  it("should register blicks in keyboard and update the grid", async () => {
    await fireEvent.click(screen.getByTestId("A-key"));
    await fireEvent.click(screen.getByTestId("P-key"));
    await fireEvent.click(screen.getByTestId("P-key"));
    await fireEvent.click(screen.getByTestId("L-key"));
    await fireEvent.click(screen.getByTestId("E-key"));
    const gridCells = screen.getAllByTestId("grid-cell");
    expect(gridCells[0]).toHaveTextContent("A");
    expect(gridCells[1]).toHaveTextContent("P");
    expect(gridCells[2]).toHaveTextContent("P");
    expect(gridCells[3]).toHaveTextContent("L");
    expect(gridCells[4]).toHaveTextContent("E");
  });

  it("it should be able to enter 5 entries", async () => {
    for (let i = 0; i < 5; i++) {
      await fireEvent.click(screen.getByTestId("A-key"));
      await fireEvent.click(screen.getByTestId("P-key"));
      await fireEvent.click(screen.getByTestId("P-key"));
      await fireEvent.click(screen.getByTestId("L-key"));
      await fireEvent.click(screen.getByTestId("A-key"));
      await fireEvent.click(screen.getByTestId("enter-button"));
    }
    const gridCells = screen.getAllByTestId("grid-cell");
    for (let i = 0; i < 5; i++) {
      expect(gridCells[i * 5]).toHaveTextContent("A");
      expect(gridCells[i * 5 + 1]).toHaveTextContent("P");
      expect(gridCells[i * 5 + 2]).toHaveTextContent("P");
      expect(gridCells[i * 5 + 3]).toHaveTextContent("L");
      expect(gridCells[i * 5 + 4]).toHaveTextContent("A");
    }
  });

  it("should write APPLE and win", async () => {
    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "l" });
    await fireEvent.keyDown(window, { key: "e" });
    await fireEvent.keyDown(window, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByTestId("modal-win")).toBeInTheDocument();
    });
  });

  it("should write APPLA, replace the last character to E and win", async () => {
    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "l" });
    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "Backspace" });
    await fireEvent.keyDown(window, { key: "e" });
    await fireEvent.keyDown(window, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByTestId("modal-win")).toBeInTheDocument();
    });
  });

  it("should write APPLA APPLI APPLO APPLU and APPLY and loss", async () => {
    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "l" });
    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "Enter" });

    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "l" });
    await fireEvent.keyDown(window, { key: "i" });
    await fireEvent.keyDown(window, { key: "Enter" });

    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "l" });
    await fireEvent.keyDown(window, { key: "o" });
    await fireEvent.keyDown(window, { key: "Enter" });

    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "l" });
    await fireEvent.keyDown(window, { key: "u" });
    await fireEvent.keyDown(window, { key: "Enter" });

    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "l" });
    await fireEvent.keyDown(window, { key: "y" });
    await fireEvent.keyDown(window, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByTestId("modal-loss")).toBeInTheDocument();
    });
  });

  it("should write lose, then try again and win", async () => {
    for (let i = 0; i < 5; i++) {
      await fireEvent.keyDown(window, { key: "a" });
      await fireEvent.keyDown(window, { key: "p" });
      await fireEvent.keyDown(window, { key: "p" });
      await fireEvent.keyDown(window, { key: "l" });
      await fireEvent.keyDown(window, { key: "a" });
      await fireEvent.keyDown(window, { key: "Enter" });
    }

    await waitFor(() => {
      expect(screen.getByTestId("modal-loss")).toBeInTheDocument();
    });

    await fireEvent.click(screen.getByTestId("modal-button"));

    await waitFor(() => {
      expect(screen.queryByTestId("modal-loss")).not.toBeInTheDocument();
      for (let i = 0; i < 25; i++) {
        expect(screen.queryAllByTestId("grid-cell")[i]).toHaveTextContent("");
      }
    });

    await fireEvent.keyDown(window, { key: "a" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "p" });
    await fireEvent.keyDown(window, { key: "l" });
    await fireEvent.keyDown(window, { key: "e" });
    await fireEvent.keyDown(window, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByTestId("modal-win")).toBeInTheDocument();
    });
  });
});
