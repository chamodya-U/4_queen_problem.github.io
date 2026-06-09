const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let cordinates = [];
ctx.fillStyle = "blue";
let l = 80;
let gap = 2;

//Create cordinates
for (let i = 0; i < 4; i++) {
  let row = [];
  for (let j = 0; j < 4; j++) {
    //horizonatal gap
    let hgap = j * gap;
    //vertical gap
    let vgap = i * gap;

    let x1 = l * j + hgap;
    let y1 = l * i + vgap;
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

//c stqand for codinate
function showpath(c, arr, i, j) {
  let shouldCheckX = c.x1;
  let shouldCheckY = c.y1;
  ctx.fillStyle = "red";

  arr.forEach((row) => {
    row.forEach((item) => {
      if (item.x1 == shouldCheckX) {
        drawCircle(item.x1 + item.x2 / 2, item.y1 + item.y2 / 2, 5);
      }
      if (item.y1 == shouldCheckY) {
        drawCircle(item.x1 + item.x2 / 2, item.y1 + item.y2 / 2, 5);
      }
    });
  });

  //make diagonal
  let d = [];
  let k = i;
  let l = j;

  while (k - 1 >= 0 && l - 1 >= 0) {
    k--;
    l--;
    d.push([k, l]);
  }
  k = i;
  l = j;

  while (k + 1 < 4 && l + 1 < 4) {
    k++;
    l++;
    d.push([k, l]);
  }

  k = i;
  l = j;

  while (k - 1 >= 0 && l + 1 < 4) {
    k--;
    l++;
    d.push([k, l]);
  }

  while (l - 1 >= 0 && k + 1 < 4) {
    k++;
    l--;
    d.push([k, l]);
  }

  //console.log(arr[0]);

  d.forEach((index) => {
    item = arr[index[0]][index[1]];
    drawCircle(item.x1 + item.x2 / 2, item.y1 + item.y2 / 2, 5);
  });
}

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
        //console.log(checkX, checkY);

        if (checkX && checkY) {
          showpath(item, cordinates, i, j);
          drawCircle(item.x1 + item.x2 / 2, item.y1 + item.y2 / 2, 15);
        }
      });
    });
  }

  //console.log(e.clientX, e.clientY);
});
