class Slider {

  constructor(start, stop) {
    this.start = start;
    this.stop = stop;
    this.t = 0;
    this.period = 100;
    this.active = true;
  }

  draw() {
    push();
    stroke(0);
    line(this.start[0], this.start[1], this.stop[0], this.stop[1]);
    let [x,y] = this.getPoint();
    circle(x,y,5);
    pop();
    if (this.active) {
      this.t += 1;
    }
    this.t %= this.period;
  }

  getPoint() {
    let t = min(this.t, this.period - this.t) * 2;
    return [
      map(t, 0, this.period, this.start[0], this.stop[0]),
      map(t, 0, this.period, this.start[1], this.stop[1])
    ];
  }
}
