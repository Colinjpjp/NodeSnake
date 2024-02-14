import { emitKeypressEvents } from "readline";
import { stdin, stdout } from "process";

const width = process.stdout.columns;
const height = process.stdout.rows;

let snake = [{ x: 5, y: 5 }];
let direction = "right";

const drawSnake = () => {
  const grid = Array.from({ length: height }, () => Array(width).fill(" "));

  snake.forEach((segment) => {
    grid[segment.y][segment.x] = ".";
  });

  const rows = grid.map((row) => row.join("")).join("\n");
  console.clear();
  console.log(rows);
};

const moveSnake = () => {
  const head = { ...snake[0] };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);
  snake.pop();
};

const gameLoop = () => {
  moveSnake();
  drawSnake();
};

const handleKeyPress = (key) => {
  switch (key) {
    case "w":
      direction = "up";
      break;
    case "s":
      direction = "down";
      break;
    case "a":
      direction = "left";
      break;
    case "d":
      direction = "right";
      break;
  }
};

emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on("keypress", (_, key) => {
  handleKeyPress(key.name);
});

setInterval(gameLoop, 50);

console.log("Use las teclas W, A, S, D para mover la serpiente.");
