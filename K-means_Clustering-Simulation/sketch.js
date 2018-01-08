var data = [];
var mean = [];

var c = [];

var isdata, ismean, islearning, step;

var colors = ["blue", "red", "yellow", "green", "pink", "white"];
var colorc = 0;

var instruction = "Tap on the Screen to Insert Data Points...   Press Enter to Insert Cluster Centroids";

function setup () {
  isdata = true;
  ismean = false;
  islearning = false;
  step = false;

  createCanvas(windowWidth, windowHeight);
}

function draw () {

  background(51);

  fill(250);
  textFont('monospace');
  textSize(25);
  text("K-means Clustering", 15, 40);
  textSize(20);
  text(instruction, 15, windowHeight - 30);
  fill(100);
  textSize(15);
  text("Note : Use Maximum 5 Clusters", 15, windowHeight - 7);
  text("Author : Kaustubh Olpadkar", windowWidth - 270, 40);

  noFill();

  noStroke();
  for (var i = 0; i < data.length; i++) {
    noStroke();
    fill(color(colors[c[i]]));
    ellipse(data[i][0], data[i][1], 10, 10);
  }
  for (var i = 0; i < mean.length; i++) {
    noStroke();
    fill(color(colors[i]));
    ellipse(mean[i][0], mean[i][1], 20, 20);
  }
  noFill();
}

function mouseClicked () {
  if (isdata) {
    data.push([mouseX, mouseY]);
    c.push(5);
  } else if (ismean) {
    mean.push([mouseX, mouseY]);
    colorc++;
  }
}

function keyPressed () {
  if (keyCode === ENTER) {
    if (isdata == true && ismean == false) {
      isdata = false;
      ismean = true;
      instruction = "Tap on the Screen to Insert Cluster Centroids...   Press Enter to Start Clustering";
    } else if (isdata == false && ismean == true) {
      ismean = false;
      islearning = true;
      instruction = "Press Enter to Assign the Clusters to Data Points...";
    } else if (isdata == false && ismean == false && islearning == true) {
      if (step) {
        for (var i = 0; i < mean.length; i++) {
          mean[i] = average(i);
        }
        instruction = "Press Enter to Assign the Clusters to Data Points...";
      } else {
        for (var i = 0; i < data.length; i++) {
          c[i] = closestCentroid(i);
        }
        instruction = "Press Enter to Update the Cluster Centroids...";
      }
      step = !step;
    }
  }
}

function average (n) {

  var sumX = 0, sumY = 0, count = 0;
  var avgX, avgY;

  for (var i = 0; i < data.length; i++) {
    if (c[i] == n) {
      sumX += data[i][0];
      sumY += data[i][1];
      count++;
    }
  }

  avgX = Math.trunc(sumX / count);
  avgY = Math.trunc(sumY / count);

  return [avgX, avgY];
}

function closestCentroid (n) {

  var minIndex = 0;
  var minDistance = distanceSquare(data[n][0], data[n][1], mean[minIndex][0], mean[minIndex][1]);

  for (var i = 1; i < mean.length; i++) {
    var dis = distanceSquare(data[n][0], data[n][1], mean[i][0], mean[i][1]);

    if (dis < minDistance) {
      minDistance = dis;
      minIndex = i;
    }
  }

  return minIndex;
}

function distanceSquare (x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}
