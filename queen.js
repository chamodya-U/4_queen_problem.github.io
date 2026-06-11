export class Queen {
  constructor(x, y, r, cordinates) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.cordinates = cordinates;
    this.item = cordinates[x][y];
    this.canvasX = this.item.x1 + this.item.x2 / 2;
    this.canvasY = this.item.y1 + this.item.y2 / 2;
    this.path = [];
  }

  drawQueen(ctx, color) {
    this.drawCircle(ctx, this.canvasX, this.canvasY, this.r, color);
  }

  drawQueenPath(ctx, color) {
    //horizontal
    this.cordinates[this.x].forEach((item, y) => {
      this.path.push([this.x, y]);
      this.drawCircle(
        ctx,
        item.x1 + item.x2 / 2,
        item.y1 + item.y2 / 2,
        this.r / 4,
        color,
      );
    });
    //verticle
    this.cordinates.forEach((row, x) => {
      let item = row[this.y];
      this.path.push([x, this.y]);
      this.drawCircle(
        ctx,
        item.x1 + item.x2 / 2,
        item.y1 + item.y2 / 2,
        this.r / 4,
        color,
      );
    });
    //diagonal
    let k = this.x;
    let l = this.y;
    let matrixSize = this.cordinates[0].length;

    while (k - 1 >= 0 && l - 1 >= 0) {
      k--;
      l--;
      this.path.push([k, l]);
    }
    k = this.x;
    l = this.y;

    while (k + 1 < matrixSize && l + 1 < matrixSize) {
      k++;
      l++;
      this.path.push([k, l]);
    }

    k = this.x;
    l = this.y;

    while (k - 1 >= 0 && l + 1 < matrixSize) {
      k--;
      l++;
      this.path.push([k, l]);
    }

    while (l - 1 >= 0 && k + 1 < matrixSize) {
      k++;
      l--;
      this.path.push([k, l]);
    }

    //darwpath
    this.path.forEach(([x, y]) => {
      let item = this.cordinates[x][y];
      this.drawCircle(
        ctx,
        item.x1 + item.x2 / 2,
        item.y1 + item.y2 / 2,
        this.r / 4,
        color,
      );
    });
  }

  drawCircle(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  }
}
