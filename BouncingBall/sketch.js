const TOTAL = 100;
const MUTATION_RATE = 0.1;

let population = [];
let savedParticles = [];

let generationCount = 0;
let speedSlider;


let pdirection = null;
let ballA = null;

function createDOM() {
  createElement("br");
  createElement("span", "Speed: ");
  speedSlider = createSlider(1, 10, 1);
}

function setup() {
  pdirection = RIGHT;
  createCanvas(300, 300);
  tf.setBackend('cpu');
  smooth();
  frameRate(190);
  keyCode = RIGHT;

  createDOM();

  ballA = new Ball();

  for (let i = 0; i < TOTAL; i++) {
    population[i] = new Paddle();
  }

}

function draw() {

  const cycles = speedSlider.value();

  background(67, 0, 67);

  let bestB = population[0];
  for (let n = 0; n < cycles; n++) {

    ballA.bounce(population);
    ballA.move();
    ballA.show();

    for (let paddle of population) {
      paddle.move();
      paddle.check(ballA);
      paddle.look(ballA);
      paddle.show();

      // Get the best one
      if (paddle.fitness > bestB.fitness) {
        bestB = paddle;
      }
    }

    // bestB.show();

    for (let i = population.length - 1; i >= 0; i--) {
      const ball = population[i];
      if (ball.dead) {
        savedParticles.push(population.splice(i, 1)[0]);
      }
    }

    if (population.length === 0) {
      nextGeneration();
      ballA = new Ball();
      generationCount++;
    }

    fill(255);
    text('generation ' + generationCount, 10, 50);

  }

}