// this java script is for the functionaliy of only the high scores leader board
// here we are definig the variables for where the user/s initials and high scores 
// will dispaly as well as the buttons to go back to the quiz or to clear the leaderboard information
let highScore = document.querySelector(".highScore")
let backToQuizButton = document.querySelector(".back")
let clearButton = document.querySelector(".clearScores")

// function used to clear the leaderboard info
function clearScores () {
    localStorage.clear();
    location.reload();

}
// pulling data that was previously stored in local storage 
let allScores = localStorage.getItem("allScores");
//this line of code takes the information that we "stringified" previously and transforms it into a javascript object
allScores = JSON.parse(allScores);

if (allScores !== null) {
    //this for loop cycles through the number of instances of information being submitted to the leaderboard
    // and creates a new list item to add the most recent instance
    for ( let i =0; i < allScores.length; i++) {

        let createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

function backToQuiz () {
    //if the user wants to return to the quiz they click this link and the window they are on is replaced with the 
    //main html page
    window.location.replace("./index.html");


}
// these event listeners are placed ontheir respective buttons which then calls the corresponding functions above
backToQuizButton.addEventListener("click", backToQuiz)
clearButton.addEventListener("click", clearScores)