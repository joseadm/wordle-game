export const randomWordRoute = (length: number, lang: string) =>
  `https://random-word-api.herokuapp.com/word?length=${length}&lang=${lang}`;
