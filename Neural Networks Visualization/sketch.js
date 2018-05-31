var canvas_width, canvas_height

var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

var perceptron = new Architect.Perceptron(2, 20, 1);

var learning_rate = 0.2
var X = []
var Y = []

var rows, cols, resolution
var type = 1

function setup () {

  canvas_width = windowWidth
  canvas_height = windowHeight

  resolution = 10
  rows = canvas_height / resolution
  cols = canvas_width / resolution

  createCanvas(canvas_width, canvas_height)
	setInterval(train, 5)
}

function draw () {
  background(51)
	frameRate(30)

	// train()

	plot()
  plotData()
  intro()
}

function train () {
	for (let i = 0; i < Y.length; i++) {
		perceptron.activate(X[i])
		perceptron.propagate(learning_rate, Y[i])
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
      fill(y * 255);
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
  type = 1 - type;
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
    Y[i] == 1 ? fill(255, 0, 0) : fill(0, 0, 255);
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
  text("Neural Network : Binary Classification", 15, 40)
  textSize(20)

  let instruction = "Tap on the Screen to Insert Data Points...         Press Enter to change the class"
  text(instruction, 15, windowHeight - 30)


  fill(100)
  textSize(15)
  text("Author : Kaustubh Olpadkar", windowWidth - 270, 40)
  noFill();
  noStroke();
}
