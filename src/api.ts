import { randomWordRoute } from "./routes";

export const fetchWord = async () => {
  try {
    const response = await fetch(randomWordRoute);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(error);
  }
};
