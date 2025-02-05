export const scatterCtx = document.getElementById('scatterChart').getContext('2d');

let scatterDataPoints = [
  { x: 0, y: 0 }, // First digit of hour
  { x: 1, y: 0 }, // Second digit of hour
  { x: 2, y: 0 }, // First digit of minute
  { x: 3, y: 0 }, // Second digit of minute
  { x: 4, y: 0 }, // First digit of second
  { x: 5, y: 0 }  // Second digit of second
];

export const scatterChart = new Chart(scatterCtx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Time Peaks',
      data: scatterDataPoints,
      borderColor: 'red',
      backgroundColor: 'red',
      borderWidth: 2,
      showLine: true,
      pointRadius: 6,
      pointBackgroundColor: ['red', 'red', 'red', 'red', 'red', 'red']
    }]
  },
  options: {
    responsive: true,
    animation: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: { 
          display: true, 
          text: 'Time Units',
          font: {
            family: 'Sprykski',
            size: 14
          }
        },
        ticks: {
          color: 'red',
          backdropColor: 'black',
          font: {
            family: 'Sprykski',
            size: 14
          }
        }
      },
      y: {
        min: 0,
        max: 9,
        title: { 
          display: true, 
          text: 'Digit Value',
          font: {
            family: 'Sprykski',
            size: 14
          }
        },
        ticks: {
          color: 'red',
          backdropColor: 'black',
          font: {
            family: 'Sprykski',
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'red',
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
    }
  }
});

export function updateScatterChart(hours, minutes, seconds) {
  scatterDataPoints[0].y = Math.floor(hours / 10);
  scatterDataPoints[1].y = hours % 10;
  scatterDataPoints[2].y = Math.floor(minutes / 10);
  scatterDataPoints[3].y = minutes % 10;
  scatterDataPoints[4].y = Math.floor(seconds / 10);
  scatterDataPoints[5].y = seconds % 10;
  
  scatterChart.update();
}
