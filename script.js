import { Queen } from "./queen.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let cordinates = [];
let queens = [];
ctx.fillStyle = "blue";
let l = 80;
let gap = 2;
let boardX = 30;
let boardY = 30;
let matrixSize = 4;

//Create cordinates as bellow
/* 
_____________
| 00  |  01 |
|_____|_____|
| 10  | 11  |
|_____|_____| 
*/

for (let i = 0; i < matrixSize; i++) {
  let row = [];
  for (let j = 0; j < matrixSize; j++) {
    //horizonatal gap
    let hgap = j * gap;
    //vertical gap
    let vgap = i * gap;

    let x1 = l * j + hgap + boardX;
    let y1 = l * i + vgap + boardY;
    let x2 = l;
    let y2 = l;
    row.push({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
    });
  }
  cordinates.push(row);
}
//console.log(cordinates[0][0]);

//draw board
function drawboard(arr) {
  let rowlen = arr.length;
  let collen = arr[0].length;

  for (let i = 0; i < rowlen; i++) {
    for (let j = 0; j < collen; j++) {
      let item = arr[i][j];
      ctx.fillRect(item.x1, item.y1, item.x2, item.y2);
    }
  }
}
drawboard(cordinates);

const canvasStart = canvas.getBoundingClientRect();
const canvasStartX = canvasStart.left;
const canvasStartY = canvasStart.top;

function boudaryCheck(b1, b2, value) {
  if (value >= b1 && value <= b2) return true;
}

function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.fill();
}

//console.log(cordinates);

window.addEventListener("click", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  //convert into inside values
  let insideX = x - canvasStartX;
  let insideY = y - canvasStartY;

  let useableX = null;
  let useableY = null;

  if (insideX >= 0 && insideX <= 400) {
    useableX = insideX;
  }
  if (insideY >= 0 && insideY <= 400) {
    useableY = insideY;
  }

  if (useableX && useableY) {
    cordinates.forEach((row, i) => {
      row.forEach((item, j) => {
        let checkX = boudaryCheck(item.x1, item.x1 + item.x2, useableX);
        let checkY = boudaryCheck(item.y1, item.y1 + item.y2, useableY);

        if (checkX && checkY) {
          queens.push(new Queen(i, j, 15, cordinates));
        }
      });
    });
  }
  queens.forEach((queen) => {
    queen.drawQueenPath(ctx, "green");
    queen.drawQueen(ctx, "black");
  });
});
