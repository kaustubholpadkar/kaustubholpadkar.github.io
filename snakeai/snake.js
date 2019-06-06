// SNAKE OBJECT

// Pick a location for food to appear


class Snake {

    score = 1;
    lifeLeft = 200;  //amount of moves the snake can make before it dies
    lifetime = 0;  //amount of time the snake has been alive
    xVel = null;
    yVel = null;
    foodItterate = 0;  //itterator to run through the foodlist (used for replay)

    fitness = 0;

    dead = false;
    replay = false;  //if this snake is a replay of best snake

    vision = [];  //snakes vision
    decision = [];  //snakes decision

    head = null;

    body = [];  //snakes body
    foodList = [];  //list of food positions (used to replay the best snake)

    food = null;
    brain = null;
    // hidden_layers;
    seeVision=false;

    constructor() {
        this.head = createVector(800,height/2);
        this.food = new Food();
        this.body = [];
        if(!humanPlaying) {
            this.vision = [];
            this.decision = [];
            this.foodList = [];
            this.foodList.push(this.food.clone());
            // console.log(24,hidden_nodes,4, hidden_layers);
            this.brain = new NeuralNet(24,hidden_nodes,4, hidden_layers);
            this.body.push(createVector(800,(height/2)+SIZE));
            this.body.push(createVector(800,(height/2)+(2*SIZE)));
            this.score+=2;
        }
    }

    // constructor(foods) {  //this constructor passes in a list of food positions so that a replay can replay the best snake
    //     replay = true;
    //     vision = new float[24];
    //     decision = new float[4];
    //     body = new ArrayList<PVector>();
    //     foodList = new ArrayList<Food>(foods.size());
    //     for(Food f: foods) {  //clone all the food positions in the foodlist
    //         foodList.add(f.clone());
    //     }
    //     food = foodList.get(foodItterate);
    //     foodItterate++;
    //     head = new PVector(800,height/2);
    //     body.add(new PVector(800,(height/2)+SIZE));
    //     body.add(new PVector(800,(height/2)+(2*SIZE)));
    //     score+=2;
    // }

    bodyCollide(x, y) {  //check if a position collides with the snakes body
        for(let i = 0; i < this.body.length; i++) {
            if(x === this.body[i].x && y === this.body[i].y)  {
                return true;
            }
        }
        return false;
    }

    foodCollide(x, y) {  //check if a position collides with the food
        return x === this.food.pos.x && y === this.food.pos.y;

    }

    wallCollide(x, y) {  //check if a position collides with the wall
        return x >= width - (SIZE) || x < 400 + SIZE || y >= height - (SIZE) || y < SIZE;
    }

    show() {  //show the snake
        push();
        this.food.show();
        stroke(0);
        fill(255);
        for(let i = 0; i < this.body.length; i++) {
            rect(this.body[i].x, this.body[i].y, SIZE, SIZE);
        }
        if(this.dead) {
            fill(150);
        } else {
            fill(255);
        }
        rect(this.head.x, this.head.y,SIZE,SIZE);
        pop();
    }

    move() {  //move the snake
        if(!this.dead){
            if(!humanPlaying && !modelLoaded) {
                this.lifetime++;
                this.lifeLeft--;
            }
            if(this.foodCollide(this.head.x, this.head.y)) {
                this.eat();
            }
            this.shiftBody();
            if(this.wallCollide(this.head.x, this.head.y)) {
                this.dead = true;
            } else if(this.bodyCollide(this.head.x, this.head.y)) {
                this.dead = true;
            } else if(this.lifeLeft <= 0 && !humanPlaying) {
                this.dead = true;
            }
        }
    }

    eat() {  //eat food
        let len = this.body.length - 1;
        this.score++;
        if(!humanPlaying && !modelLoaded) {
            if(this.lifeLeft < 500) {
                if(this.lifeLeft > 400) {
                    this.lifeLeft = 500;
                } else {
                    this.lifeLeft+=100;
                }
            }
        }
        if(len >= 0) {
            this.body.push(createVector(this.body[len].x, this.body[len].y));
        } else {
            this.body.push(createVector(this.head.x, this.head.y));
        }

        if(!this.replay) {
            this.food = new Food();
            while(this.bodyCollide(this.food.pos.x, this.food.pos.y)) {
                this.food = new Food();
            }
            if(!humanPlaying) {
                this.foodList.push(this.food);
            }
        } else {  //if the snake is a replay, then we dont want to create new random foods, we want to see the positions the best snake had to collect
            this.food = this.foodList[this.foodItterate];
            this.foodItterate++;
        }
    }

    shiftBody() {  //shift the body to follow the head
        let tempx = this.head.x;
        let tempy = this.head.y;
        this.head.x += this.xVel;
        this.head.y += this.yVel;
        let temp2x;
        let temp2y;
        for(let i = 0; i < this.body.length; i++) {
            temp2x = this.body[i].x;
            temp2y = this.body[i].y;
            this.body[i].x = tempx;
            this.body[i].y = tempy;
            tempx = temp2x;
            tempy = temp2y;
        }
    }

