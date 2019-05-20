function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


class Wall {
    constructor(gap=100, speed=2) {
        this.gap = gap;
        this.vel = speed;
        this.passed = false;
        this.pos = 0;
        this.break = getRandomInt(width - this.gap);
    }

    update() {
        if (!this.passed) {
            this.pos += this.vel;
            this.bounds();
        }

    }

    bounds() {
        if (this.pos > height) {
            this.passed = true;
        }
    }

    show() {
        push();
        fill(150, 100);
        rect(0, this.pos, this.break, 3);
        rect(this.break + this.gap, this.pos, width - this.break - this.gap, 3);
        pop();
    }
}
