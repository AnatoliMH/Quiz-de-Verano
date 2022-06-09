window.addEventListener("load", loadPage);

let questionNumber = 0;
let arrayUserAnswers = [];

async function loadPage() {
    const initGame = await getArrayAPI();
    const questions = initGame[0];
    const correctAnswers = initGame[2];
    const answers = getArrayAnswers(initGame[1], initGame[2]);
    try {
        addButtonDOM();
        getNextQuestion(questions);
        getNextAnswer(answers);
        getChoice(questions, answers, correctAnswers);
    } catch (e) {
        console.log(e);
    }
}

async function getArrayAPI() {
    let arrayLocal = [];
    let arrayQuestions = [];
    let arrayIncorrectAnswers = [];
    let arrayCorrectAnswers = [];
    const URL = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple'
    const response = await fetch(URL);
    const data = await response.json();
    data.results.forEach(e => {
        arrayQuestions.push(e.question);
        arrayCorrectAnswers.push(e.correct_answer);
        arrayIncorrectAnswers.push(e.incorrect_answers);
    });
    arrayLocal.push(arrayQuestions, arrayIncorrectAnswers, arrayCorrectAnswers);
    return arrayLocal;
}

function getArrayAnswers(incorrectAnswers, correctAnswers) {
    let arrayAllAnswers = [];
    for (let i = 0; i < incorrectAnswers.length; i++) {
        let arrayAnswer = [];
        for (let j = 0; j < incorrectAnswers[i].length; j++) {
            arrayAnswer.push(incorrectAnswers[i][j]);
        }
        arrayAnswer.push(correctAnswers[i]);
        arrayAllAnswers.push(arrayAnswer.sort(() => Math.random() - 0.5));
    }
    return arrayAllAnswers;
}

function addButtonDOM() {
    const contButton = document.getElementById("choices");
    const arrayColor = ['#f95967', '#e8df85', '#8cdd00', '#4f7d96'];
    for (let i = 0; i < 4; i++) {
        const newButton = document.createElement('button');
        newButton.className = 'button';
        newButton.id = 'button' + i;
        newButton.style.backgroundColor = arrayColor[i];
        contButton.appendChild(newButton);
    }
}

function getNextQuestion(arrayQuestions) {
    const question = document.querySelector('#question');
    question.innerHTML = questionNumber + 1 + '. ' + arrayQuestions[questionNumber];

    const progressText = document.querySelector('#progress');
    progressText.innerHTML = `Question ${questionNumber + 1} / 10`;
}

function getNextAnswer(arrayAnswers) {
    for (let i = 0; i < 4; i++) {
        const button = document.querySelector('#button' + i);
        button.innerHTML = arrayAnswers[questionNumber][i];
    }
}

function getChoice(arrayQuestions, arrayAnswers, arrayCorrectAnswers) {
    for (let i = 0; i < 4; i++) {
        const button = document.querySelector('#button' + i);
        button.addEventListener('click', () => {
            if (questionNumber < 9) {
                arrayUserAnswers.push(button.innerHTML);
                questionNumber++;
                getNextQuestion(arrayQuestions);
                getNextAnswer(arrayAnswers, arrayCorrectAnswers);
            } else {
                arrayUserAnswers.push(button.innerHTML);
                const points = verifyResults(arrayCorrectAnswers);
                removeElements(points);
                setLocalStorage(points);
            }
        });
    }
}

function verifyResults(arrayCorrectAnswers) {
    let punctuation = 0;
    for (let i = 0; i < arrayCorrectAnswers.length; i++) {
        if (arrayUserAnswers[i] == arrayCorrectAnswers[i]) {
            punctuation++;
        }
    }
    return punctuation;
}

function removeElements(points) {
    const contQuiz = document.querySelector('#quiz');
    const contQuestion = document.querySelector('#question');
    const contChoices = document.querySelector('#choices');
    const footer = document.querySelector('#foot');
    contQuiz.removeChild(contQuestion);
    contQuiz.removeChild(contChoices);
    contQuiz.removeChild(footer);

    const textResults = document.createElement('p');
    textResults.innerHTML = 'Your punctuation: ';
    textResults.id = 'textResults';
    contQuiz.appendChild(textResults);

    const results = document.createElement('p');
    results.innerHTML = `${points} / 10`;
    results.id = 'results';
    contQuiz.appendChild(results);

    const bTryAgain = document.createElement('button');
    bTryAgain.innerHTML = "Play Again";
    bTryAgain.id = 'buttonNext';
    bTryAgain.addEventListener('click', () => {
        window.location.href = './index.html'
    });
    contQuiz.appendChild(bTryAgain);
}

function setLocalStorage(points) {
    const date = new Date();
    const day = date.toLocaleDateString();
    localStorage.setItem(points, JSON.stringify(day));
}
