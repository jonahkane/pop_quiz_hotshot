let highScore = document.querySelector(".highScore")
let backToQuizButton = document.querySelector(".back")
let clearButton = document.querySelector(".clearScores")

function clearScores () {
    localStorage.clear();
    location.reload();

}
let allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for ( let i =0; i < allScores.length; i++) {

        let createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

function backToQuiz () {
    window.location.replace("./index.html");


}

backToQuizButton.addEventListener("click", backToQuiz)
clearButton.addEventListener("click", clearScores)