// const game_sound = new Audio("walk.wav");
// const game_over = new Audio("gameover.wav");

// game_sound.play();

score = 0;
cross = true;

audio = new Audio("walk.wav");
audiogo = new Audio("gameover.wav");
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
  console.log("Key is ", e.keyCode);

  if (e.keyCode == 38 || e.keyCode == 32) {
    dino = document.querySelector(".dino");
    dino.classList.add("animatedino");
    setTimeout(() => {
      dino.classList.remove("animatedino");
    }, 700);
  }

  if (e.keyCode == 39) {
    dino = document.querySelector(".dino");
    dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX + 112 + "px";
  }

  if (e.keyCode == 37) {
    dino = document.querySelector(".dino");
    dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px";
  }
};

setInterval(() => {
  dino = document.querySelector(".dino");
  game_over = document.querySelector(".game_over");
  obstacle = document.querySelector(".obstacle");

  dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);

  if (offsetX < 73 && offsetY < 52) {
    game_over.innerHTML = "Opps!! Game Over \n"
                          "Play Again ";
    obstacle.classList.remove("obstacleAni");
    audiogo.play();
  } else if (offsetX < 145 && cross) {
    score += 1;
    update_score(score);
    cross = false;

    setTimeout(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

function update_score(score) {
  score_card.innerHTML = "Your Score: " + score;
}
