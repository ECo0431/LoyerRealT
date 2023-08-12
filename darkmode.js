const darkModeButton = document.getElementById("darkModeButton");
const body = document.body;
const canvases = document.querySelectorAll("canvas"); // Sélectionnez tous les éléments canvas
const titleCharts = document.querySelectorAll(".title-chart"); // Sélectionnez tous les éléments avec la classe .title-chart

// Vérifiez l'état du mode sombre dans le localStorage lors du chargement de la page
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");

  // Ajoutez la classe 'dark-canvas' pour tous les éléments canvas en mode sombre
  canvases.forEach((canvas) => {
    canvas.classList.add("dark-canvas");
  });

  // Ajoutez la classe 'dark-mode' aux éléments .title-chart en mode sombre
  titleCharts.forEach((titleChart) => {
    titleChart.classList.add("dark-mode");
  });
}

darkModeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Enregistrez l'état du mode sombre dans le localStorage
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }

  // Ajoutez ou supprimez la classe 'dark-canvas' pour tous les éléments canvas
  canvases.forEach((canvas) => {
    canvas.classList.toggle("dark-canvas");
  });

  // Ajoutez ou supprimez la classe 'dark-mode' aux éléments .title-chart
  titleCharts.forEach((titleChart) => {
    titleChart.classList.toggle("dark-mode");
  });
});
