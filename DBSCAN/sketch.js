var data = [];
var c = [];

var epsilon, epsilonSlider, epsilonSpan;
var minPoints;
var minPointsSlider;
var start, reset;

var showLine;
var showline = true;

var isstart = true;

var colors = ["#F44336", "#9C27B0", "#E91E63", "#2196F3", "#8BC34A", "#FFEB3B", "#607D8B", "#4CAF50", "#009688", "#03A9F4", "#F8BBD0", "#AA00FF", "#5C6BC0", "#BDBDBD", "#FFFF8D", "#795548", "white"];
var colorc = 0;

var instruction = "Tap on the Screen to Insert Data Points...";

function setup () {
  createCanvas(windowWidth, windowHeight - 40);
  createSpan("  |  ");
  createSpan("Epsilon : ");
  epsilonSlider = createSlider(0, 400, 100);
  epsilonSlider.changed(epsilonChanged);
  epsilonSpan = createSpan(epsilonSlider.value());
  createSpan("  |  ");
  createSpan("MinPoints : ");
  minPointsSlider = createSlider(0, 10, 5);
  minPointsSpan = createSpan(epsilonSlider.value());
  minPointsSlider.changed(minPointsChanged);
  createSpan("  |  ");
  showLine = createButton("Show Lines");
  showLine.mousePressed(function () {
    showline = !showline;
  });
  // start = createButton("Start");
  // start.mousePressed(startClustering);

  // reset = createButton("Reset");
  // reset.mousePressed(resetClustering);

}

function draw () {
  epsilon = epsilonSlider.value();
  epsilonSpan.html(epsilon.toString());
  minPoints = minPointsSlider.value();
  minPointsSpan.html(minPoints.toString());

  background(51);

  fill(250);
  textFont('monospace');
  textSize(25);
  text("DBSCAN Clustering", 15, 40);
  textSize(20);
  text(instruction, 15, height - 30);
  fill(100);
  textSize(15);
  // text("Note : Use Maximum 5 Clusters", 15, windowHeight - 7);
  text("Author : Kaustubh Olpadkar", windowWidth - 270, 40);

  noFill();
  noStroke();
  for (var i = 0; i < data.length; i++) {
    noStroke();
    fill(color(colors[c[i]]));
    ellipse(data[i][0], data[i][1], 10, 10);
  }
  if (isstart) {
  for (var i = 0; i < data.length; i++) {
    var temp = [];
    var mintemp = 0;
    for (var j = 0; j < data.length; j++) {
      if (distanceSquare(data[i][0], data[i][1], data[j][0], data[j][1]) <= epsilon * epsilon) {
        temp.push(j);
        mintemp++;
      }
    }
    if (mintemp >= minPoints) {

      if (c[i] == colors.length - 1) {
        c[i] = colorc;
        colorc++;
        colorc = colorc%colors.length;
      }

      for (var j = 0; j < temp.length; j++) {
        stroke(255);
        c[temp[j]] = c[i];
        if (showline) {
          line(data[i][0], data[i][1], data[temp[j]][0], data[temp[j]][1]);
        }
        noStroke();
      }
    }
  }
  }
  noFill();
}

function startClustering () {
  isstart = !isstart;

  epsilonSlider.hide();
  minPointsSlider.hide();
}

function resetClustering () {

  for (var i = 0; i < data.length; i++) {
    c[i] = colors.length - 1;
  }
  isstart = !isstart;

  epsilonSlider.show();
  minPointsSlider.show();
}

function mouseClicked () {
  if (isstart) {
    data.push([mouseX, mouseY]);
    c.push(colors.length - 1);
  }
}

function distanceSquare (x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}

function epsilonChanged () {
  isstart = !isstart;
  colorc = 0;
  for (var i = 0; i < data.length; i++) {
    c[i] = colors.length - 1;
  }
  isstart = !isstart;
}

function minPointsChanged () {
  isstart = !isstart;
  colorc = 0;
  for (var i = 0; i < data.length; i++) {
    c[i] = colors.length - 1;
  }
  isstart = !isstart;
}
