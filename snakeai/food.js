class Food {

    constructor() {
        this.x = 400 + SIZE + floor(random(38))*SIZE;
        this.y = SIZE + floor(random(38))*SIZE;
        this.pos = createVector(this.x, this.y);
    }

    show() {
        stroke(0);
        fill(255,0,100);
        rect(this.pos.x, this.pos.y,SIZE,SIZE);
    }

    clone() {
        let clone = new Food();
        clone.pos.x = this.pos.x;
        clone.pos.y = this.pos.y;

        return clone;
    }
}