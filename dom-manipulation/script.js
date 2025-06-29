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
function exportToJsonFile(data, filename = "quotes.json") {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
document.getElementById("exportBtn").addEventListener("click", () => {
  exportToJsonFile(quoteGen); // Use your actual quotes array
});
document.getElementById("importInput").addEventListener("change", handleImport);

function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      // Validate structure
      if (!Array.isArray(importedQuotes)) {
        throw new Error("Invalid format: must be an array.");
      }

      // Optionally: validate each quote object
      importedQuotes.forEach(q => {
        if (!q.text || !q.category) {
          throw new Error("Each quote must have 'text' and 'category'.");
        }
      });

      // Merge and save
      quoteGen.push(...importedQuotes);
      localStorage.setItem("quotes", JSON.stringify(quoteGen));
      alert("Quotes imported successfully!");
      showRandomQuote(); // Refresh view

    } catch (err) {
      alert("Error importing quotes: " + err.message);
    }
  };

  reader.readAsText(file);
}
let quoteGen = [];

// Load quotes and filter from localStorage
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  quoteGen = stored ? JSON.parse(stored) : [
    { text: 'you are brave', category: 'self love' },
    { text: 'gym is life', category: 'self talk' },
    { text: 'you are beautiful', category: 'self love' }
  ];
  saveQuotes();
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quoteGen));
}

// Display a random quote based on filter
function showRandomQuote(filteredQuotes = quoteGen) {
  if (!filteredQuotes.length) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes found.</p>";
    return;
  }
  const quote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  document.getElementById("quoteDisplay").innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>${quote.category}</em></p>
  `;
}

// Populate dropdown from unique categories
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const uniqueCategories = [...new Set(quoteGen.map(q => q.category))];

  select.innerHTML = `<option value="all">All Categories</option>`;
  uniqueCategories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });

  // Restore last selected category from storage
  const lastFilter = localStorage.getItem("selectedCategory");
  if (lastFilter && uniqueCategories.includes(lastFilter)) {
    select.value = lastFilter;
    filterQuotes(); // show quotes immediately
  }
}

// Filter quotes by selected category
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected); // remember selection

  if (selected === "all") {
    showRandomQuote();
  } else {
    const filtered = quoteGen.filter(q => q.category === selected);
    showRandomQuote(filtered);
  }
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both text and category.");
    return;
  }

  quoteGen.push({ text, category });
  saveQuotes();

  document.getElementById("newQuoteText").value = '';
  document.getElementById("newQuoteCategory").value = '';

  populateCategories();  // update filter list
  filterQuotes();        // re-display based on active filter
}

// Setup event listeners
window.onload = () => {
  loadQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById("newQuote").addEventListener("click", filterQuotes);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  document.getElementById("categoryFilter").addEventListener("change", filterQuotes);
};
