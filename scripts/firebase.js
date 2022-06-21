import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

let arrayAPI = [];

const firebaseConfig = {
    apiKey: "AIzaSyCBwXXt_91JIMUnPIdgOX3iJ07mpTTuGT8",
    authDomain: "summerquiz-624ab.firebaseapp.com",
    databaseURL: "https://summerquiz-624ab-default-rtdb.firebaseio.com",
    projectId: "summerquiz-624ab",
    storageBucket: "summerquiz-624ab.appspot.com",
    messagingSenderId: "568235516635",
    appId: "1:568235516635:web:4231e6980d744eee2f22fe"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const refQuestions = ref(database, 'questions');
const refAnswers = ref(database, 'answers');
const refCorrectAnswers = ref(database, 'correctAnswers');

onValue(refQuestions, snapshot => {
    const data = snapshot.val();
    arrayAPI.push(data);
});

onValue(refAnswers, snapshot => {
    const data = snapshot.val();
    arrayAPI.push(data);
});

onValue(refCorrectAnswers, snapshot => {
    const data = snapshot.val();
    arrayAPI.push(data);
});

export { arrayAPI }