const URL = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple'

export const data = [
    {
        question: getQuestions(),
        choices: getAnswers(),
        answer: getQuestions()
    }
]

async function getQuestions() {
    let arrayQuestions = [];
    const response = await fetch(URL);
    const data = await response.json();
    data.results.forEach(e => {
        arrayQuestions.push(e.question + e.correct_answer);
    });
    return arrayQuestions;
}

async function getAnswers() {
    let arrayAnswers = [];
    const response = await fetch(URL);
    const data = await response.json();
    data.results.forEach(e => {
        arrayAnswers.push(e.incorrect_answers);
    });
    return arrayAnswers;
}
