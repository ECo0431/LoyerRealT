document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour récupérer les données du local storage
  const getFilteredDataFromLocalStorage = () => {
    const filteredDataJSON = localStorage.getItem("filteredData");
    return JSON.parse(filteredDataJSON);
  };

  // Récupérer les données filtrées du local storage
  const filteredData = getFilteredDataFromLocalStorage();

  // Générer des dates à partir des données récupérées du local storage
  const generateDatesFromData = (data) => {
    const dates = data.map((row) => row[3].substring(0, 10));
    return dates;
  };

  // Générer des valeurs à partir des données récupérées du local storage
  const generateValuesFromData = (data) => {
    const values = data.map((row) => parseFloat(row[7].replace("$", "")));
    return values;
  };

  const chartData = {
    labels: generateDatesFromData(filteredData),
    data: generateValuesFromData(filteredData),
  };

  // Configurer les options du graphique
  const chartOptions = {
    type: "bar",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "Loyer par semaines perçu",
          data: chartData.data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  // Créer le premier graphique
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChartWeekly = new Chart(ctx, chartOptions);

  // Récupérer les données du local storage pour le deuxième graphique
  const sumByMonthData = localStorage.getItem("sumByMonth");
  if (sumByMonthData) {
    const sumByMonth = JSON.parse(sumByMonthData);
    const months = Object.keys(sumByMonth);
    const values = Object.values(sumByMonth);

    // Configurer les options du deuxième graphique
    const sumChartOptions = {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Loyer mensuel perçu",
            data: values,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Créer le deuxième graphique
    const sumCtx = document.getElementById("myChartSum").getContext("2d");
    const myChartSum = new Chart(sumCtx, sumChartOptions);
  }

  // Récupérer les données du local storage pour le troisième graphique (par trimestre)
  const sumByQuarterData = localStorage.getItem("sumByQuarter");
  if (sumByQuarterData) {
    const sumByQuarter = JSON.parse(sumByQuarterData);
    const quarters = Object.keys(sumByQuarter);
    const quarterValues = Object.values(sumByQuarter);

    // Configurer les options du troisième graphique (par trimestre)
    const sumByQuarterChartOptions = {
      type: "bar",
      data: {
        labels: quarters,
        datasets: [
          {
            label: "Loyer trimestriel perçu",
            data: quarterValues,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Créer le troisième graphique (par trimestre)
    const sumByQuarterCtx = document
      .getElementById("myChartSumByQuarter")
      .getContext("2d");
    const myChartSumByQuarter = new Chart(
      sumByQuarterCtx,
      sumByQuarterChartOptions
    );
  }

  // Récupérer les données du local storage pour le quatrième graphique (par année)
  const sumByYearData = localStorage.getItem("sumByYear");
  if (sumByYearData) {
    const sumByYear = JSON.parse(sumByYearData);
    const years = Object.keys(sumByYear);
    const yearValues = Object.values(sumByYear);

    // Configurer les options du quatrième graphique (par année)
    const sumByYearChartOptions = {
      type: "bar",
      data: {
        labels: years,
        datasets: [
          {
            label: "Loyer annuel perçu",
            data: yearValues,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Créer le quatrième graphique (par année)
    const sumByYearCtx = document
      .getElementById("myChartSumByYear")
      .getContext("2d");
    const myChartSumByYear = new Chart(sumByYearCtx, sumByYearChartOptions);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ... le reste de votre code ...

  // Sélectionnez tous les boutons plein écran
  const fullscreenButtons = document.querySelectorAll(".fullscreen-button");

  // Ajoutez un gestionnaire d'événement au clic pour chaque bouton
  fullscreenButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const canvas = this.previousElementSibling; // Obtenez le canvas correspondant
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen(); // Demander le mode plein écran
      } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      }
    });
  });
});

// Obtenez tous les éléments canvas des graphiques
const chartCanvases = document.querySelectorAll(".chart-canvas");

// Ajoutez un gestionnaire d'événements à chaque canvas
chartCanvases.forEach((canvas) => {
  canvas.addEventListener("click", () => {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen();
    }
  });
});
