var buttonColors = ["red","blue","green","yellow"]; 
var gamePattern = []; 
var userClickedPattern = []; 
var level = -1; 
var game_ip = false; 
var high_score = 0; 
var tutorial_open = false; 

//Detecting user clicks
$(".btn").click(function(event){
    if(game_ip){
    var userChosenColor = event.target.getAttribute("id"); 
    userClickedPattern.push(userChosenColor); 
    console.log("User: " + userClickedPattern); 
    playSound(userChosenColor); 
    animatePress(userChosenColor); 
    checkAnswer(level); 
    }
    
}); 

//Detecting keyboard press
$(document).keypress(function() {
    if(!game_ip && !tutorial_open){
    $("button").remove();
    nextSequence(); 
    game_ip = true; 
    }

    if($(".overlay") != null && !tutorial_open)
    {
        $(".overlay").remove(); 
    }


})

//Closing tutorial screen
$(document).keypress(function(event) {
    if(tutorial_open & event.key == "E")
    {
        tutorial_open = false; 
        $(".overlay").remove(); 
        $("button").add(); 
    }
})

//Opening tutorial screen
$("button").click(function() {
    $("button").remove(); 
    tutorial(); 
})


//Loading tutorial screen
function tutorial(){
    tutorial_open = true; 
    $("h1").after("<div class=\"overlay\">Overlay Div</div>"); 
    var overlay_ref = $(".overlay"); 
//    overlay_ref.html(" <h2> The rules of the Simon Game: </h2> <ul> <li> Click any key to begin </li> <li> Click the buttons in the correct sequence as they appear </li> <li> Once you get the sequence right, you move onto the next level & the next button flashes <li> You must enter the COMPLETE sequence of buttons as they appeared (all the way from level 0 to your current level) <br> in order to move onto the next level </li> </ul>"); 
overlay_ref.html(" <h2> The rules of the Simon Game: </h2> <br> Click any key to begin <br> Click the buttons in the correct sequence as they appear <br> Once you get the sequence right, you move onto the next level & the next button flashes <br> You must enter the COMPLETE sequence of buttons as they appeared (all the way from level 0 to your current level) in order to move onto the next level <br> Press E to close this tutorial"); 

}

//transition to next level: chooses a random button to press
function nextSequence()
{
    level++; 
    // for(var i = 0; i <= userClickedPattern.length; i++){
    //     userClickedPattern.pop(); 
    // }
    userClickedPattern.length = 0; 
    console.log("User emptied: " + userClickedPattern); 
    $("h1").text("Level " + level); 
    var randomNumber = Math.round(Math.random()*3); 
    var randomChosenColor = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor); 
    console.log("Game: " + gamePattern); 


    btn_flash(randomChosenColor); 
    playSound(randomChosenColor); 
    
}


//produces a "flash" effect when a random button is chosen
function btn_flash(randomChosenColor){
    var randomButton = $("#" + randomChosenColor);
    randomButton.fadeOut(100).fadeIn(100); //fadeIn/fadeOut can also take the time (miliseconds) to fade in/out as an input!!   
}

//plays sound for next sequence + user click!
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

//Adds button animation on press
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed"); 
    setTimeout(function (){$("#"+currentColour).delay(100).removeClass("pressed"); }, 100); 

}

//Checks user input
function checkAnswer(currentLevel){
    for(var i = 0; i < userClickedPattern.length; i++)
    {
        if(userClickedPattern[i] !== gamePattern[i])
        {
            console.log("fail game!"); 
            var audio = new Audio("sounds/wrong.mp3"); 
            audio.play(); 
            $("body").addClass("game-over"); 
            setTimeout(function () { $("body").removeClass("game-over");}, 200); 
            end_Screen(); 
            restartGame(); 
            $("h1").text("Game Over, Press Any Key to Restart"); 
        }
    }

    if(game_ip && userClickedPattern.length == level+1){ setTimeout(nextSequence,100);}

    

}

//Restarts the game
function restartGame()
{
    level = -1; 
    game_ip = false; 
    gamePattern.length = 0; 
}

//Creates the end screen
function end_Screen(){
    $("h1").after("<div class=\"overlay\">Overlay Div</div>"); 
    if(level > high_score)
    { 
        high_score = level; 
        $(".overlay").html("<h2> Congratulations on a new high score! </h2> <h3> Your score was: " + level + "<br> High score: " + high_score + "</h3>");
        var cheer = new Audio("sounds/cheer.mp3"); 
        cheer.play(); 
    }
    else 
    {
        $(".overlay").html("<h2> Game Over! </h2> <h3> Your score was: " + level + "<br> High score: " + high_score + "</h3>");
    }
}
