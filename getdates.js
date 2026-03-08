const year = document.querySelector("#currentyear");

const today = new Date();

year.textContent = today.getFullYear();

document.querySelector("#lastModified").textContent =
"Last Modified: " + document.lastModified;