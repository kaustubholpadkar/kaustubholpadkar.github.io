// import { Bodies, Body, Composite, Composites } from 'matter-js';


class CartPole{
  cart = null;
  pole = null;

  constructor(brain) {
    this.body = null;

    this.score = 0;
    this.fitnesss = 0;
    this.dead = false;
    this.engine = Engine.create();
    this.world = this.engine.world;
    Engine.run(this.engine);
    let options = { isStatic: true };
    ground = Bodies.rectangle(200, height, width, 100, options);
    World.add(this.world, ground);

    this.initParts();

    if (brain) {
        this.brain = brain.copy();
    } else {
        this.brain = new NeuralNetwork(4, 10, 1);
    }

    this.dir = false;

    this.applyForce(INITIAL_FORCE);
  }

    dispose() {
        this.brain.dispose();
    }

    mutate() {
        this.brain.mutate(MUTATION_RATE);
    }

  initParts() {
    this.body = Composite.create();
    const group = Body.nextGroup(true);
    const initialPosition = this.getInitialPosition();
    this.cart = Bodies.rectangle(
      initialPosition.x,
      initialPosition.y,
      CART_WIDTH,
      CART_HEIGHT,
      { collisionFilter: { group } }
    );
    this.pole = Bodies.rectangle(
      initialPosition.x,
      initialPosition.y - POLE_HEIGHT / 2,
      POLE_WIDTH,
      POLE_HEIGHT,
      { collisionFilter: { group } }
    );
    Composite.add(this.body, [this.cart, this.pole]);
    Composites.chain(this.body, 0, 0, 0, 0.5, {stiffness: 1});
    World.add(this.world, this.body);
  }

  updateEngine () {
      Engine.update(this.engine);
  }

  getInitialPosition() {
    const offsetX = CANVAS_WIDTH / 2;
    return {
      x: offsetX,
      y: CANVAS_HEIGHT - GROUND_HEIGHT - CART_HEIGHT / 2
    };
  }

  getState() {
    return [
      parseInt(this.cart.position.x - this.getInitialPosition().x, 0) / (CANVAS_WIDTH / 2),
      this.cart.velocity.x,
      this.pole.angle / Math.PI,
      this.pole.angularSpeed
    ];
  }

  getStateJSON() {
    const state = this.getState();
    return {
      cartPosition: state[0],
      cartSpeed: state[1],
      poleAngle: state[2],
      poleAngularSpeed: state[3]
    };
  }

  check() {
    const state = this.getStateJSON();
    if (Math.abs(state.cartPosition) > 0.95) {
      this.dead = true;
    } else if (Math.abs(state.poleAngle) >= 0.2) {
      this.dead = true;
      Engine.clear(this.engine);
    } else {
      this.score++;
      this.fitnesss++;
    }
  }

  look() {
      let state = this.getState();
      state[1] /= 20.0;
      const inputs = state;
      const output = this.brain.predict(inputs);

      this.dir = output[0] >= 0.5;

      // this.dir = Math.random() >= 0.5;
  }

  move () {
    if (this.dir) {
        this.applyForce(BASE_FORCE)
    } else {
        this.applyForce(-BASE_FORCE)
    }
  }

  applyForce(forceX) {
    const obj = this.cart;
    Body.applyForce(obj, obj.position, { x: forceX, y: 0 });
  }

  calculateFitness() {
      this.fitness = this.score;
  }

  show() {


    // push();

    // rotate(angle);


    // fill(127);
    // rect(0, 0, this.w, this.h);


    var pos = this.cart.position;
    var angle = this.cart.angle;
    push();
    // console.log(pos)
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    rect(0, 0, CART_WIDTH, CART_HEIGHT);
    pop();

    pos = this.pole.position;
    angle = this.pole.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(150);
    rect(-POLE_WIDTH/2, -CART_HEIGHT - CART_HEIGHT, POLE_WIDTH, POLE_HEIGHT);
    pop();
  }
}
