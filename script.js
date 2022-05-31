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

function loadPage() {
    addQuestionsDOM();
}

async function addQuestionsDOM() {
    const container = document.getElementById("quiz");
    const arrayQuestions = await getQuestions();
    const arrayCorrectAnswers = await getCorrectAnswers();

    for (let i = 0; i < arrayQuestions.length; i++) {
        const question = document.createElement('p');
        question.innerHTML = i + 1 + '. ' + arrayQuestions[i] + arrayCorrectAnswers[i];
        //container.appendChild(question);
    }
    console.log()
}

async function getQuestions() {
    let arrayQuestions = [];
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple');
    const data = await response.json();
    data.results.forEach(e => {
        arrayQuestions.push(e.question);
    });
    return arrayQuestions;
}

async function getCorrectAnswers() {
    let correctAnswers = [];
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple');
    const data = await response.json();
    data.results.forEach(e => {
        correctAnswers.push(e.correct_answer);
    });
    return correctAnswers;
}
