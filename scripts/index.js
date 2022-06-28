import { arrayAPI } from './firebase.js';

let questionNumber = 0;
let arrayUserAnswers = [];

window.addEventListener('load', loadPage);

async function loadPage() {
    // loginUser();
    initHome();
    getLocalStorage();
    resetLocalStorage();
    try {
        setEventListeners();
    } catch (e) {
        console.log(e);
    }
}

function initHome() {
    const wrapper = document.querySelector('#wrapper');

    const divWelcome = document.createElement('div');
    divWelcome.className = 'quiz';
    divWelcome.id = 'divWelcome';
    wrapper.appendChild(divWelcome);

    const titleWelcome = document.createElement('h2');
    titleWelcome.className = 'header';
    titleWelcome.innerHTML = '¡Welcome to Summer Quiz!';
    divWelcome.appendChild(titleWelcome);

    const hr1 = document.createElement('hr');
    divWelcome.appendChild(hr1);

    const description = document.createElement('h4');
    description.innerHTML = 'Choose the category of the quiz:';
    description.id = 'homeDescription';
    divWelcome.appendChild(description);

    const divChoices = document.createElement('div');
    divChoices.id = 'categoryChoice';
    divWelcome.appendChild(divChoices);

    const category11 = document.createElement('button');
    category11.innerHTML = 'Film';
    category11.className = 'buttonInit';
    category11.id = 'catFilms';
    divChoices.appendChild(category11);

    const category12 = document.createElement('button');
    category12.innerHTML = 'Music';
    category12.className = 'buttonInit';
    category12.id = 'catMusic';
    divChoices.appendChild(category12);

    const category15 = document.createElement('button');
    category15.innerHTML = 'Video Games';
    category15.className = 'buttonInit';
    category15.id = 'catVideoGames';
    divChoices.appendChild(category15);

    const category21 = document.createElement('button');
    category21.innerHTML = 'Sports';
    category21.className = 'buttonInit';
    category21.id = 'catSports';
    divChoices.appendChild(category21);

    const categoryFirebase = document.createElement('button');
    categoryFirebase.innerHTML = 'Firebase';
    categoryFirebase.className = 'buttonInit';
    categoryFirebase.id = 'catFirebase';
    divChoices.appendChild(categoryFirebase);

    const divStats = document.createElement('div');
    divStats.className = 'quiz';
    divStats.id = 'divStats';
    wrapper.appendChild(divStats);

    const titleStats = document.createElement('h2');
    titleStats.innerHTML = 'Your Stats';
    titleStats.className = 'header';
    divStats.appendChild(titleStats);

    const hr2 = document.createElement('hr');
    divStats.appendChild(hr2);

    const contStats = document.createElement('div');
    contStats.id = 'contStats';
    divStats.appendChild(contStats);

    const bReset = document.createElement('button');
    bReset.className = 'buttonInit';
    bReset.id = 'buttonReset'
    bReset.innerHTML = 'Clear all stats';
    divStats.appendChild(bReset);
}

async function setEventListeners() {
    document.querySelector('#catFilms').addEventListener('click', () => {
        initGame('14');
    });
    document.querySelector('#catMusic').addEventListener('click', () => {
        initGame('12');
    });
    document.querySelector('#catVideoGames').addEventListener('click', () => {
        initGame('15');
    });
    document.querySelector('#catSports').addEventListener('click', () => {
        initGame('21');
    });
    document.querySelector('#catFirebase').addEventListener('click', () => {
        initGame('firebase');
    });
}

async function initGame(category) {
    const wrapper = document.querySelector('#wrapper');
    const divWelcome = document.querySelector('#divWelcome');
    const divStats = document.querySelector('#divStats');

    divWelcome.style.display = 'None';
    divStats.style.display = 'None';

    const divGame = document.createElement('div');
    divGame.className = 'quiz';
    divGame.id = 'divGame';
    wrapper.appendChild(divGame);

    const question = document.createElement('p');
    question.id = 'question';
    divGame.appendChild(question);

    const contButton = document.createElement('div');
    contButton.id = 'contButton';
    divGame.appendChild(contButton);

    const footer = document.createElement('footer');
    footer.id = 'foot';
    divGame.appendChild(footer);

    const progress = document.createElement('p');
    progress.id = 'progress';
    footer.appendChild(progress);

    addButtonDOM();

    const arrayGame = category !== 'firebase' ? await getArrayAPI(category) : arrayAPI;
    const questions = arrayGame[0];
    const correctAnswers = arrayGame[2];
    const answers = getArrayAnswers(arrayGame[1], arrayGame[2]);
    getNextQuestion(questions);
    getNextAnswer(answers);
    getChoice(questions, answers, correctAnswers);
}

