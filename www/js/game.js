function loadGame() {

  // Main variables



  let lives;
  let score;
  let paused;
  const bricks = [];
  const keysPressed = {};
  let initialPaddleSpeed = 0;
  let initialBallSpeed = 0;
  const paddle = {};
  let dir;
  const ball = {};
  let gameBorders = loadGameBorders();

  // Group 6 variables
  let paddleHits = 0;
  let bricksKilled = 0;

  initialBallSpeed= gameBorders.height/3;
  initialPaddleSpeed= gameBorders.width/2;
  //let ballSpinn = true;
  //let rotateBallInterval;
  

  // Setup key listeners before starting the first game
  setupKeyListeners();
  startNewGame();

  /*---Scroll game window to right place when start game---*/
  setTimeout(() => {
    scrollTo(0, $('.game').position().top)
  }, 100);


  // Reset starting variables etc
  function startNewGame() {
    lives = 3;
    score = 0;
    paused = true;

    resetBall();
    resetPaddle();
    spawnBricks();

    updateInterface();
    startInterval();

    ballFaster();
    changePaddleSize();

  }

  function changePaddleSize(){
    //Paddel change size 
    setInterval(function () {

      if (paused == false && paddle.width > gameBorders.width * 0.02) {
        paddle.width -= paddle.width / 100;
        paddle.$.css('width', paddle.width);
      }


    }, 2000);
  }
  function ballFaster(){
    //makes ball faster
    setInterval(function () {

      if (paused == false) {
        ball.speed += 10;
      }
    
    }, 4000);

  }

  function updateGame(deltaTime) {
    if (paused) { return; }

    movePaddle(deltaTime);
    moveBall(deltaTime);
  }

  function movePaddle(deltaTime) {
    const direction = calculatePaddleDirection();
    const velocity = direction * paddle.speed * deltaTime;
    paddle.left += velocity;
    if (paddle.left < gameBorders.left) { paddle.left = 0; }
    if (paddle.left + paddle.width > gameBorders.width) { paddle.left = gameBorders.width - paddle.width; }
    paddle.$.css('left', paddle.left);
  }

  function moveBall(deltaTime) {
    ball.left += ball.direction.x * ball.speed * deltaTime;
    ball.top += ball.direction.y * ball.speed * deltaTime;

    if (!collisionDetectBallAndGame()) { return; }
    collisionDetectBallAndBricks();
    collisionDetectBallAndPaddle();

    ball.$.css('left', ball.left);
    ball.$.css('top', ball.top);

    
  }
  

  function calculatePaddleDirection() {
    let movementVelocity = 0;
    if (keysPressed.left) { --movementVelocity; }
    else if (keysPressed.right) { ++movementVelocity; }
    return movementVelocity;
  }

  function loseLife() {
    --lives;
    paused = true;
    updateInterface();
    resetBall();
  }

  function collisionDetectBallAndGame() {
    if (ball.left < gameBorders.left) {
      ball.left = 0;
      ball.direction.x *= -1;
    } else if (ball.left + ball.width > gameBorders.width) {
      ball.left = gameBorders.width - ball.width;
      ball.direction.x *= -1;
    }

    if (ball.top < gameBorders.top) {
      ball.top = 0;
      ball.direction.y *= -1;
    } else if (ball.top + ball.height > gameBorders.height) {
      loseLife();
      return false;
    }
    return true;
  }

  function collisionDetectBallAndPaddle() {
    if (!isRectAOutsideRectB(ball, paddle)) {
      ball.direction.y *= -1;
      ball.top = paddle.top - ball.height;

      //Score getting biggger and bigger
      score += 5 + Math.round(paddleHits / 2);
      paddleHits++;
      
      dir = changeDirection();

      if (dir === "left") {
        ball.direction.x = -1;
        ball.$.addClass('fast');
      }

      else if (dir === "right") {
        ball.direction.x = 1;
        ball.$.addClass('fast');
      }

      else if (dir === "center") {
        ball.direction.x = 0;
        ball.$.removeClass('fast');
      }

      else if (dir === "middleRight") {
        ball.direction.x = 0.5;
        ball.$.removeClass('fast');
      }

      else if (dir === "middleLeft") {
        ball.direction.x = - 0.5;
        ball.$.removeClass('fast');
      }

      changeDirection();
      updateInterface();

      // rotateBall();
      ball.$.addClass('rotate');
      const rollSound = new Audio("/audio/BONGO1.WAV");
      rollSound.play();
    }
  }

  function changeDirection() {
    let paddleMiddleX = paddle.left + paddle.width / 2;
    let ballMiddleX = ball.left + ball.width / 2;
    let relativePosition = (ballMiddleX - paddleMiddleX) / (paddle.width / 2);
    let zone = 'center';
    if (relativePosition < -0.7) { zone = "left"; }
    else if (relativePosition > 0.7) { zone = "right"; }
    else if (relativePosition > -0.7 && relativePosition < -0.2) { zone = "middleLeft"; }
    else if (relativePosition < 0.7 && relativePosition > 0.2) { zone = "middleRight"; }
    return zone;
  }
 
  function collisionDetectBallAndBricks() {
    for (let i = bricks.length - 1; i >= 0; --i) {
      const brick = bricks[i];
      if (!isRectAOutsideRectB(ball, brick)) {
        if (getHorizontalOrVerticalDirection(brick, ball) == 'horizontal') {
          // If it bounced on the side of the brick
          ball.direction.x *= -1;
          console.log('changed x direction to', ball.direction.x)
        } else {
          // If it bounced above/below a brick
          // if(Math.random() < .5){ball.direction.y *= -1;} thomas tips//
          ball.direction.y *= -1;
          console.log('changed y direction to', ball.direction.y)
        }
        brick.$.remove();
        bricks.splice(i, 1);

        //Score getting biggger and bigger--*/
        score += 20 + bricksKilled;
        bricksKilled++;

        const rollSound = new Audio("/audio/ljud1.WAV");
        rollSound.play();

        /*Making score yellow*/
        /* $('.score span').css('color','yellow');       
      
         setInterval(function(){
           $('.score span').css('color','white');
   
         },500);*/
        /*end*/

        updateInterface();
      }
    }
    if (bricks.length == 0) {
      paused = true;
      updateInterface();
    }
  }


  // Assumes the properties: left, top, width, height
  function isRectAOutsideRectB(a, b) {
    if (a.left > b.left + b.width) return true; // to the right
    if (a.left + a.width < b.left) return true; // to the left
    if (a.top > b.top + b.height) return true; // below
    if (a.top + a.height < b.top) return true; // above
    return false;
  }

  // Does not work for rectangles, only squares
  function getHorizontalOrVerticalDirection(objA, objB) {
    return 'vertical'; // Always return 'vertical' for non-square bricks
    // Todo: fix code for rectangle bricks
    const aY = objA.top + objA.height / 2;
    const aX = objA.left + objA.width / 2;
    const bY = objB.top + objB.height / 2;
    const bX = objB.left + objB.width / 2;
    const direction = Math.abs(Math.atan2(aY - bY, aX - bX));
    return (Math.abs(direction) < Math.PI / 4 || Math.abs(direction) > Math.PI / 4 * 3) ? 'horizontal' : 'vertical';
  }

  function updateInterface() {

    if (language == 'swedish') {
      $('.score-text').html('<span class="sv"> POÄNG: </span>');
      $('.lives-text').html('<span class="sv"> LIV: </span>')
    } else {
      $('.score-text').html('<span class="en"> SCORE: </span>')
      $('.lives-text').html('<span class="en"> LIFE: </span>')
    }

    $('.score .score-points').text((score + '').padStart(5, '0'));
    $('.lives span').text(lives);
    if (lives < 1) {
     
      //sets the score value in the Data Modal  
      $('#gameModal #points').val(score);
      $('#gameModal').modal('show');

      if (language == 'swedish') {
        $('.main-text').html('<p class="sv"> SPELET ÄR ÖVER - TRYCK ENTER FÖR ATT SPELA IGEN </p>');
      }
      else {
        $('.main-text').html('<p class="en"> GAME OVER - PRESS ENTER TO PLAY AGAIN </p>');
      }
    } else if (!bricks.length) {
      
      //sets the score value in the Data Modal 
      $('#gameModal #points').val(score);
      $('#gameModal').modal('show');

      if (language == 'swedish') {
        $('.main-text').html('<p class="sv"> GRATTIS - DU VANN! </p>');
      } else {
        $('.main-text').html('<p class="en"> CONGRATULATIONS - YOU WON! </p>');
      }
    } else if (paused) {
      if (language == 'swedish') {
        $('.main-text').html('<p class="sv">Tryck "Enter" för att starta/pausa spelet. Använd vänster och höger tangenterna för att röra bräddet</p>');
      } else {
        $('.main-text').html('<p class="en">Press "Enter" to start/pause game. Use left and right arrow keys to move paddle.</p>');
      }
    } else {
      $('.main-text').text('');
    }
    $('.main-text').fadeIn(500);

  }


  function onEnterPress() {
    if (keysPressed.enter) { return; }
    keysPressed.enter = true;

    if (lives > 0) {
      paused = !paused;
      ball.$.toggleClass('rotate');
    } else {
      startNewGame();
    }
    resetPaddle();
    updateInterface();
  }

  function setupKeyListeners() {
    $(window).keydown(function (e) {
      if (e.which === 37) { keysPressed.left = true; }
      if (e.which === 39) { keysPressed.right = true; }
      if (e.which === 13) { onEnterPress(); }
    });

    $(window).keyup(function (e) {
      if (e.which === 37) { keysPressed.left = false; }
      if (e.which === 39) { keysPressed.right = false; }
      if (e.which === 13) { keysPressed.enter = false; }
    });
    $('.ukflag, .svflag').click(updateInterface);
  }

  function loadGameBorders() {
    return {
      left: 0,
      top: 0,
      width: $('.game').width(),
      height: $('.game').height()
    };
  }

  function resetPaddle() {
    paddle.$ = $('.paddle');
    paddle.speed = initialPaddleSpeed;
    paddle.top = paddle.$.position().top;
    paddle.left = paddle.$.position().left;
    /* paddle.width = paddle.$.width(); */
    paddle.width = gameBorders.width * 0.1;
    paddle.$.css('width', paddle.width);
    /*Paddel size */
    paddle.height = paddle.$.height();
    console.log(gameBorders.width, '2:', paddle.width);

    paddle.$.css('left', (paddle.left = gameBorders.width / 2 - paddle.width / 2));
  }

  function resetBall() {

    let x = gameBorders.height/1.3;

    ball.$ = $('.ball');
    ball.speed = initialBallSpeed;
    ball.left = ball.$.position().left;
    ball.width = ball.$.width();
    ball.height = ball.$.height();
    ball.$.css('top', (ball.top = x));
    ball.direction = { x: 0, y: 1 };

    ball.$.css('left', (ball.left = gameBorders.width / 2 - ball.width / 2));

    ball.$.removeClass('rotate');

    //ballSpinn = true;
  }

  function spawnBricks() {
    const brickCSS = getBrickCSS('left', 'top', 'width', 'height');

    let prevLeft = brickCSS.left;
    let prevTop = brickCSS.height;
    let leftyPos = true;
    let lengthy = 13;
    let gameBoxSize = $('.game').width();
    let color;

    let hej = gameBorders.height/10;
    

    for (let y = 0; y < 8; y++) {

      if (y == 0 || y == 3 || y == 6) { color = '#72fff0'; }
      else if (y == 1 || y == 4 || y == 7) { color = '#00ff99'; }
      else if (y == 2 || y == 5 || y == 8) { color = '#00b3b3'; }

      /*#72fff0 middle #ffff00, #ff0066, #00ff00  #00b3b3  #0000ff  #e6ffff  #004d4d */
      for (let x = 0; x < lengthy; x++) {

        const brick = createBrick(prevLeft, prevTop * y + hej, brickCSS.width, brickCSS.height, color);
        bricks.push(brick);
        $('.game').append(brick.$);
        prevLeft += brickCSS.width;
      }

      prevLeft = brickCSS.left;

      if (leftyPos == true) {
        prevLeft += gameBoxSize / 26;
        leftyPos = false;
        lengthy = 12;
      }
      else if (leftyPos == false) {
        prevLeft += 0;
        leftyPos = true;
        lengthy = 13;
      }
    }

  }

  function createBrick(left, top, width, height, backgroundColor) {
    const brick = $('<div class="brick">').css({ backgroundColor, left, top });
    return {
      $: brick,
      left,
      top,
      width,
      height,
      backgroundColor
    };
  }

  function getBrickCSS(...properties) {
    const tempBrick = $('<div class="brick">').appendTo('.game');
    const css = {}
    for (let prop of properties) {
      css[prop] = parseInt(tempBrick.css(prop));
    }
    tempBrick.remove();
    return css;
  }

  function startInterval() {
    const updateSpeed = 10; // lower = faster
    clearInterval(window.gameInterval);
    // Wait a short delay before starting to let the player prepare
    setTimeout(() => {
      let previousTime = performance.now() - updateSpeed;
      window.gameInterval = setInterval(() => {
        const now = performance.now();
        updateGame((now - previousTime) / 1000);
        previousTime = now;
      }, updateSpeed);
    }, 1000);
  }
}