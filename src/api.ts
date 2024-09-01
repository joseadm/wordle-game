import { randomWordRoute } from "./routes";

export const fetchWord = async () => {
  const response = await fetch(randomWordRoute);
  const data = await response.json();
  return data[0];
};
