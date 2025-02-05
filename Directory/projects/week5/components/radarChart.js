export const radarCtx = document.getElementById('radarChart').getContext('2d');
export const radarChart = new Chart(radarCtx, {
  type: 'radar',
  data: {
    labels: ['Hours (1st)', 'Hours (2nd)', 'Minutes (1st)', 'Minutes (2nd)', 'Seconds (1st)', 'Seconds (2nd)'],
    datasets: [{
      label: 'Time Digits',
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: 'lime',
      borderColor: 'lime',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        labels: {
          color: 'lime',
          font: {
            family: 'Sprykski',
            size: 14
          }
        }
      },
      tooltip: {
        titleFont: {
          family: 'Sprykski',
          size: 14
        },
        bodyFont: {
          family: 'Sprykski',
          size: 12
        }
      }
    },
    scales: {
      r: {
        min: 0,
        max: 9,
        ticks: {
          stepSize: 1,
          color: 'lime',
          backdropColor: 'black',
          font: {
            family: 'Sprykski',
            size: 14
          }
        },
        grid: {
          color: 'lime'
        },
        angleLines: {
          color: 'lime'
        },
        pointLabels: {
          font: {
            family: 'Sprykski',
            size: 14
          }
        }
      }
    }
  }
});

export function updateRadarChart(hours, minutes, seconds) {
  radarChart.data.datasets[0].data = [
    Math.floor(hours / 10), hours % 10,
    Math.floor(minutes / 10), minutes % 10,
    Math.floor(seconds / 10), seconds % 10
  ];
  radarChart.update();
}
