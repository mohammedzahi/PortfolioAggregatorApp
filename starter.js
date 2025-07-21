function startApp() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) {
    alert("Please enter your name to begin.");
    return;
  }

  document.getElementById("loader").classList.remove("hidden");
  document.querySelector(".animated-title").textContent = `Welcome, ${name}! `;

  setTimeout(() => {
    window.location.href = "portfolio.html";
  }, 3000);
}
