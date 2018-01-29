var X = [];
var Y = [];

var T;
var learningRate = 0.0001;

var instruction = "Tap on the Screen to Insert Data Points...";

function setup () {

  createCanvas(windowWidth, windowHeight);
  T = [Math.random(height), 4.0];
}

function draw () {
  background(51);

  fill(250);
  noStroke();
  textFont('monospace');
  textSize(25);
  text("Linear Regression using Gradient Descent", 15, 40);
  textSize(20);
  text(instruction, 15, windowHeight - 30);
  fill(100);
  textSize(15);
  text("Author : Kaustubh Olpadkar", windowWidth - 270, 40);
  noFill();
  noStroke();

  plotData();
  if (X.length >= 2) {
    gradientDescent();
    fit();
    // console.log(cost());
  }
  noFill();
}

function mouseClicked () {
  X.push(mouseX);
  Y.push(mouseY);
}

function gradientDescent () {
  T[0] -= learningRate * gradient(0) * 10000;
  T[1] -= learningRate * gradient(1) * 0.01;
}

function gradient (n) {
  ans = 0.0;
  for (var i = 0; i < X.length; i++) {
    if (n == 0) {
      ans += (h(X[i]) - Y[i]);
    } else if (n == 1) {
      ans += (h(X[i]) - Y[i]) * X[i];
    }
  }
  // console.log(ans);
  return ans / X.length;
}

function cost () {
  ans = 0.0;
  for (var i = 0; i < X.length; i++) {
    ans += (h(X[i]) - Y[i]) * (h(X[i]) - Y[i]);
  }
  return ans / X.length;
}

function fit () {
  x1 = 0;
  y1 = Math.trunc(h(x1));
  x2 = width;
  y2 = Math.trunc(h(x2));

  stroke(255);
  line(x1, y1, x2, y2);
}

function h (x) {
  return T[0] + T[1] * x;
}

function plotData () {
  noStroke();
  fill(255);
  for (var i = 0; i < X.length; i++) {
    ellipse(X[i], Y[i], 10);
  }
  noFill();
}

function setRadomly () {
  T[0] = Math.tan(Math.random(Math.PI));
  T[1] = Math.random(20);
}
