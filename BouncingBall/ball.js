class Ball
{

  constructor()
  {
    this.bx = 20;
    this.by = 50;
    this.right = true;
    this.down = true;
  }

  move()
  {
    if (this.right === true)
    {
      this.bx++;
    }
    else
    {
      this.bx--;
    }
    if (this.down === true)
    {
      this.by++;
    }
    else
    {
      this.by--;
    }
  }

  bounce(paddles)
  {
    if (this.bx>295) //boolean
    {
      this.right = false;
    }
    if (this.bx<5)
    {
      this.right = true;
    }
    if (this.by<10)
    {
      this.down = true;
    }
    // if(get(this.bx, this.by + 10) === color(6,206,209))
    // {
    //   this.down = false;
    // }
    for (let i=0; i<paddles.length; i++) {
      let paddle = paddles[0];
      if(this.by + 10 === 280 && this.bx >= paddle.px && this.bx <= paddle.px + paddle.width) {
        this.down = false;
        break;
      }
    }

    if(this.by>300)
    {
      // fill(255,0,0);
      // ellipse(50,50,75,75);
      // fill(0,0,0);
      // ellipse(40,40,5,15);
      // ellipse(65,40,5,15);
      // rect(35,65,35,2);

      this.bx = 20;
      this.by = 50;
      this.right = true;
      this.down = true;
    }
  }

  show()
  {
    push();
    fill(255, 255, 255);
    ellipse(this.bx, this.by, 20, 20);
    pop();
  }
}
