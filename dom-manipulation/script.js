let quoteGen = [];

// Load quotes from localStorage or set defaults
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
    localStorage.setItem("quotes", JSON.stringify(quoteGen));
  }
}

// Save to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quoteGen));
}

// Display a random quote
function showRandomQuote(filteredQuotes = quoteGen) {
  const selector = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[selector];
  const quoteDisplay = document.getElementById("quoteDisplay");

  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>${quote.category}</em></p>
  `;
}

// Create form and filter dropdown
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
    <br><br>
    <label for="filterSelect">Filter by Category:</label>
    <select id="filterSelect">
      <option value="all">All</option>
    </select>
  `;

  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  document.getElementById("filterSelect").addEventListener("change", filterQuotes);

  updateFilterOptions();
}

// Add new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  quoteGen.push({ text, category });
  saveQuotes();
  showRandomQuote();
  updateFilterOptions();

  // Clear inputs
  document.getElementById("newQuoteText").value = '';
  document.getElementById("newQuoteCategory").value = '';
}

// Update filter dropdown options
function updateFilterOptions() {
  const filterSelect = document.getElementById("filterSelect");
  const categories = [...new Set(quoteGen.map(q => q.category))];

  filterSelect.innerHTML = `<option value="all">All</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filterSelect.appendChild(option);
  });
}

// Filter quotes by selected category
function filterQuotes() {
  const selected = document.getElementById("filterSelect").value;
  if (selected === "all") {
    showRandomQuote();
  } else {
    const filtered = quoteGen.filter(q => q.category === selected);
    showRandomQuote(filtered);
  }
}

// Init
window.onload = function () {
  loadQuotes();
  showRandomQuote();
  createAddQuoteForm();

  document.getElementById("newQuote").addEventListener("click", () => {
    const selected = document.getElementById("filterSelect").value;
    filterQuotes(); // show next filtered random quote
  });
};
// script.js

import { loadQuotes } from './quotes.js';
import { showRandomQuote, setupFormHandlers, updateCategoryFilter } from './ui.js';

window.onload = () => {
  loadQuotes();
  showRandomQuote();
  setupFormHandlers();
  updateCategoryFilter();
};
