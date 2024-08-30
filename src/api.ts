export const fetchWord = async () => {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(error);
  }
};
