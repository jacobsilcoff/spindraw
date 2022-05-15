//modes
const FreeDraw = Symbol("FreeDraw");
const SliderDraw = Symbol("SliderDraw");
let mode;
let firstPt;
let sliders = [];

let spinners = [];

function setup() {
  var browser_width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var browser_height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
  createCanvas(browser_width, browser_height);

  firstPt = false;
  mode = SliderDraw;

  spinners = [new SpinDraw()];
}

function draw() {
  background(255);

  for (let s of spinners) {
    s.draw();
  }

  if (mouseIsPressed && mouseButton == LEFT && mode === FreeDraw) {
    spinners[0].addPoint(mouseX,mouseY);
  }

  if (mode === SliderDraw && firstPt) {
    line(firstPt[0], firstPt[1], mouseX, mouseY);
  }

  if (mode === SliderDraw) {
    for (let [i, slider] of sliders.entries()) {
      let [x,y] = slider.getPoint();
      spinners[i+1].addPoint(x,y);
      slider.draw();
    }
  }
}

function eraseAll() {
  sliders = [];
  spinners = [spinners[0]];
  spinners[0].clear();
}


function mousePressed() {
  if (mouseButton == LEFT && mode === SliderDraw) {
    firstPt = [mouseX, mouseY];
  }
  if (mouseButton == CENTER) {
    eraseAll();
  } else if (mouseButton == RIGHT) {
    for (let s of spinners) s.stop();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    for (let s of spinners) s.incSpeed(3);
  } else if (keyCode === DOWN_ARROW) {
    for (let s of spinners) s.incSpeed(-3);
  } else if (keyCode === BACKSPACE) {
    eraseAll();
  } else if (keyCode === ENTER) {
    for (let s of spinners) s.stop();
  } else if (keyCode == 49) {
    mode = FreeDraw;
  } else if (keyCode == 50) {
    mode = SliderDraw;
  }
}

function mouseReleased() {
  spinners[0].finishLine();
  if (mouseButton == LEFT && mode === SliderDraw && firstPt) {
    sliders.push(new Slider(firstPt, [mouseX,mouseY]));
    let s = new SpinDraw();
    s.d_angle = spinners[0].d_angle;
    spinners.push(s);
    firstPt = false;
  }
}

function mouseWheel(event) {
  for (let s of spinners) s.incSpeed(event.delta/53);
}
