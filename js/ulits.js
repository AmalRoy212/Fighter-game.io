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