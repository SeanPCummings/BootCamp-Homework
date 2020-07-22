document.addEventListener('DOMContentLoaded', () => {
    const timeLeftDisplay = document.querySelector("#time-left");
    const startBtn = document.querySelector("#start-button");
    const gridVis = document.querySelector(".grid");
    let timeLeft = 90; // set timer to 90 seconds

    function countDown(){
        startBtn.style.visibility = "hidden"; //hide start button after being pressed
        gridVis.style.visibility = "visible";// show quiz after start button clicked
        setInterval(function(){
            if(timeLeft <=0 ){ // when timer runs out the quiz ends with the showScores method
                clearInterval(timeLeft = 0);
                showScores();
            }
            timeLeftDisplay.innerHTML = timeLeft;
            timeLeft -=1;
        }, 1000) // 1000 milliseconds equals 1 second 
        
    }
    startBtn.addEventListener('click', countDown);
})

function populate() {
    if(quiz.isEnded()) {
        showScores(); // ends the quiz if all answers are clicked 
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress(); // counter of questions 
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess); // to continue after a choice is made and a new question appears
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress"); // replaces x with current question number and y with the total of questions
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}; 
 // Check browser support
    if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("initial", "init");
    localStorage.setItem("currScore", "quiz.score");
    } else {
    document.getElementById("quiz").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
formIN = document.getElementById("form");//1
function showScores() {
    //Could not get the initial input to work, I have tried a visibility flip of a form in html(1),
    //I have tried creating the form through JS but I could not call the input from the form
    //The last thing I tried was createElement methods but I would keep getting "[object HTMLInputElement]" 
    //The closest I got was generating the form through JS so that is how I will leave it.
    formIN.style.visibility = "visible";//1
    var gameOverHTML = "<h1>Results</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";
    gameOverHTML += "Your Initials: <input id = 'init' </input>"
    init.addEventListener("keyup", onEnterKey); // The problem here is that I can't access the html element of 'input' I created through JS 
    function onEnterKey() { // So the code now on won't work but the idea was to listen for an 'Enter' key
        var key = window.event.keyCode;
    
        // If the user has pressed enter
        if (key === 13) { // ASCII characters 1 - 33 are control characters and 13 is 'Enter' or 'return'
            highScores();//after the user has identified themeselves they can move on to the leaderboard
            return false;
        }
        else {
            return true;
        }
    }


    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML; //This adds all of the html elements to the doc
    
    function highScores(){//This would compare each new score to figure the HighScore
    var inits = localStorage.getItem("initial");//Trying out local storage to keep scores even after refresh but the code doesn't get this far
    var currentScore = localStorage.getItem("currScore");

    var highscore = 0;
    if (currentScore > highscore){
        highscore = currentScore;
    }
    
};
    
    

};

function question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


// create questions as String, Array[choices], correct choice.
var questions = [
    new question("Which one is not an object oriented programming language?", ["Java", "C#","C++", "C"], "C"),
    new question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new question("There are ____ main components of object oriented programming.", ["1", "6","2", "4"], "4"),
    new question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
    new question("MVC is a ____.", ["Language", "Library", "Framework", "All"], "Framework")
];

function quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

// create quiz
var quiz = new quiz(questions);

// display quiz
populate();