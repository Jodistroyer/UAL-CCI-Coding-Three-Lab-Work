//https://electronstudio.github.io/pygame-zero-book/chapters/maze.html

const gridSize = 20;
const grid = document.getElementById("grid");

const start = 1;
const finish = 0;

// Maze Layout: 1 = wall, 0 = path
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, finish, 1],
];

// Player's starting position
let playerPosition = { x: start, y: start };

function initializeGrid() {
  grid.innerHTML = ""; // Clear previous grid
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      const cell = document.createElement("input");

      if (maze[y][x] === 1) {
        cell.classList.add("wall");
        cell.checked = true; // Mark walls as checked
      } else {
        cell.checked = false; // Paths remain unchecked
      }

      if (playerPosition.x === x && playerPosition.y === y) {
        cell.classList.add("player");
        cell.checked = true;
      }

      grid.appendChild(cell);
    }
  }
}

function checkFinish() {
  if (
    playerPosition.y === maze.length - 1
  ) {
    alert("Congratulations! You've reached the finish!");
    playerPosition = { x: start, y: start }
  }
}

function movePlayer(direction) {
  const newPosition = {
    x: playerPosition.x,
    y: playerPosition.y,
  };

  if (direction === "ArrowUp") newPosition.y -= 1;
  if (direction === "ArrowDown") newPosition.y += 1;
  if (direction === "ArrowLeft") newPosition.x -= 1;
  if (direction === "ArrowRight") newPosition.x += 1;

  // Check boundaries and walls
  if (
    newPosition.x >= 0 &&
    newPosition.x < gridSize &&
    newPosition.y >= 0 &&
    newPosition.y < maze.length &&
    maze[newPosition.y][newPosition.x] === 0
  ) {
    playerPosition = newPosition;
  }
  
  initializeGrid();
  checkFinish();

}

document.addEventListener("keydown", (e) => {
  movePlayer(e.key);
});

initializeGrid();
