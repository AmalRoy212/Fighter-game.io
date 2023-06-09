//this is sprite class respisible for creating sprite instance and doing phisics actions
class Sprite {
  constructor({ position, imgSrc, scale = 1, frameMax = 1, offset = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 50
    this.height = 150;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.frameMax = frameMax;
    this.frameCurrent = 0;
    this.frameElapsed = 0;
    this.frameHold = 10;
    this.offset = offset;
  }

  //postioning the sprite
  draw() {
    c.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrame() {
    this.frameElapsed++;
    if (this.frameElapsed % this.frameHold === 0) {
      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++;
      } else {
        this.frameCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrame();
  }
}

//the players class
class Fighters extends Sprite {
  constructor({ position, velocity, color = "red", imgSrc, scale = 1, frameMax = 1, offset = { x: 0, y: 0 }, sprites }) {
    super({
      position,
      imgSrc,
      scale,
      frameMax,
      offset
    });

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
    this.frameCurrent = 0;
    this.frameElapsed = 0;
    this.frameHold = 10;
    this.sprites = sprites

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imgSrc;
    }
  }

  update() {
    this.draw();

    this.animateFrame();

    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y;

    //cheking the player is on gorund or not (gravity function)
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else this.velocity.y += gravity;
  }

  //attacking
  attack() {
    this.switchSprites('attack1'); 
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100)
  }

  //switching sprites 
  switchSprites(sprite) {
    if(this.image === this.sprites.attack1.image && this.frameCurrent < this.sprites.attack1.frameMax - 1) return
    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image){
          this.image = this.sprites.idle.image;
          player.frameMax = player.sprites.idle.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case 'run':
        if (this.image !== this.sprites.run.image){
          this.image = this.sprites.run.image;
          player.frameMax = player.sprites.run.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          player.image = player.sprites.jump.image;
          player.frameMax = player.sprites.jump.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          player.image = player.sprites.fall.image;
          player.frameMax = player.sprites.fall.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          player.image = player.sprites.attack1.image;
          player.frameMax = player.sprites.attack1.frameMax;
          this.frameCurrent = 0;
        }
        break;
      default:
        break;
    }
  }
}