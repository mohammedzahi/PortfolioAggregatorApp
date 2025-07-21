const form = document.getElementById("entryForm");
const category = document.getElementById("category");
const title = document.getElementById("title");
const description = document.getElementById("description");
const eventDate = document.getElementById("eventDate");
const certImage = document.getElementById("certImage");

const sections = {
  project: document.getElementById("projectList"),
  achievement: document.getElementById("achievementList"),
  certificate: document.getElementById("certificateList"),
  event: document.getElementById("eventList")
};

// Show inputs based on category selection
category.onchange = () => {
  eventDate.style.display = category.value === "event" ? "block" : "none";
  certImage.style.display = category.value === "certificate" ? "block" : "none";
};

// Load saved data
window.onload = () => {
  for (let type in sections) {
    sections[type].innerHTML = localStorage.getItem(type) || "";
  }
};

// Handle form submission
form.onsubmit = function (e) {
  e.preventDefault();
  const cat = category.value;
  const card = document.createElement("div");
  card.className = "card";

  let content = `<h3>${title.value}</h3><p>${description.value}</p>`;

  if (cat === "event" && eventDate.value) {
    content += `<p><strong>Date Attended:</strong> ${eventDate.value}</p>`;
  }

  if (cat === "certificate" && certImage.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      content += `<img src="${reader.result}" alt="Certificate Image" />`;
      content += `<button onclick="this.parentElement.remove(); saveData('${cat}')">Delete</button>`;
      card.innerHTML = content;
      sections[cat].appendChild(card);
      saveData(cat);
    };
    reader.readAsDataURL(certImage.files[0]);
  } else {
    content += `<button onclick="this.parentElement.remove(); saveData('${cat}')">Delete</button>`;
    card.innerHTML = content;
    sections[cat].appendChild(card);
    saveData(cat);
  }

  form.reset();
  eventDate.style.display = "none";
  certImage.style.display = "none";
};

function saveData(type) {
  localStorage.setItem(type, sections[type].innerHTML);
      }
