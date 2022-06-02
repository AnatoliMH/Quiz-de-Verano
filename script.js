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
import { data } from './data/data.js'

window.addEventListener("load", loadPage);

function loadPage() {

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
