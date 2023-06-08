const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 1;

//creating the background
const background = new Sprite({
  position : {
    x:0,
    y:0
  },
  imgSrc : './img/background.png' 
})

//creating a new instance of player using the Sprite class
const player = new Fighters({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  }
});
player.draw()

//creatign the eneyme 
const enemy = new Fighters({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 50,
    y: 0
  },
  color: "blue"
});
enemy.draw()
console.log(player);

//defing the key for the max proper movements of players
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

//collitoin
function rectagularCollition({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
    && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
    && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
    && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

//determing the winner
function determineWinner({ player, enemy, timeId }) {
  clearTimeout(timeId)
  document.querySelector('#displayText').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Tied'
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player wins'
  } else if (enemy.health > player.health) {
    document.querySelector('#displayText').innerHTML = 'Enemy wins'
  }
}

//timer function
let timer = 60;
let timeId
function decreaseTimer() {
  if (timer > 0) {
    timeId =  setTimeout(decreaseTimer, 1000);
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timeId });
  }
}
decreaseTimer()

// responsible for the rendering of animation frame by frame
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  enemy.update();

  //player movement
  player.velocity.x = 0
  if (keys.a.pressed && player.lastKey === 'a')
    player.velocity.x = -5;
  else if (keys.d.pressed && player.lastKey === 'd')
    player.velocity.x = 5

  //enemy movement
  enemy.velocity.x = 0
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft')
    enemy.velocity.x = -5;
  else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight')
    enemy.velocity.x = 5

  //detect collition
  if (rectagularCollition({
    rectangle1: player,
    rectangle2: enemy
  })
    && player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector('#enemyHealth ').style.width = enemy.health + '%'
    console.log('player');
  }

  if (rectagularCollition({
    rectangle1: enemy,
    rectangle2: player
  })
    && enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector('#playerHealth ').style.width = player.health + '%'
    console.log('enemy');
  }

  //ending the game based on the playesr health
  if(player.health <= 0 || enemy.health <= 0){
    determineWinner({ player, enemy, timeId });
  }
}
animate()

//finding the events of the players
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd'
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a'
      break;
    case 'w':
      player.velocity.y = -17
      break;
    case ' ':
      player.attack()
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight'
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft'
      break;
    case 'ArrowUp':
      enemy.velocity.y = -17
      break;
    case 'ArrowDown':
      enemy.isAttacking = true
      break;
    default:
      break;
  }
})
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    default:
      break;
  }
})