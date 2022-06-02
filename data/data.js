const URL = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple'

const arrayGame = [];
getQuestions();
console.log(arrayGame);

export const data = [
    {
        question: arrayGame[0],
        choices: arrayGame[1],
        answer: arrayGame[2]
    }
]

async function getQuestions() {
    let arrayQuestions = [];
    let arrayAnswers = [];
    let arrayCorrectAnswers = [];

    const response = await fetch(URL);
    const data = await response.json();

    data.results.forEach(e => {
        arrayQuestions.push(e.question);
        arrayAnswers.push(e.incorrect_answers);
        arrayCorrectAnswers.push(e.correct_answer);
    });
    arrayGame.push(arrayQuestions, arrayAnswers, arrayCorrectAnswers);
    return arrayGame;
}
