// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Bird(brain) {
  this.y = height/2;
  this.x = 64;

  this.gravity = 0.7;
  this.lift = -12;
  this.velocity = 0;
  this.dead = false;
  this.fitness = 0.0;
  this.sprite = createSprite(this.x, this.y, 32, 32);
  this.sprite.addImage(birdImg);

  if (brain) {
    this.brain = brain.copy();
  } else {
    this.brain = new NeuralNetwork(5, 10, 2);
  }
  
  this.show = function() {
    push();
    // fill(255);
    // ellipse(this.x, this.y, 32, 32);
    drawSprite(this.sprite);
    pop();
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.dead = true;
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
      this.dead = true;
    }

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;
  }

  this.check =function (pipes) {
    // let pipe = this.findNearestPipe(pipes);
    for (let i=0; i < pipes.length; i++) {
      let pipe = pipes[i];
      if (pipe && pipe.hits(this)) {
        this.dead = true;
      }
    }

    this.fitness++;
  }

  this.calculateFitness = function() {
    this.fitness = this.fitness + 0;
  }

  this.look = function(pipes) {
    let pipe = this.findNearestPipe(pipes);
    if (pipe == null) {
      return
    }
    const inputs = [
      map(this.y, 0, height, 0, 1),
      map(pipe.x, 0, width, 0, 1),
      map(pipe.top, 0, height, 0, 1),
      map(pipe.bottom, 0, height, 0, 1),
      this.velocity / 10.
    ];
    const output = this.brain.predict(inputs);

    if (output[0] >= 0.5) {
      this.up();
    }
  }

  this.findNearestPipe = function (pipes) {
    let closestPipe = null;
    let closestDist = Infinity;
    for (let i=0; i<pipes.length; i++) {
      let d = pipes[i].x - this.x;
      if (d < closestDist && d > 0) {
        closestPipe =pipes[i];
        closestDist = d;
      }
    }
    return closestPipe;
  }

  this.dispose = function() {
    this.brain.dispose();
  }

  this.mutate = function() {
    this.brain.mutate(MUTATION_RATE);
  }
}
