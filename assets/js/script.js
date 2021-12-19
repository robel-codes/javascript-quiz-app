// an array containing questions , choice and answers
var questions = [
    {
        num: 1,
        question: "Which one is not a datatype in JavaScript?",
        answer: "Alerts",
        choices: [
            "Strings",
            "Booleans",
            "Alerts",
            "Numbers"
        ]
    },
    {
        num: 2,
        question: "The condition in an if/else statement is enclosed with ______ .",
        answer: "Parenthesis",
        choices: [
            "Quotes",
            "Curly brackets",
            "Parenthesis",
            "Square brackets"
        ]
    },
    {
        num: 3,
        question: "Arrays in JavaScript can be used to store ______ .",
        answer: "All of the above",
        choices: [
            "Numbers and Strings",
            "Other arrays",
            "Booleans",
            "All of the above"
        ]
    },
    {
        num: 4,
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answer: "Quotes",
        choices: [
            "Commas",
            "Curly brackets",
            "Quotes",
            "Parenthesis"
        ]
    },
    {
        num: 5,
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: "console.log",
        choices: [
            "JavaScript",
            "Terminal/Bash",
            "For loops",
            "console.log"
        ]
    },
];

// select all elements
var quizIntro = document.querySelector(".quiz-intro");
var quizMain = document.querySelector(".quiz-main");
var result = document.querySelector(".result");
var highScores = document.querySelector(".high-scores");
var optionList = document.querySelector(".option-list");
var timeCount = document.querySelector(".timer .timer-sec");
var timeText = document.querySelector(".timer .timer-text");

var startBtn = quizIntro.querySelector(".quiz-intro .start");


//start button clicked
startBtn.onclick = ()=>{
    
    quizIntro.classList.add("passiveInfo");
    quizMain.classList.add("activeQuiz");
    showQuestions(0); // calling showQuestions function
    //queCounter(1);   //passing 1 parameter to que counter
    startTimer(60);  //Calling starttimer function
    
}

var timeValue = 60;
var queCount = 0;
var queNumb = 1;
var userScore = 0;
var counter;
var counterLine;
var widthValue = 0;

var restartQuiz = result.querySelector(".buttons .go-back");
var clearHs = highScores.querySelector(".buttons clear-hs");


//getting questions and options from array (build quiz function),
function showQuestions(index) {
    
    var queText = document.querySelector(".que-text");

    //creating a new span and div tag for question and option and passing the value
    var queTag = '<span>'+ questions[index].num + ". " + questions[index].question +'</span>';
    var optionTag = '<div class="option"><span>'+ questions[index].choices[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].choices[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].choices[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].choices[3] +'</span></div>';
    queText.innerHTML = queTag; // adding new span tag inside que tag
    optionList.innerHTML = optionTag; // adding new div tag inside option tag

    var option = optionList.querySelectorAll(".option");
    
    // set onclick attribut to all available options
    for (i=0; i<option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
        index++;
        option[i].onclick = () =>{
            if (queCount < questions.length - 1){
                queCount++;
                queNumb++;
                showQuestions(queCount);
            } else{
                showResult(); // Calling ShowResult function
                clearInterval(counter);
            }
        }
    }
}


function optionSelected(answer){
    var userAns = answer.textContent;
    var correctAns = questions[queCount].answer;
    var allOptions = optionList.children.length;

    if(userAns == correctAns){
        answer.classList.add("correct");
        console.log("correct Answer");
        console.log("Your correct answers = " + userScore);
    }else {
        answer.classList.add("incorrect");
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAns){ //if there is an option which is matched to an array answer 
                console.log("Auto selected correct answer.");
            }
        }
    }
    
}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 0){
            clearInterval(counter);
            showResult();
        }   
    }
}

function showResult(){
    quizIntro.classList.add("passiveInfo");
    quizMain.classList.remove("activeQuiz");
    result.classList.add("activeResult");
    var tag = result.querySelector("#tag");
    var resultTag = '<p>Your final score is:' + timeCount.textContent + ' </p>';
    tag.innerHTML = resultTag;
}

function showHighScore(){
    quizIntro.classList.add("passiveInfo");
    quizMain.classList.remove("activeQuiz");
    result.classList.remove("activeResult");
    highScores.classList.add("activeHighscore");

}

var viewHs = document.querySelector(".highscore");
viewHs.onclick = ()=>{
    showHighScore();

}


var inialBtn = document.querySelector(".submitForm .btn");

inialBtn.onclick = ()=>{
    var nameInital = document.querySelector("input[name='name-inital']").value;

    //check if intial input is not empty(validate)
    if (!nameInital) {
        alert("You need to fill out Your initals!");
        return false;
    }

    // reset the fileld for next inital to be entered
    document.querySelector("input[name='name-inital']").value = "";

    var scoreInfoEl = document.getElementById("hs-txt");

    var listItemEl = document.createElement("ol");
    listItemEl.className = "names-item";
    listItemEl.innerHTML = nameInital + ":" +timeCount.textContent  ;

    scoreInfoEl.appendChild(listItemEl);
    
}

var backBtn = document.querySelector(".buttons .go-back");

backBtn.onclick = ()=>{
    quizIntro.classList.remove("passiveInfo");
    quizMain.classList.remove("activeQuiz");
    result.classList.remove("activeResult");
    highScores.classList.remove("activeHighscore");
    queCount = 0;
}

var clearBtn = document.querySelector(".buttons .clear-hs");

clearBtn.onclick = ()=>{
    document.getElementById("hs-txt").innerHTML = "";
    clearInterval(counter);
}