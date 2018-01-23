var array = [10, 50, 2, 40, 15, 47, 23, 8, 49, 27, 13, 40, 35, 17, 30, 19];
var colors = [];

var randomize;
var next, previous, reset;

var ii = 1, jj = 1, n = 16;

function setup () {
  createCanvas(windowWidth, windowHeight - 40);
  randomizeArray();
  randomize = createButton("Randomize Array");
  randomize.mouseClicked(randomizeArray);

  for (var i = 0; i < n; i++) {
    colors.push("#BBDEFB");
  }

  next = createButton("Next Step");
  next.mouseClicked(nextStep);
  // previous = createButton("Previous Step");
  // previous.mouseClicked(previousStep);

  reset = createButton("Reset");
  reset.mouseClicked(function(){
    location.reload();
  });

}

function draw () {
  background(51);

  fill(250);
  textFont('monospace');
  textSize(25);
  text("Insertion Sort", 15, 40);
  fill(100);
  textSize(15);
  // text("Note : Use Maximum 5 Clusters", 15, windowHeight - 7);
  text("Author : Kaustubh Olpadkar", windowWidth - 270, 40);

  noFill();
  noStroke();

  for (var i = 0; i < array.length; i++) {
    if (i == ii) {
      colors[i] = "#FF1744";
    } else if (i == jj) {
      colors[i] = "#388E3C";
    } else {
      colors[i] = "#BBDEFB";
    }
  }

  printArrayBar(array);

  if (ii == 16 && jj == 16) {
    // textSize(32);
    fill(250);
    text("Array Sorted!", 15, height - 50);
  }
}

function randomizeArray () {
  if (ii == 1 && jj == 1) {
    for (var i = 0; i < n; i++) {
      array[i] = Math.floor(Math.random() * 50 + 1);
    }
  }
}

function printArrayBar (array) {

  for (var i = 0; i < array.length; i++) {
    fill(colors[i]);
    printBar(300 + i * 50, y = height - 50, array[i]);
  }
}

function printBar (x, y, number) {

  var ratio = number * 7;
  rect(x, y - ratio, 30, ratio);
  text(number, x + 5, y + 25);
}

function nextStep () {
  if (ii < n) {
    if (jj > 0 && array[jj - 1] > array[jj]) {
      var temp = array[jj];
      array[jj] = array[jj - 1];
      array[jj - 1] = temp;

      jj--;
    } else {
      ii++;
      jj = ii;
    }
  }
}

function previousStep () {

}

function keyPressed () {
  if (keyCode == ENTER) {
    nextStep();
  }
}