async function getArrayAPI(category) {
    let arrayLocal = [];
    let arrayQuestions = [];
    let arrayIncorrectAnswers = [];
    let arrayCorrectAnswers = [];
    const URL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`
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

function addButtonDOM() {
    const contButton = document.querySelector('#contButton');
    const arrayColor = ['#f95967', '#e8df85', '#8cdd00', '#4f7d96'];
    for (let i = 0; i < 4; i++) {
        const newButton = document.createElement('button');
        newButton.className = 'button';
        newButton.id = 'button' + i;
        newButton.style.backgroundColor = arrayColor[i];
        contButton.appendChild(newButton);
    }
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
                addResultsElements(points);
                setLocalStorage(points);
            }
        });
    }
}

function verifyResults(arrayCorrectAnswers) {
    let punctuation = 0;
    for (let i = 0; i < arrayCorrectAnswers.length; i++) {
        if (arrayUserAnswers[i] === arrayCorrectAnswers[i]) {
            punctuation++;
        }
    }
    return punctuation;
}

function removeElements() {
    const divGame = document.querySelector('#divGame');
    divGame.style.display = 'None';
}

function addResultsElements(points) {
    const wrapper = document.querySelector('#wrapper');
    const contResults = document.createElement('div');
    contResults.className = 'quiz';
    wrapper.appendChild(contResults);

    const textResults = document.createElement('p');
    textResults.innerHTML = 'Your punctuation: ';
    textResults.id = 'textResults';
    contResults.appendChild(textResults);

    const results = document.createElement('p');
    results.innerHTML = `${points} / 10`;
    results.id = 'results';
    contResults.appendChild(results);

    const paragraph = document.createElement('p');
    if (points < 5) {
        paragraph.innerHTML = "Your  score is too weak!";
        results.style.backgroundColor = '#f95967';
    } else if (points < 8) {
        paragraph.innerHTML = "Your score is average, very good!";
        results.style.backgroundColor = '#e8df85';
    } else {
        paragraph.innerHTML = "Wow! you're awesome!";
        results.style.backgroundColor = '#8cdd00';
    }
    paragraph.className = 'paragraph';
    contResults.appendChild(paragraph);

    const bHome = document.createElement('button');
    bHome.innerHTML = "Go Home";
    bHome.id = 'buttonNext';
    bHome.addEventListener('click', () => {
        loadPage();
        location.reload();
    });
    contResults.appendChild(bHome);
}

function setLocalStorage(points) {
    const date = new Date();
    const day = date.toLocaleDateString();
    const hour = date.toLocaleTimeString();
    const day_hour = day + ' ' + hour;
    localStorage.setItem(JSON.stringify(day_hour), points);
}

function getLocalStorage() {
    const contStats = document.querySelector('#contStats');
    for (let i = 0; i < localStorage.length; i++) {
        const date = localStorage.key(i);
        const points = localStorage.getItem(date);
        const p = document.createElement('p');
        p.innerHTML = (`Date: ${date} - Points: ${points}`);
        p.className = 'ls';
        contStats.appendChild(p);
    }
}

function resetLocalStorage() {
    const buttonReset = document.querySelector('#buttonReset');
    buttonReset.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}

/*
function loginUser() {
    const wrapper = document.querySelector('#wrapper');
    const divLogin = document.createElement('div');
    divLogin.className = 'quiz';
    divLogin.id = 'divLogin';
    wrapper.appendChild(divLogin);

    const title = document.createElement('h2');
    title.innerHTML = 'Welcome to Summer Quiz';
    divLogin.appendChild(title);

    const description = document.createElement('h4');
    description.innerHTML = 'Please log in / sign up';
    description.className = 'description';
    divLogin.appendChild(description);

    const formulary = document.createElement('form');
    formulary.className = 'form';
    divLogin.appendChild(formulary);

    const labelName = document.createElement('label');
    labelName.innerHTML = 'Name:';
    formulary.appendChild(labelName);

    const inputName = document.createElement('input');
    inputName.id = 'inputName';
    formulary.appendChild(inputName);

    const labelMail = document.createElement('label');
    labelMail.innerHTML = 'E-Mail:';
    formulary.appendChild(labelMail);

    const inputMail = document.createElement('input');
    inputMail.id = 'inputMail';
    formulary.appendChild(inputMail);

    const labelPassword1 = document.createElement('label');
    labelPassword1.innerHTML = 'Password:'
    formulary.appendChild(labelPassword1);

    const inputPassword1 = document.createElement('input');
    inputPassword1.id = 'inputPassword1';
    formulary.appendChild(inputPassword1);

    const labelPassword2 = document.createElement('label');
    labelPassword2.innerHTML = 'Repeat password:'
    formulary.appendChild(labelPassword2);

    const inputPassword2 = document.createElement('input');
    inputPassword2.id = 'inputPassword2';
    formulary.appendChild(inputPassword2);

    const buttonLogin = document.createElement('button');
    buttonLogin.innerHTML = 'LOG IN';
    buttonLogin.className = 'buttonInit';
    buttonLogin.id = 'logIn';
    divLogin.appendChild(buttonLogin);

    buttonLogin.addEventListener('click', () => {

    })
    const buttonSignUp = document.createElement('button');
    buttonSignUp.innerHTML = 'SIGN UP';
    buttonSignUp.className = 'buttonInit';
    buttonSignUp.id = 'signUp';
    divLogin.appendChild(buttonSignUp);
}
*/