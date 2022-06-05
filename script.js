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
let questionNumber = 0;

async function loadPage() {
    try {
        const initGame = await getQuestions();
        addQuestionsDOM(initGame[0]);
        addButtonDOM(initGame[1]);
    } catch (e) {
        console.log(e);
    }
}

async function addQuestionsDOM(response) {
    const question = document.getElementById("question");
    question.innerHTML = questionNumber + 1 + '.' + response[questionNumber];
}

async function addButtonDOM(response) {
    const contButton = document.getElementById("choices");
    for (let i = 0; i < 4; i++) {
        const newButton = document.createElement('button');
        newButton.className = 'button';
        newButton.innerHTML = response[questionNumber][i];
        contButton.appendChild(newButton);
    }
}

async function getQuestions() {
    const URL = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple'
    let arrayLocal = [];
    let arrayQuestions = [];
    let arrayIncorrectAnswers = [];
    let arrayCorrectAnswers = [];
    let arrayAnswers = [];

    const response = await fetch(URL);
    const data = await response.json();
    data.results.forEach(e => {
        arrayQuestions.push(e.question);
        arrayCorrectAnswers.push(e.correct_answer);
        arrayIncorrectAnswers.push(e.incorrect_answers);
    });
    for (let i = 0; i < 10; i++) {
        arrayAnswers.push(arrayIncorrectAnswers[i].concat(arrayCorrectAnswers[i]));
    }
    arrayLocal.push(arrayQuestions, arrayAnswers);
    return arrayLocal;
}

async function getNextQuestion(response) {
    console.log("button pressed");
    const question = document.getElementById("question");
    question.innerHTML = questionNumber + 1 + '.' + response[questionNumber];
    questionNumber++;
}
