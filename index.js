var box = ["green", "red", "yellow", "blue"];
var started = 0;
var sequence = [];
var userSelection = [];
var level = 0;

$(document).keypress(function(){
    if (started !== 1){
        showNextBox();
    }
    started = 1;
});

$(".btn").click(function(){
    var userClicked = $(this).attr("id");
    playSound(userClicked);

    $(this).addClass("pressed");
    setTimeout(function(){
        $("#" + userClicked).removeClass("pressed");
    }, 200);

    userSelection.push(userClicked);
    checkUserInput(userSelection.length-1);
});

function showNextBox() {
    userSelection = [];
    level++;

    $("#level-title").text("level " + level);

    var random = Math.floor((Math.random() * 4));
    var nextBox = box[random];
    sequence.push(nextBox);

    var sound = nextBox ;

    playSound(sound);
    $("." + nextBox).fadeIn(200).fadeOut(200).fadeIn(200);
}


function checkUserInput(currentLength) {
    
    if (userSelection[currentLength] === sequence[currentLength]){
        if (userSelection.length === sequence.length){
            setTimeout(showNextBox,1000);
        }
    }        
    else{
        gameOver();
        started = 0;
    }
}


function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 300);

    $("#level-title").text("Game over, Press any key to Start");
    
    playSound("wrong");
    sequence = [];
    started = 0;
    level = 0;
}