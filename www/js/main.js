// Main variables
let lives = 3;
let score = 0;
let paused = false;
let $ballX = $('.ballX');
let $ballY = $('.ballY');
let $paddle = $('.paddle');
let paddleStep = 80;
let currentKey;

// Read keys
$(window).keydown(function(e){
  if(e.which === 37){ currentKey = 'left'; }
  if(e.which === 39){ currentKey = 'right'; }
  if(e.which === 13){ playAgain(); }
});

$(window).keyup(function(){
  currentKey = '';
});

// Game loop
setInterval(function(){

  // paddle movement
  let paddleX = $paddle.position().left;
  if(currentKey == 'left' && paddleX > 0){
    let step = Math.min(paddleStep, paddleX)
    $paddle.animate({left : paddleX - step}, 100);
  }
  if(currentKey == 'right' && paddleX < $(window).width() - $paddle.outerWidth()){
    let step = Math.min(paddleStep, $(window).width() - $paddle.outerWidth() - paddleX)
    $paddle.animate({left : paddleX + step}, 100);
  }

  // Check for hits and misses
  let x = $ballX.position().left;
  let y = $ballY.position().top;
  if(y >= $(window).height() - $ballY.height() - 20){
    let paddleX1 = $paddle.position().left;
    let paddleX2 = paddleX1 + $paddle.outerWidth();
    if(paddleX1 - $ballY.width() <= x && paddleX2 + $ballY.width() >= x){
      // the player caught the ball with the paddle
      score += 10;
      $('.score span').text((score + '').padStart(5, '0'));
    }
    else if(!paused) {
      // the player missed
      paused = true;
      $ballX.addClass('ball-paused');
      $ballY.addClass('ball-paused');
      lives--;
      $('.lives span').text(lives);
      // if there are lives left continue after a second
      if(lives > 0){
        setTimeout(function(){
          restartBallAnimation();
          paused = false;
        }, 1000);
      }
      else {
        $('.game-over').fadeIn(1000);
      }
    }
  }

}, 100);

// Restart ball animation from top left
// by cloning the ball
function restartBallAnimation(){
  let $oldBall = $ballX;
  $ballX = $ballX.clone().appendTo('body');
  $oldBall.remove();
  $ballY = $('.ballY');
  $('.ball-paused').removeClass('ball-paused');
}

// Play again - reset variables and play again
function playAgain(){
  lives = 3;
  score = 0;
  $('.score span').text('00000');
  $('.lives span').text(3);
  paused = false;
  $('.game-over').hide();
  restartBallAnimation();
}
