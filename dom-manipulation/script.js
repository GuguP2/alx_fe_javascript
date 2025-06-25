const quoteGen = [{text: 'you are brave', category:'self love'},
  {text: 'gym is life', category:'self talk'},
  {text: 'you are beautiful', category:'self love'}
];

function ShowRandomQuote(){
  const selector = Math.floor(Math.random() * quoteGen.length);
  const selectedQuote = quoteGen[selector];
  const displayQuote = document.getElementById('quoteDisplay');
  displayQuote.innerHTML = `<p>${quoteGen.text}</p><small>${quoteGen.category}</small>`;
}