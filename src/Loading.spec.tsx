import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading component", () => {
  it("renders", () => {
    const { getByTestId } = render(<Loading />);
    const loadingSpinner = getByTestId("spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });
});
