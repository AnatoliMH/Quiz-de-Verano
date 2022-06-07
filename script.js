/*
FASE 1: Diseño del front

    Diseño responsive, mobile first, semántica HTML5

FASE 2: Lógica de JavaScript

    Asincronía. Usar API de preguntas https://opentdb.com/  
    Adaptar nuestra app acorde a lo que vimos en clase
    Conseguir con 10 preguntas nuestras, guardadas en un array de objetos, 
    se pueda jugar a nuestro Quiz. [{..},{..},{..}...{..}]

FASE 3: Asincronía

    Javascript: Manejo de asincronía. Leer 10 preguntas random de la API 
    de prenguntas para generar el Quiz

FASE 4 (avanzado) - APIs HTML5

    Almacenar la puntuación de cada partida en un array de objetos 
    [{..},{..},{..}...{..}] en Local Storage. Guardar puntuación y fecha 
    en cada objeto del array

    Mostrar en la Home con una gráfica los resultados de las últimas 
    partidas jugadas (leer puntuaciones de LocalStorage). 
    Representar Fecha(eje X) vs Puntuación(eje Y)
*/

window.addEventListener("load", loadPage);
const question = document.getElementById("question");
let questionNumber = 0;
let arrayUserAnswers = [];

async function loadPage() {
    try {
        const initGame = await getQuestions();
        addQuestionsDOM(initGame[0]);
        const answers = getArrayAnswers(initGame[1], initGame[2]);
        const correctAnswers = initGame[2];
        addButtonDOM(answers);
        getChoice();
        const progressText = document.querySelector('#progress');
        const buttonNext = document.querySelector('#buttonNext');
        progressText.innerHTML = `Question ${questionNumber + 1} / 10`;
        buttonNext.addEventListener('click', () => {
            if (questionNumber < 9) {
                questionNumber++;
                getNextQuestion(initGame[0], questionNumber);
                const answers = getArrayAnswers(initGame[1], initGame[2]);
                getNextAnswer(answers);
                progressText.innerHTML = `Question ${questionNumber + 1} / 10`;
            }
            else {
                const points = verifyResults(correctAnswers);
                removeElements(points);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function addQuestionsDOM(response) {
    question.innerHTML = questionNumber + 1 + '.' + response[questionNumber];
}

async function addButtonDOM(arrayAnswers) {
    const contButton = document.getElementById("choices");
    const arrayColor = ['red', 'lawngreen', 'darkorange', 'mediumturquoise'];
    for (let i = 0; i < 4; i++) {
        const newButton = document.createElement('button');
        newButton.className = 'button';
        newButton.style.backgroundColor = arrayColor[i];
        newButton.id = 'button' + i;
        newButton.innerHTML = arrayAnswers[i];
        contButton.appendChild(newButton);
    }
}

function getArrayAnswers(incorrectAnswers, correctAnswer) {
    let arrayAnswers = [];
    for (let i = 0; i < 3; i++)
        arrayAnswers.push(incorrectAnswers[questionNumber][i]);
    arrayAnswers.push(correctAnswer[questionNumber]);
    return arrayAnswers.sort(() => Math.random() - 0.5);
}

async function getQuestions() {
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

function getNextQuestion(response, n) {
    question.innerHTML = n + 1 + '.' + response[n];
}

function getNextAnswer(arrayAnswers) {
    for (let i = 0; i < 4; i++) {
        const button = document.querySelector('#button' + i);
        button.innerHTML = arrayAnswers[i];
    }
}

function getChoice() {
    for (let i = 0; i < 4; i++) {
        const button = document.querySelector('#button' + i);
        button.addEventListener('click', () => {
            arrayUserAnswers.push(button.innerHTML);
        })
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
    const contNext = document.querySelector('#contButton');
    const footer = document.querySelector('#foot');
    contQuiz.removeChild(contQuestion);
    contQuiz.removeChild(contChoices);
    contQuiz.removeChild(contNext);
    contQuiz.removeChild(footer);

    const textResults = document.createElement('p');
    textResults.innerHTML = 'Your punctuation: ';
    textResults.id = 'textResults';
    contQuiz.appendChild(textResults);

    const results = document.createElement('p');
    results.innerHTML = `${points} / 10`;
    results.id = 'results';
    contQuiz.appendChild(results);
}

function checkLocalStorage() {  // Comprueba si hay datos en el Local Storage, si no hay datos lo pone a NULL
    if (localStorage.userData) {
        showUserData();
    } else {
        document.getElementById('mySection').style.display = 'flex';
    }
}