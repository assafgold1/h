let questions = [];
let currentQuestionIndex = 0;
let score = 0;

function loadQuestions() {
    fetch('src/data/questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data.questions;
            loadQuestion();
        })
        .catch(error => console.error('Error loading questions:', error));
}

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const questionImageElement = document.getElementById("questionImage");
    const feedbackElement = document.getElementById("feedback");
    const idElement = document.getElementById("id");
    const nextBtn = document.getElementById("nextBtn");
    const scoreElement = document.getElementById("score");

    questionElement.textContent = questions[currentQuestionIndex].question;
    questionImageElement.src = questions[currentQuestionIndex].image;
    optionsElement.innerHTML = "";
    feedbackElement.textContent = "";
    idElement.textContent = "";
    nextBtn.style.display = "none";

    questions[currentQuestionIndex].options.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.onclick = function() {
            checkAnswer(this, option);
        };
        optionsElement.appendChild(optionElement);
    });
}

function checkAnswer(selectedOption, selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const id = questions[currentQuestionIndex].id;
    const feedbackElement = document.getElementById("feedback");
    const idElement = document.getElementById("id");
    const nextBtn = document.getElementById("nextBtn");
    const scoreElement = document.getElementById("score");

    if (selectedAnswer === correctAnswer) {
        feedbackElement.textContent = "תשובה נכונה! ✔️";
        score += 10; // ניקוד +10 עבור תשובה נכונה
        scoreElement.textContent = "ניקוד: " + score;
    } else {
        feedbackElement.textContent = "תשובה לא נכונה. התשובה הנכונה היא: " + correctAnswer + " ❌";
    }

    idElement.textContent = "מס: " + id;

    selectedOption.classList.add(selectedAnswer === correctAnswer ? "correct" : "incorrect");

    nextBtn.style.display = "block";
}

function nextQuestion() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("סיימת !");
    }
}

loadQuestions();
