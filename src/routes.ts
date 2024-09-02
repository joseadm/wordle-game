export const randomWordRoute = (length: number, lang: string) =>
  `https://random-word-api.herokuapp.com/word?length=${length}&lang=${lang}`;

export const validateWordRoute = (word: string, lang: string) =>
  `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`;
