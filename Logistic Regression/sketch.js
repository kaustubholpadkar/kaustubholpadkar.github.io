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

var threshold = 0.5;
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
  // createSpan("Threshold : ");
  // minPointsSlider = createSlider(0, 100, 50);
  // minPointsSpan = createSpan(epsilonSlider.value());
  // createSpan("  |  ");
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
  // threshold = minPointsSlider.value() / 100;
  // minPointsSpan.html(threshold.toString());

  fill(250);
  noStroke();
  textFont('monospace');
  textSize(25);
  text("Logistic Regression", 15, 40);
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

  stroke(255, 255, 0);
  line(x1, y1, x2, y2);
}

function mouseClicked () {
  X1.push(mouseX);
  X2.push(mouseY);
  Y.push(type);
}

function swap() {
  type = 1 - type;
}

function activate (y) {
  return (1 / (1 + Math.exp(-y)));
}

function fit () {

  var W1 = 0.0;
  var W2 = 0.0;
  var B  = 0.0;

  for (var i = 0; i < X1.length; i++) {
    y = w1 * X1[i] + w2 * X2[i] + b;
    y = activate(y);

    var x1 = map(X1[i], 0, width, 0, 1);
    var x2 = map(X2[i], 0, height, 0, 1);

    W1 += (y - Y[i]) * x1;
    W2 += (y - Y[i]) * x2;
    B += (y - Y[i]);

  }

  W1 = W1 / X1.length;
  W2 = W2 / X1.length;
  B  = B / X1.length;

  w1 -= learning_rate * W1;
  w2 -= learning_rate * W2;
  b  -= learning_rate * B;
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
