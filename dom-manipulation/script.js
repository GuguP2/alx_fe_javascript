const quoteGen = [{text: 'you are brave', category:'self love'},
  {text: 'gym is life', category:'self talk'},
  {text: 'you are beautiful', category:'self love'}
];

function showRandomQuote() {
  const selector = Math.floor(Math.random() * quoteGen.length);
  const selectedQuote = quoteGen[selector];
  const quoteDisplay = document.getElementById('quoteDisplay');

  quoteDisplay.innerHTML = `
    <p>"${selectedQuote.text}"</p>
    <small>Category: ${selectedQuote.category}</small>
  `;
}

// Create the "Add Quote" form dynamically
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  const form = document.createElement("div");
  form.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
  `;

  formContainer.appendChild(form);

  // Attach event listener to Add button
  const addBtn = document.getElementById("addQuoteBtn");
  addBtn.addEventListener("click", addQuote);
}

// Add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quoteGen.push({ text, category });

    // Clear inputs
    textInput.value = '';
    categoryInput.value = '';

    // Optionally show the new quote
    showRandomQuote();
  } else {
    alert("Please fill in both fields.");
  }
}

// Initialize app
window.onload = function () {
  showRandomQuote();
  createAddQuoteForm();

  const refreshBtn = document.getElementById("newQuote");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", showRandomQuote);
  }
};
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }