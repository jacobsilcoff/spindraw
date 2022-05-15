//TODO: color modes, WIGGLE, spline, etc

class SpinDraw {
  constructor() {
    this.lines = [[]];
    this.angle = 0;
    this.d_angle = 0;
  }

  draw() {
      push();
      angleMode(DEGREES);
      colorMode(HSB, 100);
      strokeWeight(10);
      translate(width/2, height/2);
      rotate(this.angle);

      let hue = 0;

      for (let l of this.lines) {
        if (l.length >= 2) {
          let [prevX, prevY] = l[0];
          for (let [x, y] of l.slice(1)) {
            stroke(hue, 100, 100);
            hue += 1;
            hue %= 100;
            line(prevX, prevY, x, y);
            [prevX, prevY] = [x,y];
          }
        }
      }
      this.angle += this.d_angle;
      this.angle %= 360;
      pop();
  }

  finishLine() {
    this.lines.push([]);
  }

  addPoint(x,y) {
    this.lines[this.lines.length-1].push(this.convertToSpinCoords(x,y));
  }

  clear() {
    this.lines = [[]];
  }

  stop() {
    this.d_angle = 0;
  }

  incSpeed(x) {
    this.d_angle += x;
  }

  convertToSpinCoords(x, y) {
    x = x-width/2;
    y = y-height/2;
    let s = sin(-this.angle);
    let c = cos(-this.angle);
    return [c*x-s*y, s*x+c*y];
  }
}
