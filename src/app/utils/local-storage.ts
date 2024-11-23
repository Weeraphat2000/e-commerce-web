export const getTokens = () => localStorage.getItem("tokens");

export const setTokens = (tokens: string) => {
  localStorage.setItem("tokens", tokens);
};

export const removeTokens = () => {
  localStorage.removeItem("tokens");
};
