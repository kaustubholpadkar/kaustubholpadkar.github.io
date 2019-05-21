class Paddle
{
    constructor(brain) {
        this.px = 150;
        this.width = 70;
        this.score = 0;
        this.fitness = 0;
        this.dead = false;
        this.dir = true; // right

        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(7, 15, 1);
        }
    }

    dispose() {
        this.brain.dispose();
    }

    mutate() {
        this.brain.mutate(MUTATION_RATE);
    }

    check(ball) {
        if(ball.by + 10 === 280) {
            if (ball.bx >= this.px && ball.bx <= this.px + this.width) {
                this.score++;
                this.fitness++;
            } else {
                this.dead = true;
            }
        }
    }

    look(ball) {
        const inputs = [
            map(ball.bx, 0, width, 0, 1),
            map(ball.by, 0, height, 0, 1),
            ball.right ? 1.0 : 0.0,
            ball.down ? 1.0 : 0.0,
            map(this.px, 0, width-this.width, 0, 1),
            map(this.px + this.width, 0, width, 0, 1),
            this.dir ? 1.0 : 0.0,
        ];
        const output = this.brain.predict(inputs);

        this.dir = output[0] >= 0.5;
    }

    calculateFitness() {
        this.fitness = this.score;
    }

    move()
    {
        if (this.dir)
        {
            pdirection = RIGHT;
            this.px++;
            if(this.px>width - this.width)
            {
                this.px = width - this.width;
            }
        }
        else
        {
            pdirection = LEFT;
            this.px--;
            if(this.px<0)
            {
                this.px = 0;
            }
        }
    }

    show()
    {
        push();
        fill(6,206,209, 200);
        rect(this.px,280,this.width,15);
        pop();
    }
}