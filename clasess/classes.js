//this is sprite class respisible for creating sprite instance and doing phisics actions
class Sprite {
  constructor({ position, imgSrc }) {
    this.position = position;
    this.width = 50
    this.height = 150;
    this.image = new Image();
    this.image.src = imgSrc
  }

  //postioning the sprite
  draw() {
    c.drawImage(this.image,this.position.x,this.position.y);

  }

  update() {
    this.draw();
  }
}

//the players class
class Fighters {
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      height: 50,
      width: 100
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
  }

  //postioning the sprite
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    if (player, this.isAttacking) {
      //for wepon sprite
      c.fillStyle = 'green'
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }

  }

  update() {
    this.draw();

    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y;

    //cheking the player is on gorund or not
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else
      this.velocity.y += gravity;
  }

  //attacking
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100)
  }
}