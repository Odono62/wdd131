// TEMPLE DATA (original + 3 additional)
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Additional temples (at least 3)
  {
    templeName: 'Barranquilla Colombia',
    location: 'Barranquilla, Colombia',
    dedicated: '2016, February, 20',
    area: 25349,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/barranquilla-colombia/400x250/3-Barranquilla-Columblia-Temple-2135198.jpg',
  },
  {
    templeName: 'Panama City Panama',
    location: 'Panama City, Panama',
    dedicated: '2008, August, 10',
    area: 18943,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/panama-city-panama/400x250/panama-city-temple-lds-569186-wallpaper.jpg',
  },
  {
    templeName: 'Fukuoka Japan',
    location: 'Fukuoka, Japan',
    dedicated: '2000, June, 11',
    area: 10700,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/fukuoka-japan/400x250/fukuoka-japan-temple-lds-306863-wallpaper.jpg',
  },
];

// Helper: extract year from dedicated string (format "YYYY, Month, Day")
function getDedicationYear(dedicatedStr) {
  return parseInt(dedicatedStr.split(",")[0], 10);
}

// Render temple cards based on filter function
function renderTemples(filterFn, headingText) {
  const gallery = document.getElementById("temple-gallery");
  const heading = document.getElementById("filter-heading");
  heading.textContent = headingText;

  const filtered = temples.filter(filterFn);
  gallery.innerHTML = ""; // clear

  filtered.forEach(temple => {
    const card = document.createElement("div");
    card.className = "temple-card";

    // Image with lazy loading
    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    const name = document.createElement("h3");
    name.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

    const area = document.createElement("p");
    area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);

    gallery.appendChild(card);
  });
}

// Filter definitions
function allTemples() { return true; }
function oldTemples() { return t => getDedicationYear(t.dedicated) < 1900; }
function newTemples() { return t => getDedicationYear(t.dedicated) > 2000; }
function largeTemples() { return t => t.area > 90000; }
function smallTemples() { return t => t.area < 10000; }

// Event listeners for navigation
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      hamburger.textContent = navMenu.classList.contains("show") ? "✕" : "☰";
    });
  }

  // Navigation filter buttons
  document.getElementById("nav-home").addEventListener("click", (e) => {
    e.preventDefault();
    renderTemples(allTemples, "Home");
  });
  document.getElementById("nav-old").addEventListener("click", (e) => {
    e.preventDefault();
    renderTemples(oldTemples(), "Old Temples (built before 1900)");
  });
  document.getElementById("nav-new").addEventListener("click", (e) => {
    e.preventDefault();
    renderTemples(newTemples(), "New Temples (built after 2000)");
  });
  document.getElementById("nav-large").addEventListener("click", (e) => {
    e.preventDefault();
    renderTemples(largeTemples(), "Large Temples (> 90,000 sq ft)");
  });
  document.getElementById("nav-small").addEventListener("click", (e) => {
    e.preventDefault();
    renderTemples(smallTemples(), "Small Temples (< 10,000 sq ft)");
  });

  // Initial render: Home (all temples)
  renderTemples(allTemples, "Home");

  // Footer dynamic content
  const yearSpan = document.getElementById("currentyear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  const modSpan = document.getElementById("lastModified");
  if (modSpan) modSpan.textContent = document.lastModified;
});