

// User answer results
var rightAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;

// Array objects of all questions, choices, and validanswers
var myQuestions = [
    {
        question: "How did Daenerys Targaryen eventually hatch her dragon eggs?",
        choices: ["In a lightning storm", "In a funeral pyre", "In a fireplace", "In a frozen cave"],
        validAnswer: "In a funeral pyre"
    }, {
        question: "The phrase 'Valar Morghulis' or 'all men must die' is usually responded with:",
        choices: ["Valar Dohaeris or 'all men must serve", "Valar Rohnas or 'all men must live'", "Valar GoGo or 'all men must dance'"],
        validAnswer: "Valar Dohaeris or 'all men must serve"
    }, {
        question: "What is the only thing that can put out volatile Wildfire?",
        choices: ["Sand", "Water", "Dragon's blood", "Sunlight"],
        validAnswer: "Sand"
    }, {
        question: "Besides dragonglass, what is the only other substance capable of defeating White Walkers?",
        choices: ["Weirwood", "Wildfire", "Valyrian Steel", "Snowballs"],
        validAnswer: "Valyrian Steel"
    }, {
        question: "How many times has Beric Dondarrion been brought back to life?",
        choices: ["Three Times", "Five Times", "Six Times", "Seven Times"],
        validAnswer: "Six Times"
    }, {
        question: "Which Stark family direwolf was killed in retaliation for an attack on Prince Joffrey?",
        choices: ["Ghost", "Lady", "Nymeria", "Summer"],
        validAnswer: "Lady"
    }, {
        question: "'It's nothing' were the last words of this infamous character:",
        choices: ["Renly Baratheon", "Tywin Lannister", "Robb Stark", "King Joffrey"],
        validAnswer: "King Joffrey"
    }, {
        question: "What was the name of Ned Stark's greatsword?",
        choices: ["Oathkeeper", "Ice", "Widow's Wail", "Northguard"],
        validAnswer: "Ice"
    }, {
        question: "Who created the secret tunnel in the sewers under Casterly Rock?",
        choices: ["Lord Baelish", "Varys", "Tyrion Lannister", "Jaime Lannister"],
        validAnswer: "Tyrion Lannister"
    }, {
        question: "Dead creatures revived by White Walkers are known as:",
        choices: ["Little Walkers", "Wights", "Zombies", "Claws"],
        validAnswer: "Wights"
    },
];

$("#display-questions").hide();
$("#display-choices").hide();


// declare timer object
var timer = {
    // property that represents seconds left (default 30)
    secondsLeft: 31,
    // method that sets the seconsLeft on the time object(used to set a new time before starting the timer)
    setTimer: function (seconds) {
        // sets seconds left to whatever is passed in
        this.secondsLeft = seconds;
    },
    // method changes innerHTML value of timer div to amount of seconds left on the timer object
    changeHTML: function () {
        $("#timer").html(timer.secondsLeft);
    },

    timerInterval: null,
    startTimer: function () {
        this.timerInterval = setInterval(function () {
            if (timer.secondsLeft > 0) {
                timer.secondsLeft--;
                timer.changeHTML();
            } else if (timer.secondsLeft === 0) {
                questionIndex++;
                unanswered++;
                timer.setTimer(31);
                timer.startTimer();
                displayNextQuestion();
            } else {
                clearInterval(timer.timerInterval)
            }
        }, 1000);
    }
}

// start game with click event. Starts the timer
$("#start").on("click", function () {
    $("#display-questions").show();
    $("#display-choices").show();
    timer.setTimer(30);
    timer.startTimer();
})

var questionIndex = 0;
function displayNextQuestion() {
    $("#display-questions").empty();
    $("#display-choices").empty();
    var question = myQuestions[questionIndex].question;
    var questionSet = myQuestions[questionIndex];
    for (let i = 0; i < myQuestions[questionIndex].choices.length; i++) {
        let newButton = $("<button class='btn btn-primary'>")
        let eachOption = myQuestions[questionIndex].choices[i];
        newButton.text(eachOption);
        newButton.attr("info", eachOption);
        newButton.addClass("choice-button");
        $("#display-choices").append(newButton);
    }
    $("#display-questions").append(question)
}


displayNextQuestion();

$("#display-choices").on("click", ".choice-button", function () {
    var userPick = $(this).attr("info");
    if (userPick === myQuestions[questionIndex].validAnswer) {
        $("#current-result").text("Correct Answer!")
        rightAnswers++;
        clearInterval(timer.timerInterval)
    } else {
        $("#current-result").text("Wrong Answer!")
        $("#right-answer").text("The correct answer was: " + myQuestions[questionIndex].validAnswer + ".");
        wrongAnswers++;
        clearInterval(timer.timerInterval)
    }

    questionIndex++;
    timer.setTimer(31);
    timer.startTimer();
    displayNextQuestion();


})


console.log(unanswered);
console.log(rightAnswers);
console.log(wrongAnswers);


