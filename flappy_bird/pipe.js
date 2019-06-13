// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Pipe() {
  this.spacing = 175;
  this.top = random(height / 6, 3 / 4 * height);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 80;
  this.speed = 6;

  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    push();
    // fill(255);
    // if (this.highlight) {
    //   fill(255, 0, 0);
    // }
    // rect(this.x, 0, this.w, this.top);
    // rect(this.x, height-this.bottom, this.w, this.bottom);

    // image(pipeBodySprite, this.x, 0, this.w, this.top);
    // image(pipeBodySprite, this.x, height-this.bottom, this.w, this.bottom);
    if (this.top > pipeBodySprite.height) {
      image(pipeBodySprite, this.x, this.top - 2 * pipeBodySprite.height, this.w, pipeBodySprite.height);
      image(pipeBodySprite, this.x, this.top - pipeBodySprite.height, this.w, pipeBodySprite.height);
    } else {
      image(pipeBodySprite, this.x, this.top - pipeBodySprite.height, this.w, pipeBodySprite.height);
    }

    image(pipeBodySprite, this.x, height-this.bottom, this.w, pipeBodySprite.height);
    pop();
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}
