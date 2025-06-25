const quoteGen = [{text: 'you are brave', category:'self love'},
  {text: 'gym is life', category:'self talk'},
  {text: 'you are beautiful', category:'self love'}
];

function showRandomQuote() {
  const selector = Math.floor(Math.random() * quoteGen.length);
  const selectedQuote = quoteGen[selector];
  const createAddQuoteForm = document.getElementById('quoteDisplay');
  createAddQuoteForm.innerHTML = `<p>${quoteGen.text}</p><small>${quoteGen.category}</small>`;
}