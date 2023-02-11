const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0

$(document).keypress(() => {
  if (level == 0) {
    nextSequence()
  }
})

const playSound = (color) => {
  let sound = new Audio(`./sounds/${color}.mp3`)
  sound.play()
}

const animatePress = (currentColor) => {
  $(`.${currentColor}`).addClass("pressed")
  setTimeout(() => {
    $(`.${currentColor}`).removeClass("pressed")
  }, 100)
}

const nextSequence = () => {
  let randomNumber = Math.floor(Math.random() * 4)
  let randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)
  $(`.${randomChosenColor}`).fadeOut(50).fadeIn(50)
  animatePress(randomChosenColor)
  playSound(randomChosenColor)
  level += 1
  $("h1").text(`Level ${level}`)
  userClickedPattern = []
}

$(".btn").click((event) => {
  let userChosenColor = event.target.id
  userClickedPattern.push(userChosenColor)
  animatePress(userChosenColor)
  playSound(userChosenColor)
  checkAnswer(userClickedPattern.length - 1)
})

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (currentLevel == gamePattern.length - 1) {
      setTimeout(() => {
        nextSequence()
      }, 1000)
    }
  } else {
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(() => {
      $("body").removeClass("game-over")
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver()
  }
}

const startOver = () => {
  level = 0
  gamePattern = []
}


