// MENU TOGGLE
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

// FOOTER YEAR
document.querySelectorAll("#year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// BUDGET CALCULATOR
const calculateBtn = document.querySelector("#calculate");

if (calculateBtn) {
  calculateBtn.addEventListener("click", calculateBudget);
}

function calculateBudget() {
  const income = Number(document.querySelector("#income").value);
  const expenses = Number(document.querySelector("#expenses").value);

  const balance = income - expenses;
  const result = document.querySelector("#result");

  let message;

  if (balance > 0) {
    message = "You are saving money!";
  } else if (balance === 0) {
    message = "You broke even.";
  } else {
    message = "You are overspending!";
  }

  result.innerHTML = `Balance: ₦${balance} <br> ${message}`;

  saveData(balance);
}

// LOCAL STORAGE
function saveData(balance) {
  localStorage.setItem("balance", balance);
}

// ARRAY + OBJECT
const tips = ["Save", "Invest", "Spend wisely"];

const user = {
  name: "Student",
  goal: "Financial Freedom"
};

console.log(`Hello ${user.name}, remember to ${tips[0]}`);

// FORM HANDLING
const form = document.querySelector("#contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    const output = document.querySelector("#formOutput");

    // OBJECT
    const userData = {
      name: name,
      email: email,
      message: message
    };

    // ARRAY
    const messages = [];
    messages.push(userData);

    // LOCAL STORAGE
    localStorage.setItem("formData", JSON.stringify(messages));

    // TEMPLATE LITERAL
    output.innerHTML = `Thank you ${name}, your message has been received!`;

    form.reset();
  });
}