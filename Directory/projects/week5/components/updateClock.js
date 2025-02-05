import { updateRadarChart } from './radarChart.js';
import { updateScatterChart } from './scatterChart.js';
import { updateBarChart } from './barChart.js';

export function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("h1").src = `./assets/images/${hours[0]}.png`;
  document.getElementById("h2").src = `./assets/images/${hours[1]}.png`;
  document.getElementById("m1").src = `./assets/images/${minutes[0]}.png`;
  document.getElementById("m2").src = `./assets/images/${minutes[1]}.png`;
  document.getElementById("s1").src = `./assets/images/${seconds[0]}.png`;
  document.getElementById("s2").src = `./assets/images/${seconds[1]}.png`;

  updateRadarChart(hours, minutes, seconds);
  updateScatterChart(hours, minutes, seconds);
  updateBarChart();
}

setInterval(updateClock, 1000);
updateClock();
