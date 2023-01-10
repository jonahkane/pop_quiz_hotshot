// this is the main java script file that is linked to the main html page.  this is the "meat and potatoes" of the 
// quiz app.  displays all of my questions/answers, calls the functions that are needed in order to mamke the quiz function correctly


// declaring variables here and referencing the portion of the html document that corresponds to each 
let startButton = document.getElementById('start-btn');
let introBox = document.getElementById('introBox');
let questionBox = document.getElementById('questionBox');
let timer = document.getElementById('timer');
let highScoresLink = document.getElementById('scores');
let gameOverElement = document.getElementById('gameOver');
let questionElement = document.getElementById('question');
let answerElement = document.getElementById('answer-buttons');
let ulCreate = document.createElement("ul");

// 
let currentQuestionIndex = 0;
let secondsLeft = 100;
let holdInterval = 0;
let wrongAnswerPenalty = 10;
let score = 0;
let timerInterval;



// setting question variables with corresponding options for the user's responses as well as the correct answer
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
        title: "What sport did Jack Nicklaus play?",
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
// this function is called when the user clicks the start button.  it takes the user from the intro page to the fist question of the quiz
// here is where all of the hiding and showing takes place by adding or removing the hide class.  i also console logged the word 'started' so i would 
// be able to see what was happening while building the page
function startGame () {
    introBox.classList.add('hide')
    startButton.classList.add('hide')
    questionBox.classList.remove('hide')
    timer.classList.remove('hide')
    console.log('started');
    highScoresLink.classList.add('hide')

    // part of the start game function that brings the time clock to life
    timerInterval = setInterval(function () {
        // tells the timer to count down
        secondsLeft --;
        // will display the timer but then also type the words "seconds left" after so the user sees and understands what the numbers mean
        timer.textContent = secondsLeft + " seconds left.";
        //if the user runs out of time, it will call the gameOver function when the clock hits zero and will also tell the user they are out of time
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            gameOver();
            timer.textContent = "You are out of time!";
        }
        
    },
    //counting down by 1000 miliseconds, or 1 second
    1000);
    // if the user is NOT out of time the app will call the setNextQuestion function and advance the question index
    setNextQuestion(currentQuestionIndex);
  }

//here we are setting the next question
function setNextQuestion (currentQuestionIndex) {
///making sure that our displays are emptied here
    questionElement.innerHTML = "";
    ulCreate.innerHTML = "";

    // we have a for loop that will run through our questions and pair it with the multiple choice answers and display for the suer
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[currentQuestionIndex].title;
        var userChoices = questions[currentQuestionIndex].choices;
        questionElement.textContent = userQuestion;
    }
    // creating the list items out of the choices adn making them display as buttons on the page to give nice uniform look
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        listItem.classList.add('btn')
        questionElement.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        // when the user selects one of the buttons to answer the question we need to call a function to see if they answered correctly, hence CompareAnswer
        listItem.addEventListener("click", (compareAnswer));
    })
}




function compareAnswer (event) {
    let element = event.target;

    // using if else to compare their selection vs the correct answer.  we create a new div so we can display text telling the user
    // if they were right or wrong in their selection
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

// after telling them if they were right or wrong, we increase the question index, so long as it does not exceed the number of questions 
// we have built into the app, and if the user has exhausted all of the options, we run the gameOver function and tell the user how many
// they got right 
currentQuestionIndex++;

if (currentQuestionIndex >= questions.length) {
    clearInterval(timerInterval);

    gameOver();
    createDiv.textContent = "You got " + score + " out of " + questions.length + " correct.";
} 
// or we set the next question again
else {
    setNextQuestion (currentQuestionIndex);
}
questionElement.appendChild(createDiv);
}





//this function ends the quiz.  zeros out our question element data and remobves the hide class for out game over element
function gameOver () {

    questionElement.innerHTML = ""
    gameOverElement.classList.remove('hide')
    
//if there is time left, we are goign to count that as the user's score
    if (secondsLeft >= 0) {
        let finalScore = secondsLeft;
        let displayFinalScore = document.createElement("h2");
        clearInterval(holdInterval);
        displayFinalScore.textContent = "Your final score is: " + finalScore;

        questionElement.appendChild(displayFinalScore);
    }
// here we are creating a field where the user can enter their initials to add to the leaderboard
// this is the lable explaining what to do
    let createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionElement.appendChild(createLabel);
// this is the open text field where the user can actually input their initials
    let createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionElement.appendChild(createInput);
// this creates a submit button that will then capture the data entered
    let createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.classList.add('btn')
    createSubmit.textContent = "Submit";

    questionElement.appendChild(createSubmit);

    //when the user clicks the submit button, we first have to check to make sure they populated SOMETHIGN for their initials
        createSubmit.addEventListener("click", function () {
        let initials = createInput.value;
        
        if (initials === '') {
            //if they did not enter anything, they will get a pop up on the screen saying they forgot to enter, and will have the opportunity again
            alert("You forgot to enter your initials!");
            //if they did enter something, it will start to record their initials and their score, or how much time is left
        } else {
            let finalScore = {
                initials: initials,
                score: secondsLeft
            }
            //this is me checking to make sure final score is being collected
            console.log(finalScore);
            //stores that score to local storage
            let allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            let newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page, or the 2nd html page
            window.location.replace("./highscores.html");
        }
    });
}

//listens for the click event on the start button to begin the whole process
startButton.addEventListener('click', startGame)