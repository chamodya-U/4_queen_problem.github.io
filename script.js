const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let cordinates = [];
ctx.fillStyle = "blue";
let l = 80;
let gap = 2;
//draw board
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    //horizonatal gap
    let hgap = j * gap;
    //vertical gap
    let vgap = i * gap;

    let x1 = l * j + hgap;
    let y1 = l * i + vgap;
    let x2 = l;
    let y2 = l;
    cordinates.push({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
    });
  }
}
const canvasStart = canvas.getBoundingClientRect();
const canvasStartX = canvasStart.left;
const canvasStartY = canvasStart.top;
cordinates.forEach((item) => {
  ctx.fillRect(item.x1, item.y1, item.x2, item.y2);
});

/* canvas.addEventListener("mousemove", (e) => {
  console.log(e.clientX, e.clientY);

  const rect = canvas.getBoundingClientRect();
  console.log(rect);

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  cordinates.forEach((cell) => {
    if (
      x >= cell.x1 &&
      x <= cell.x1 + cell.x2 &&
      y >= cell.y1 &&
      y <= cell.y1 + cell.y2
    ) {
      ctx.fillStyle = "red";
      ctx.fillRect(cell.x1, cell.y1, cell.x2, cell.y2);
    }
  });
});
*/
console.log(cordinates);

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
    console.log(useableX, useableY);
    cordinates.forEach((item) => {
      let checkX = boudaryCheck(item.x1, item.x1 + item.x2, useableX);
      let checkY = boudaryCheck(item.y1, item.y1 + item.y2, useableY);
      //console.log(checkX, checkY);

      if (checkX && checkY) {
        showpath(item, cordinates);
        drawCircle(item.x1 + item.x2 / 2, item.y1 + item.y2 / 2, 15);
      }
    });
  }

  //console.log(e.clientX, e.clientY);
});

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

//c stqand for codinate
function showpath(c, arr) {
  let shouldCheckX = c.x1;
  let shouldCheckY = c.y1;
  ctx.fillStyle = "red";
  let lineX = [];
  let lineY = [];
  arr.forEach((item) => {
    if (item.x1 == shouldCheckX) {
      //ctx.fillRect(item.x1, item.y1, item.x2, item.y2);
      drawCircle(item.x1 + item.x2 / 2, item.y1 + item.y2 / 2, 5);
      lineX.push(item);
    }
    if (item.y1 == shouldCheckY) {
      //ctx.fillRect(item.x1, item.y1, item.x2, item.y2);
      drawCircle(item.x1 + item.x2 / 2, item.y1 + item.y2 / 2, 5);
      lineY.push(lineY);
    }

    //make diagonal
    lineX.forEach((itemX) => {
      lineY.forEach((itemY) => {
        if (itemX.x1 == itemY.y1 && itemX.y1 == itemY.x1) {
          drawCircle(item.x1 + item.x2 / 2, item.y1 + item.y2 / 2, 5);
          console.log(true);
        }
      });
    });
  });
}
