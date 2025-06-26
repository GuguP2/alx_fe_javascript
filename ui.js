// ui.js

import { getQuotes, addQuote, getQuotesByCategory } from './quotes.js';

function showRandomQuote(quotes = getQuotes()) {
  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const display = document.getElementById("quoteDisplay");
  display.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>${quote.category}</em></p>
  `;
}

function setupFormHandlers() {
  document.getElementById("addQuoteBtn").addEventListener("click", () => {
    const text = document.getElementById("newQuoteText").value.trim();
    const category = document.getElementById("newQuoteCategory").value.trim();
    if (!text || !category) return alert("Both fields are required.");

    addQuote(text, category);
    updateCategoryFilter();
    showRandomQuote();
    document.getElementById("newQuoteText").value = '';
    document.getElementById("newQuoteCategory").value = '';
  });

  document.getElementById("filterSelect").addEventListener("change", () => {
    const selected = document.getElementById("filterSelect").value;
    const quotes = getQuotesByCategory(selected);
    showRandomQuote(quotes);
  });

  document.getElementById("newQuote").addEventListener("click", () => {
    const selected = document.getElementById("filterSelect").value;
    const quotes = getQuotesByCategory(selected);
    showRandomQuote(quotes);
  });
}

function updateCategoryFilter() {
  const categories = [...new Set(getQuotes().map(q => q.category))];
  const select = document.getElementById("filterSelect");
  select.innerHTML = `<option value="all">All</option>`;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

export { showRandomQuote, setupFormHandlers, updateCategoryFilter };
