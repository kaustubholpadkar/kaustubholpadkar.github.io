
var Ax, Ay, Bx, By, Cx, Cy;

var points = [];
var nSlider;

var instruction = "Change the Value of Slider"

var count = 0;
var approximation;

function setup () {
  createCanvas(windowWidth, windowHeight - 40);
  nSlider = createSlider(1, 10, 4);
  approximation = createSpan(nSlider.value());
  startX = 100;
  startY = height - 10;
  endX = windowWidth - 100;
  endY = height - 100;
}

function draw () {
  background(51);
  approximation.html(nSlider.value().toString());
  fill(250);
  textFont('monospace');
  textSize(25);
  text("Koch snowflake", 15, 40);
  textSize(20);
  text(instruction, 15, height - 30);
  fill(100);
  textSize(15);
    // text("Note : Use Maximum 5 Clusters", 15, windowHeight - 7);
  text("Author : Kaustubh Olpadkar", windowWidth - 270, 40);
  text("Author : Jeet Rabari", windowWidth - 270, 70);

  stroke(255);
  if (count == 3) {
    for (var i = 0; i < points.length; i++) {
      koch(points[i][0], points[i][1], points[(i + 1)%points.length][0], points[(i + 1)%points.length][1], nSlider.value());
    }
  }
  noStroke();
}

function mousePressed () {
  if (count < 3) {
    points.push([]);
    points[count].push(mouseX);
    points[count].push(mouseY);
    count++;
  }
}

function koch (startX, startY, endX, endY, iteration) {
  if (iteration == 1) {
    line(startX, startY, endX, endY);
    return;
  }
  var ax = (2 * startX + 1 * endX) / 3;
  var ay = (2 * startY + 1 * endY) / 3;

  var bx = (1 * startX + 2 * endX) / 3;
  var by = (1 * startY + 2 * endY) / 3;

  var cx = 0.5 * (ax - bx) - 0.8660 * (ay - by) + bx;
  var cy = 0.8660 * (ax - bx) + 0.5 * (ay - by) + by;

  koch(startX, startY, ax, ay, iteration - 1);
  koch(ax, ay, cx, cy, iteration - 1);
  koch(cx, cy, bx, by, iteration - 1);
  koch(bx, by, endX, endY, iteration - 1);
}
