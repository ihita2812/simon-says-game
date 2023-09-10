var hasGameStarted = false;
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function (event) {handler(event.target.id)});

function handler(color) {
    var userChosenColor = color;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer();
}

function playSound(currentColor) {
    var sound = new Audio("./sounds/"+currentColor+".mp3");
    sound.play();
}

function animatePress(currentColor) {
    var choser = "#"+currentColor;
    $(choser).addClass("pressed");
    setTimeout(function () {
        $(choser).removeClass("pressed");
    }, 100);
}

$(document).on("keydown", function () {
    if (!hasGameStarted) {
        hasGameStarted = true;

        $("h1").text("Level 0");
        nextSequence();
    }
})

function checkAnswer() {

    var clickCount = userClickedPattern.length;
    
    if (userClickedPattern[clickCount-1] === gamePattern[clickCount-1]) {
        if (clickCount == level) {
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        } else {
            //nothing
        }
    
    } else {
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press any key to restart");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    hasGameStarted = false;
}