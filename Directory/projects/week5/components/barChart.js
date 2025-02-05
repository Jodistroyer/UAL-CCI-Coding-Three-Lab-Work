export const barChartCtx = document.getElementById('timeGraph').getContext('2d');
    
let barChartDataPoints = [
  { x: 0, y: 0 }, // First digit of hour
  { x: 1, y: 0 }, // Second digit of hour
  { x: 2, y: 0 }, // First digit of minute
  { x: 3, y: 0 }, // Second digit of minute
  { x: 4, y: 0 }, // First digit of second
  { x: 5, y: 0 }  // Second digit of second
];

export const barChart = new Chart(barChartCtx, {
  type: 'bar',
  data: {
    datasets: [{
      label: 'Time Digits',
      data: barChartDataPoints,
      backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
      borderColor: 'black',
      borderWidth: 1,
      barPercentage: 0.5,
      categoryPercentage: 0.8
    }]
  },
  options: {
    responsive: true,
    animation: false,
    scales: {
      x: {
        type: 'category',
        labels: ['Hours', 'Hours', 'Minutes', 'Minutes', 'Seconds', 'Seconds'],
        title: { 
          display: true, 
          text: 'Time Units',
          font: {
            family: 'Sprykski',
            size: 14
          }
        },
        ticks: {
          font: {
            family: 'Sprykski',
            size: 12
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
          font: {
            family: 'Sprykski',
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
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

export function updateBarChart() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let hourFirstDigit = Math.floor(hours / 10);
  let hourSecondDigit = hours % 10;
  let minuteFirstDigit = Math.floor(minutes / 10);
  let minuteSecondDigit = minutes % 10;
  let secondFirstDigit = Math.floor(seconds / 10);
  let secondSecondDigit = seconds % 10;

  barChartDataPoints[0].y = hourFirstDigit;
  barChartDataPoints[1].y = hourSecondDigit;
  barChartDataPoints[2].y = minuteFirstDigit;
  barChartDataPoints[3].y = minuteSecondDigit;
  barChartDataPoints[4].y = secondFirstDigit;
  barChartDataPoints[5].y = secondSecondDigit;

  barChart.update();
}
