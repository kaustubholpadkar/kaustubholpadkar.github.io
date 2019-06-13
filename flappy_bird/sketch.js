let bgImg, birdImg, pipeBodySprite, pipePeakSprite;

let bird;
let pipes = [];

const TOTAL = 500;
const MUTATION_RATE = 0.10;

let population = [];
let savedParticles = [];

let generationCount = 0;
let speedSlider;

let start, end;

var x1 = 0;
var x2;
let scrollSpeed = 2;

function preload(){
  bgImg = loadImage("images/bg1.png");
  birdImg = loadImage("images/bird.png");
  pipeBodySprite = loadImage('images/pipe.png');
  pipePeakSprite = loadImage('images/pipe.png');
}

function setup() {
  createCanvas(640, 480);
  x2 = width;
  createDOM();
  tf.setBackend('cpu');
  pipes.push(new Pipe());

  for (let i = 0; i < TOTAL; i++) {
    population[i] = new Bird();
  }
}

function draw() {
  const cycles = speedSlider.value();

  // background(0)

  let bestB = population[0];
  for (let n = 0; n < cycles; n++) {
    clear();
    showBG();
    frameCount++;
    for (let bird of population) {
      bird.check(pipes);
      bird.look(pipes);
      bird.update();
      bird.show();

      // Get the best one
      if (bird.fitness > bestB.fitness) {
        bestB = bird;
      }
    }

    for (let i = population.length - 1; i >= 0; i--) {
      const bird = population[i];
      if (bird.dead) {
        savedParticles.push(population.splice(i, 1)[0]);
      }
    }

    if (population.length === 0) {
      pipes = [];
      pipes.push(new Pipe());
      nextGeneration();
      generationCount++;
      frameCount = 1;
    } else if (frameCount % 50 === 0) {
      pipes.push(new Pipe());
    }

    for (let i = pipes.length-1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      // if (pipes[i].hits(bird)) {
      //   console.log("HIT");
      // }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        // pipes.push(new Pipe());
      }
    }
  }
  frameCount--;
  text('generation ' + generationCount, 10, 50);

  // remove below
  // for (var i = pipes.length-1; i >= 0; i--) {
  //   pipes[i].show();
  //   pipes[i].update();
  //
  //   if (pipes[i].hits(bird)) {
  //     console.log("HIT");
  //   }
  //
  //   if (pipes[i].offscreen()) {
  //     pipes.splice(i, 1);
  //   }
  // }
  //
  // bird.update();
  // bird.show();
  //
  // if (frameCount % 50 == 0) {
  //   pipes.push(new Pipe());
  // }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}

function createDOM() {
  createElement("br");
  createElement("span", "Speed: ");
  speedSlider = createSlider(1, 10, 1);
}

function showBG() {
  // push();
  image(bgImg, x1, 0, width, height);
  image(bgImg, x2, 0, width, height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  console.log(x1, x2);

  if (x1 < -width){
    x1 = width-2;
  }
  if (x2 < -width){
    x2 = width-2;
  }
  // pop();
}