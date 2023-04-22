let numClick = -1;
let userPattern =[];
let correctPattern = [];
let possibleColors = ["red" , "blue", "yellow", "green"];

let level = 0;
let highscore =0;

$(".button").click(function(buttonClicked){
    numClick++;
let color = buttonClicked.target.id;
clickAnimation("#" + color);
playAudio(color);
checkAnswer(color);
});


function checkAnswer(color){
  userPattern.push(color);
  if(color == correctPattern[numClick]){
    if(userPattern.length == correctPattern.length){
        setTimeout(function(){
            userPattern = [];
            numClick = -1;
            nextChange();
        },100);
       
    }
  }else{
    playAudio("wrong");
    $("body").addClass("game-over");
       $("h2").text("Game over!  press another key to Restart");
       userPattern=[];
       correctPattern=[];
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
       if(level>highscore){
        highscore = level;
        $("#highscore").text(level);
       }
       level=0;
       numClick = -1;
  }
}


function nextChange(){
    level++;
    $("#level").text(level);
    let rand = Math.floor(Math.random()*4);
    let color = possibleColors[rand];
    correctPattern.push(color);
    playAudio(color);
    clickAnimation("#" + color)
}
function playAudio(color){
    let relPath = `sounds/${color}.mp3`;
    let audio = new Audio(relPath);
    audio.play();
}
function clickAnimation(id){
    $(id).fadeOut(100).fadeIn(100);

}

$(document).keydown(function(){
    if(level<=0){
        $("h2").text("The Game begins!");
        nextChange();
    }
});