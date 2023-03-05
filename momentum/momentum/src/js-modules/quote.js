const quote = {
  getQuote: async function () {
    const quoteDisplay = document.querySelector(".quote");
    const authorDisplay = document.querySelector(".author");

    const url = "https://api.chucknorris.io/jokes/random";
    const res = await fetch(url);
    const data = await res.json();

    quoteDisplay.textContent = `"${data.value}"`;
    authorDisplay.textContent = "Chuck Norris";
  },
};
export const { getQuote } = quote;
