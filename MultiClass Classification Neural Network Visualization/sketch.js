var canvas_width, canvas_height

var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

var perceptron = new Architect.Perceptron(2, 30, 3);

var learning_rate = 0.1
var X = []
var Y = []

var rows, cols, resolution
var type = 0
var nclass = 3

function setup () {

  canvas_width = windowWidth
  canvas_height = windowHeight

  resolution = 5
  rows = canvas_height / resolution
  cols = canvas_width / resolution

  createCanvas(canvas_width, canvas_height)
	setInterval(train, 5)
}

function draw () {
  background(51)
	frameRate(30)

	train()

	plot()
  plotData()
  // intro()
}

function train () {
	for (let i = 0; i < Y.length; i++) {
		perceptron.activate(X[i])
    let tempY = [0, 0, 0]
    tempY[Y[i][0]] = 1
		perceptron.propagate(learning_rate, tempY)
	}
}

function predict () {
	for (let i = 0; i < Y.length; i++) {
		console.log(perceptron.activate(X[i]));
	}
}

function plot () {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
	  	noStroke();
			let y = perceptron.activate([i / cols, j / rows]);
      let maxY = 0
      let maxProb = y[0]

      for (let k = 1; k < nclass; k++) {
        if (maxProb < y[k]) {
          maxY = k
          maxProb = y[k]
        }
      }

      maxProb = 1.3 - maxProb

      switch (maxY) {
        case 0: fill(255, maxProb * 255, maxProb * 255); break;
        case 1: fill(maxProb * 255, 255, maxProb * 255); break;
        case 2: fill(maxProb * 255, maxProb * 255, 255); break;
      }

      rect(i * resolution, j * resolution, resolution, resolution);
      // fill(255 - y * 255);
      // textAlign(CENTER, CENTER);
      // text(nf(y, 0, 2), i * resolution + resolution / 2, j * resolution + resolution / 2);
		}
	}
}

function mouseClicked () {
  if (mouseX < width && mouseY < height) {
    let normX1 = map(mouseX, 0, width, 0, 1)
    let normX2 = map(mouseY, 0, height, 0, 1)

		X.push([normX1, normX2])
    Y.push([type]);
  }
}

function swap() {
  type++;
  type = type%nclass;
}

function keyPressed () {
  if (keyCode === ENTER) {
    swap()
  } else if (keyCode === ESCAPE) {
    flag = true;
  }
}

function plotData () {
  noStroke();
  for (var i = 0; i < Y.length; i++) {

    switch (Y[i][0]) {
      case 0: fill(255, 140, 0); break;
      case 1: fill(0, 200, 0); break;
      case 2: fill(0, 0, 255); break;
    }

    let denormX = Math.floor(map(X[i][0], 0, 1, 0, width))
    let denormY = Math.floor(map(X[i][1], 0, 1, 0, height))
    stroke(255);
    ellipse(denormX, denormY, 8);
  }
  noFill();
}

function intro () {
  fill(100)
  noStroke()
  textFont('monospace')
  textSize(25)
  text("Neural Network : Multi-Class Classification", 15, 40)
  textSize(20)

  let instruction = "Tap on the Screen to Insert Data Points...         Press Enter to change the class"
  text(instruction, 15, windowHeight - 30)


  fill(100)
  textSize(15)
  text("Author : Kaustubh Olpadkar", windowWidth - 270, 40)
  noFill();
  noStroke();
}
