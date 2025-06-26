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

 function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  const form = document.createElement("div");
  form.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;

  formContainer.appendChild(form);
  const refreshBtn = document.getElementById("newQuote");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", showRandomQuote);
  }
}

// Function to add a new quote from form input
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quoteGen.push({ text, category });

    // Clear the input fields
    textInput.value = '';
    categoryInput.value = '';

}