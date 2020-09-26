var btnColors = ["red", "blue", "yellow", "green"];
var gamePatern = [];
var userPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
  if(!started){
    started=true;
    $("#level-title").text("Level: "+level);
    nextSequence();
  }
});

$(".btn").click(function(){
  var clickColor = $(this).attr("id");
  userPattern.push(clickColor);
  playsound(clickColor);
  animatebutton(clickColor);
  checkAnswer(userPattern.length-1);
});

function playsound(color){
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
};

function animatebutton(color){
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed");
  }, 150)
}

function nextSequence(){
  userPattern = [];
  level++;
  $("#level-title").text("Level: "+level);
  var randomNumber = Math.floor(Math.random() * 4);  
  var randomColor = btnColors[randomNumber];
  gamePatern.push(randomColor);

  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomColor);
}

function checkAnswer(currentLvl){
  console.log(userPattern[currentLvl], gamePatern[currentLvl])
  if(userPattern[currentLvl] === gamePatern[currentLvl]){
    if(userPattern.length === gamePatern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    playsound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 150)
    $("#level-title").text("Game Over! Press Any Key to Restart the Game");
    $("body").keypress(function(){
      location.reload();
    })
  }
}

function restart(){
  level = 0;
  userPattern = [];
  gamePatern = [];
  var started = false;
}
