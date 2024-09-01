import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";

test("renders loading spinner", () => {
  const { getByTestId } = render(<Loading />);
  const loadingSpinner = getByTestId("spinner");
  expect(loadingSpinner).toBeInTheDocument();
});
