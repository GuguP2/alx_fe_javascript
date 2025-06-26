// quotes.js

let quoteGen = [];

function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quoteGen = JSON.parse(stored);
  } else {
    quoteGen = [
      { text: 'you are brave', category: 'self love' },
      { text: 'gym is life', category: 'self talk' },
      { text: 'you are beautiful', category: 'self love' }
    ];
    saveQuotes();
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quoteGen));
}

function getQuotes() {
  return quoteGen;
}

function addQuote(text, category) {
  quoteGen.push({ text, category });
  saveQuotes();
}

function getQuotesByCategory(category) {
  return category === "all"
    ? quoteGen
    : quoteGen.filter(q => q.category === category);
}

export { loadQuotes, saveQuotes, getQuotes, addQuote, getQuotesByCategory };
