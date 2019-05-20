class Ball {
  constructor(brain) {
    this.fitness = 0;
    this.dead = false;
    this.finished = false;
    this.pos = createVector(start.x, start.y);
    this.vel = createVector(2.0, 0.0);
    this.acc = createVector();
    this.maxspeed = 5;
    this.counter = 0;
    this.rad = 10;

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(3, 10, 1);
    }
  }

  dispose() {
    this.brain.dispose();
  }

  mutate() {
    this.brain.mutate(MUTATION_RATE);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.dead && !this.finished) {
      this.pos.add(this.vel);
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.acc.set(0, 0);
      this.counter++;
      this.bounds();
    }
  }

  check(wall) {
    if (!this.dead) {
      if (this.pos.y - this.rad <= wall.pos && (this.pos.x < wall.break || this.pos.x > wall.break + wall.gap)) {
        this.dead = true;
      } else {
        this.fitness++;
        this.counter = 0;
      }
    }
  }

  calculateFitness() {
    this.fitness = this.fitness + 0;
  }

  bounds() {
    if (this.pos.x > width - this.rad || this.pos.x < this.rad || this.pos.y > height || this.pos.y < 0) {
      this.dead = true;
    }
  }

  show() {
    push();
    fill("#ffd180");
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
    pop();
  }

  look(wall) {
    const inputs = [
        map(this.pos.x, 0, width, 0, 1),
        map(wall.break, 0, width - wall.gap, 0, 1),
        map(wall.break + wall.gap, wall.gap, width, 0, 1)
    ];
    const output = this.brain.predict(inputs);

    if (output[0] >= 0.5) {
      this.vel.x = +2;
    } else {
      this.vel.x = -2;
    }
  }

}
