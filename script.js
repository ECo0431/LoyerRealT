document.addEventListener("DOMContentLoaded", function () {
  const csvFileInput = document.getElementById("csvFileInput");
  const filteredDataDiv = document.getElementById("filteredData"); // Nouvelle section pour afficher les données filtrées

  let headers = [];
  let table = []; // Tableau pour stocker les données

  csvFileInput.addEventListener("change", handleFileSelect);

  function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const csvData = e.target.result;
        const lines = csvData.split("\n");

        for (let i = 0; i < lines.length; i++) {
          const cells = lines[i].split(",");
          const rowData = []; // Tableau pour stocker les données de chaque ligne

          for (let j = 0; j < cells.length; j++) {
            const cellValue = cells[j].replace(/^"|"$/g, "").trim();
            rowData.push(cellValue); // Stocker la valeur dans rowData
          }

          table.push(rowData); // Stocker les données de la ligne dans le tableau
        }

        // Filtrer les données
        const filteredData = table.filter(
          (row) => row[4] === "0xf215af7efd2d90f7492a13c3147defd7f1b41a8e"
        );

        // Calculer la somme des valeurs par mois, trimestre et année
        const sumByMonth = {};
        const sumByQuarter = {};
        const sumByYear = {};

        filteredData.forEach((row) => {
          const dateParts = row[3].substring(0, 7).split("-");
          const yearMonth = `${dateParts[0]}-${dateParts[1]}`;
          const yearQuarter = Math.ceil(dateParts[1] / 3);
          const year = dateParts[0];
          const value = parseFloat(row[7].replace("$", ""));

          if (!sumByMonth[yearMonth]) {
            sumByMonth[yearMonth] = 0;
          }

          if (!sumByQuarter[yearQuarter]) {
            sumByQuarter[yearQuarter] = 0;
          }

          if (!sumByYear[year]) {
            sumByYear[year] = 0;
          }

          sumByMonth[yearMonth] += value;
          sumByQuarter[yearQuarter] += value;
          sumByYear[year] += value;
        });

        // Stocker les sommes par mois, trimestre et année dans le local storage
        localStorage.setItem("sumByMonth", JSON.stringify(sumByMonth));
        localStorage.setItem("sumByQuarter", JSON.stringify(sumByQuarter));
        localStorage.setItem("sumByYear", JSON.stringify(sumByYear));

        // Stocker les données filtrées dans le local storage
        localStorage.setItem("filteredData", JSON.stringify(filteredData));

        // Afficher les données filtrées dans le HTML et la console
        const tableHtml =
          "<table><thead><tr><th>Dates</th><th>Loyers</th></tr></thead><tbody>" +
          filteredData
            .map(
              (row) =>
                "<tr>" +
                "<td>" +
                row[3].substring(0, 10) + // Afficher les 10 premiers caractères de Dates (Colonne 4)
                "</td>" +
                "<td>" +
                row[7].replace("$", "") + // Retirer le symbole $ de Loyers (Colonne 8)
                "</td>" +
                "</tr>"
            )
            .join("") +
          "</tbody></table>";
        filteredDataDiv.innerHTML = tableHtml;

        // Afficher les données filtrées dans le console
        console.log(filteredData);

        // Rafraîchir la page
        location.reload();
      };

      reader.readAsText(file);
    }
  }

  // Vérifier si des données sont présentes dans le local storage
  const sumByMonthData = JSON.parse(localStorage.getItem("sumByMonth"));
  const sumByQuarterData = JSON.parse(localStorage.getItem("sumByQuarter"));
  const sumByYearData = JSON.parse(localStorage.getItem("sumByYear"));

  // Cacher les blocs de graphique s'il n'y a pas de données
  if (!sumByMonthData || !sumByQuarterData || !sumByYearData) {
    const chartBlocks = document.querySelectorAll(".chart");
    chartBlocks.forEach((chartBlock) => {
      chartBlock.style.display = "none";
    });
  }

  const tutoContainer = document.getElementById("tutoContainer");
  const clearLocalStorageButton = document.getElementById(
    "clearLocalStorageButton"
  );

  // Récupérer les données du local storage
  const sumByMonth = JSON.parse(localStorage.getItem("sumByMonth"));
  const sumByQuarter = JSON.parse(localStorage.getItem("sumByQuarter"));
  const sumByYear = JSON.parse(localStorage.getItem("sumByYear"));

  // Vérifier si les données existent dans le local storage
  if (sumByMonth || sumByQuarter || sumByYear) {
    // Cacher le bloc de tutoriel
    tutoContainer.style.display = "none";
  } else {
    // Cacher le bouton de suppression
    clearLocalStorageButton.style.display = "none";
  }

  // Ajouter un écouteur d'événement au bouton de suppression
  clearLocalStorageButton.addEventListener("click", function () {
    // Supprimer les données du local storage
    localStorage.removeItem("sumByMonth");
    localStorage.removeItem("sumByQuarter");
    localStorage.removeItem("sumByYear");
    localStorage.removeItem("filteredData");

    // Rafraîchir la page pour appliquer les changements
    location.reload();
  });
});

function toggleFullscreen(chartId) {
  const chartElement = document.getElementById(chartId);

  if (chartElement.requestFullscreen) {
    chartElement.requestFullscreen();
  } else if (chartElement.mozRequestFullScreen) {
    // Version Firefox
    chartElement.mozRequestFullScreen();
  } else if (chartElement.webkitRequestFullscreen) {
    // Version Safari et Chrome
    chartElement.webkitRequestFullscreen();
  } else if (chartElement.msRequestFullscreen) {
    // Version Internet Explorer
    chartElement.msRequestFullscreen();
  }
}
