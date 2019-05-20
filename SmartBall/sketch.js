const TOTAL = 100;
const MUTATION_RATE = 0.1;

let wall;

let population = [];
let savedParticles = [];

let generationCount = 0;
let speedSlider;

let start, end;

function setup() {
  createCanvas(600, 600);

  tf.setBackend('cpu');

  start = createVector((int)(width/2), height-20);

  wall = new Wall();

  for (let i = 0; i < TOTAL; i++) {
    population[i] = new Ball();
  }

  createDOM();
}

function draw() {
  const cycles = speedSlider.value();

  background("#cfd8dc");

  let bestB = population[0];
  for (let n = 0; n < cycles; n++) {
    if (wall.passed) {
      wall = new Wall();
    }

    wall.update();
    wall.show();

    for (let ball of population) {
      ball.check(wall);
      ball.look(wall);
      ball.update();
      ball.show();

      // Get the best one
      if (ball.fitness > bestB.fitness) {
        bestB = ball;
      }
    }

    for (let i = population.length - 1; i >= 0; i--) {
      const ball = population[i];
      if (ball.dead) {
        savedParticles.push(population.splice(i, 1)[0]);
      }
    }

    if (population.length === 0) {
      nextGeneration();
      wall = new Wall();
      generationCount++;
    }

  }

  text('generation ' + generationCount, 10, 50);
}

function createDOM() {
  createElement("br");
  createElement("span", "Speed: ");
  speedSlider = createSlider(1, 10, 1);
}
