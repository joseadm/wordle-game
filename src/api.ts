import { randomWordRoute, validateWordRoute } from "./routes";

export const fetchWord = async (length: number, lang: string) => {
  const response = await fetch(randomWordRoute(length, lang));
  const data = await response.json();
  return data[0];
};

export const fetchWordIsValid = async (word: string, lang: string) => {
  const response = await fetch(validateWordRoute(word, lang));
  const data = await response.json();
  return Array.isArray(data);
};
