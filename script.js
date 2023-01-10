let startButton = document.getElementById('start-btn');
let introBox = document.getElementById('introBox');
let questionBox = document.getElementById('questionBox');
let timer = document.getElementById('timer');
let highScoresLink = document.getElementById('scores');
let gameOverElement = document.getElementById('gameOver');
let questionElement = document.getElementById('question');
let answerElement = document.getElementById('answer-buttons');
let ulCreate = document.createElement("ul");

let currentQuestionIndex = 0;
let secondsLeft = 300;
let holdInterval = 0;
let wrongAnswerPenalty = 10;
let score = 0;




const questions = [
    {
        title: "What sport did Wayne Gretzky play?",
        choices: ["football", "hockey", "basketball", "tennis", "golf"],
        answer: "hockey"
    },
    {
        title: "What sport did Michael Jordan play?",
        choices: ["football", "hockey", "basketball", "tennis", "golf"],
        answer: "basketball"
    },
    {
        title: "What sport did Jack Nicholaus play?",
        choices: ["football", "hockey", "basketball", "tennis", "golf"],
        answer: "golf"
    },
    {
        title: "What sport did Andre Agassi play?",
        choices: ["football", "hockey", "basketball", "tennis", "golf"],
        answer: "tennis"
    },
    {
        title: "What sport did Peyton Manning play?",
        choices: ["football", "hockey", "basketball", "tennis", "golf"],
        answer: "football"
    },
]
let timerInterval;
function startGame () {
    introBox.classList.add('hide')
    startButton.classList.add('hide')
    questionBox.classList.remove('hide')
    timer.classList.remove('hide')
    console.log('started');
    highScoresLink.classList.add('hide')

    timerInterval = setInterval(function () {
        secondsLeft --;
        timer.textContent = secondsLeft + " seconds left.";
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            gameOver();
            timer.textContent = "You are out of time!";
        }
        
    },
    1000);
    setNextQuestion(currentQuestionIndex);
  }


function setNextQuestion (currentQuestionIndex) {
    questionElement.innerHTML = "";
    ulCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[currentQuestionIndex].title;
        var userChoices = questions[currentQuestionIndex].choices;
        questionElement.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        listItem.classList.add('btn')
        questionElement.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compareAnswer));
    })
}



{/* <h1>Hori<span class="seo">seo</span>n</h1> */}

function compareAnswer (event) {
    let element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        console.log("currentquestionindex= ", currentQuestionIndex);
        if (element.textContent == questions[currentQuestionIndex].answer) {
            score++;
            createDiv.textContent = "Your last answer was correct!"
        } else {
            secondsLeft = secondsLeft - wrongAnswerPenalty;
            createDiv.textContent = "Your last answer was incorrect!"
        }
    }


currentQuestionIndex++;

if (currentQuestionIndex >= questions.length) {
    clearInterval(timerInterval);

    gameOver();
    createDiv.textContent = "You got " + score + " out of " + questions.length + " correct.";
} 
else {
    setNextQuestion (currentQuestionIndex);
}
questionElement.appendChild(createDiv);
}






function gameOver () {

    questionElement.innerHTML = ""
    gameOverElement.classList.remove('hide')
    

    if (secondsLeft >= 0) {
        let finalScore = secondsLeft;
        let displayFinalScore = document.createElement("h2");
        clearInterval(holdInterval);
        displayFinalScore.textContent = "Your final score is: " + finalScore;

        questionElement.appendChild(displayFinalScore);
    }

    let createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionElement.appendChild(createLabel);

    let createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionElement.appendChild(createInput);

    let createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.classList.add('btn')
    createSubmit.textContent = "Submit";

    questionElement.appendChild(createSubmit);

    
        createSubmit.addEventListener("click", function () {
        let initials = createInput.value;
        
        if (initials === null) {
            
            console.log("You forgot to enter your initials!");
            
        } else {
            let finalScore = {
                initials: initials,
                score: secondsLeft
            }
            console.log(finalScore);
            let allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            let newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });
}


startButton.addEventListener('click', startGame)