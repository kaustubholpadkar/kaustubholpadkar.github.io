instruction = "Tap on the Screen to Insert Data Points...";

var epsilonSlider, epsilonSpan;
var minPointsSlider;
var changeColor;

// Data
X1 = [];
X2 = [];
Y  = [];

// Hyperparameters
b = 0.0;
w1 = 0.0;
w2 = 0.0;

var threshold = 100.0;
var learning_rate = 0.1;

// Parameters
var x1, x2;
var y1, y2;
var m, b;
var type = 1;

var flag = false;

function setup() {
  createCanvas(windowWidth, windowHeight - 30);

  createSpan("  |  ");
  createSpan("Learning Rate : ");
  epsilonSlider = createSlider(0, 100, 10);
  epsilonSpan = createSpan(epsilonSlider.value());
  createSpan("  |  ");
  createSpan("Threshold : ");
  minPointsSlider = createSlider(0, 300, 100);
  minPointsSpan = createSpan(epsilonSlider.value());
  createSpan("  |  ");
  changeColor = createButton("Change Color");
  changeColor.mousePressed(swap);
  createSpan("  |  ");
  train = createButton("Start Training");
  train.mousePressed(function(){
    flag = true;
  });

}

function draw() {
  background(51);

  learning_rate = epsilonSlider.value() / 1000;
  epsilonSpan.html(learning_rate.toString());
  threshold = minPointsSlider.value();
  minPointsSpan.html(threshold.toString());

  fill(250);
  noStroke();
  textFont('monospace');
  textSize(25);
  text("Percetron with Margin", 15, 40);
  textSize(20);
  text(instruction, 15, windowHeight - 60);
  fill(100);
  textSize(15);
  text("Author : Kaustubh Olpadkar", windowWidth - 270, 40);

  noStroke();
  for (var i = 0; i < X1.length; i++) {
    Y[i] == 1 ? fill(255, 0, 0) : fill(0, 0, 255);
    ellipse(X1[i], X2[i], 8, 8);
  }

  if (flag) {
    fit();
  }

  drawLine();
  stroke(255, 0, 255);
  line(x1, y1 + threshold, x2, y2 + threshold);
  line(x1, y1 - threshold, x2, y2 - threshold);

  stroke(255, 255, 0);
  line(x1, y1, x2, y2);
}

function mouseClicked () {
  X1.push(mouseX);
  X2.push(mouseY);
  Y.push(type);
}

function swap() {
  type = -type;
}

function activate (y, threshold) {
  if (y > threshold) {
    return 1;
  } else if (y <= -threshold) {
    return -1;
  }
  return 0;
}

function fit () {
  for (var i = 0; i < X1.length; i++) {
    y = w1 * X1[i] + w2 * X2[i] + b;
    y = activate(y, threshold);

    console.log(" " + y + " " + Y[i]);

    if (y != Y[i]) {
      console.log("Here");

      var x1 = map(X1[i], 0, width, 0, 1);
      var x2 = map(X2[i], 0, height, 0, 1);

      w1 += learning_rate * Y[i] * x1;
      w2 += learning_rate * Y[i] * x2;
      b  += learning_rate * Y[i];
    }
  }
}

function keyPressed () {
  if (keyCode === ENTER) {
    swap()
  } else if (keyCode === ESCAPE) {
    flag = true;
    //fit ();
  }
}

function drawLine () {
  x1 = 0;
  x2 = width;

  m = - (w1 / w2);
  c = - (b / w2);

  y1 = m * x1 + c;
  y2 = m * x2 + c;
}
