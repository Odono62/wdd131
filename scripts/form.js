// product array from assignment spec (id + name)
const products = [
  { id: "fc-1888", name: "flux capacitor" },
  { id: "fc-2050", name: "power laces" },
  { id: "fs-1987", name: "time circuits" },
  { id: "ac-2000", name: "low voltage reactor" },
  { id: "jj-1969", name: "warp equalizer" }
];

// populate product select dropdown
function populateProductSelect() {
  const selectElem = document.getElementById("productName");
  if (!selectElem) return;

  // remove existing options except the disabled placeholder
  while (selectElem.options.length > 1) {
    selectElem.remove(1);
  }

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;       // id as value
    option.textContent = product.name; // name as display
    selectElem.appendChild(option);
  });
}

// set last modified date in footer
function setLastModified() {
  const modSpan = document.getElementById("lastModified");
  if (modSpan) {
    const now = new Date();
    const formatted = `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    modSpan.textContent = formatted;
  }
}

// display current review count on form page (optional, but shows storage)
function updateReviewCounterDisplay() {
  const counterSpan = document.getElementById("totalReviewsCount");
  if (counterSpan) {
    let count = localStorage.getItem("productReviewCount");
    count = count ? parseInt(count) : 0;
    counterSpan.textContent = count;
  }
}

// optional: set max date to today for installation date
function setDateConstraints() {
  const dateInput = document.getElementById("installDate");
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;
  }
}

// run on page load
document.addEventListener("DOMContentLoaded", () => {
  populateProductSelect();
  setLastModified();
  updateReviewCounterDisplay();
  setDateConstraints();

  // ensure form has GET method and target review.html (already in HTML)
  // additional client-side validation is graceful but HTML5 handles required
});