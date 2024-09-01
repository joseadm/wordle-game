import { randomWordRoute } from "./routes";

export const fetchWord = async (length: number, lang: string) => {
  const response = await fetch(randomWordRoute(length, lang));
  const data = await response.json();
  return data[0];
};