    cloneForReplay() {  //clone a version of the snake that will be used for a replay
        let clone = new Snake(this.foodList);
        clone.brain = this.brain.clone();
        return clone;
    }

    clone() {  //clone the snake
        let clone = new Snake(hidden_layers);
        clone.brain = this.brain.clone();
        return clone;
    }

    crossover(parent) {  //crossover the snake with another snake
        let child = new Snake(hidden_layers);
        child.brain = this.brain.crossover(parent.brain);
        return child;
    }

    mutate() {  //mutate the snakes brain
        this.brain.mutate(mutationRate);
    }

    calculateFitness() {  //calculate the fitness of the snake
        if(this.score < 10) {
            this.fitness = floor(this.lifetime * this.lifetime) * pow(2,this.score);
        } else {
            this.fitness = floor(this.lifetime * this.lifetime);
            this.fitness *= pow(2,10);
            this.fitness *= (this.score-9);
        }
    }

    look() {  //look in all 8 directions and check for food, body and wall
        this.vision = [];
        let temp = this.lookInDirection(createVector(-SIZE,0));
        this.vision[0] = temp[0];
        this.vision[1] = temp[1];
        this.vision[2] = temp[2];
        temp = this.lookInDirection(createVector(-SIZE,-SIZE));
        this.vision[3] = temp[0];
        this.vision[4] = temp[1];
        this.vision[5] = temp[2];
        temp = this.lookInDirection(createVector(0,-SIZE));
        this.vision[6] = temp[0];
        this.vision[7] = temp[1];
        this.vision[8] = temp[2];
        temp = this.lookInDirection(createVector(SIZE,-SIZE));
        this.vision[9] = temp[0];
        this.vision[10] = temp[1];
        this.vision[11] = temp[2];
        temp = this.lookInDirection(createVector(SIZE,0));
        this.vision[12] = temp[0];
        this.vision[13] = temp[1];
        this.vision[14] = temp[2];
        temp = this.lookInDirection(createVector(SIZE,SIZE));
        this.vision[15] = temp[0];
        this.vision[16] = temp[1];
        this.vision[17] = temp[2];
        temp = this.lookInDirection(createVector(0,SIZE));
        this.vision[18] = temp[0];
        this.vision[19] = temp[1];
        this.vision[20] = temp[2];
        temp = this.lookInDirection(createVector(-SIZE,SIZE));
        this.vision[21] = temp[0];
        this.vision[22] = temp[1];
        this.vision[23] = temp[2];
    }

    lookInDirection(direction) {  //look in a direction and check for food, body and wall
        let look = [0, 0, 0];
        let pos = createVector(this.head.x, this.head.y);
        let distance = 0;
        let foodFound = false;
        let bodyFound = false;
        pos.add(direction);
        distance +=1;
        while (!this.wallCollide(pos.x,pos.y)) {
            if(!foodFound && this.foodCollide(pos.x,pos.y)) {
                foodFound = true;
                look[0] = 1;
            }
            if(!bodyFound && this.bodyCollide(pos.x,pos.y)) {
                bodyFound = true;
                look[1] = 1;
            }
            if(this.replay && this.seeVision) {
                stroke(0,255,0);
                point(pos.x,pos.y);
                if(foodFound) {
                    noStroke();
                    fill(255,255,51);
                    ellipseMode(CENTER);
                    ellipse(pos.x,pos.y,5,5);
                }
                if(bodyFound) {
                    noStroke();
                    fill(102,0,102);
                    ellipseMode(CENTER);
                    ellipse(pos.x,pos.y,5,5);
                }
            }
            pos.add(direction);
            distance +=1;
        }
        if(this.replay && this.seeVision) {
            noStroke();
            fill(0,255,0);
            ellipseMode(CENTER);
            ellipse(pos.x,pos.y,5,5);
        }
        look[2] = 1/distance;
        return look;
    }

    think() {  //think about what direction to move
        // console.log(this.vision)
        // console.log(this.brain)
        let decision = this.brain.output(this.vision);
        this.decision = decision;
        // console.log(decision);
        let maxIndex = 0;
        let max = 0;
        for(let i = 0; i < decision.length; i++) {

            if(decision[i] > max) {
                max = decision[i];
                maxIndex = i;
            }
        }

        switch(maxIndex) {
            case 0:
                this.moveUp();
                break;
            case 1:
                this.moveDown();
                break;
            case 2:
                this.moveLeft();
                break;
            case 3:
                this.moveRight();
                break;
        }
    }

    moveUp() {
        if(this.yVel!==SIZE) {
            this.xVel = 0; this.yVel = -SIZE;
        }
    }

    moveDown() {
        if(this.yVel!==-SIZE) {
            this.xVel = 0; this.yVel = SIZE;
        }
    }

    moveLeft() {
        if(this.xVel!==SIZE) {
            this.xVel = -SIZE; this.yVel = 0;
        }
    }

    moveRight() {
        if(this.xVel!==-SIZE) {
            this.xVel = SIZE; this.yVel = 0;
        }
    }
}