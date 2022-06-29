import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';

let arrayAPI = [];

window.addEventListener('load', () => {
    const app = initFirebase();
    getData(app);
    document.querySelector('#buttonLogin').addEventListener('click', e => loginUser(e, app));
    document.querySelector('#buttonRegAccount').addEventListener('click', e => signUpUser(e, app));
});

function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCBwXXt_91JIMUnPIdgOX3iJ07mpTTuGT8",
        authDomain: "summerquiz-624ab.firebaseapp.com",
        databaseURL: "https://summerquiz-624ab-default-rtdb.firebaseio.com",
        projectId: "summerquiz-624ab",
        storageBucket: "summerquiz-624ab.appspot.com",
        messagingSenderId: "568235516635",
        appId: "1:568235516635:web:4231e6980d744eee2f22fe"
    };
    return initializeApp(firebaseConfig);
}

function getData(app) {
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
}

function loginUser(e, app) {
    e.preventDefault();
    const auth = getAuth(app);
    const email = document.querySelector('#mail').value;
    const pass = document.querySelector('#password').value;

    signInWithEmailAndPassword(auth, email, pass)
        .then(response => {
            console.log('USER LOGUEADO CORRECTAMENTE', response);
            window.location.href = './index.html';
        })
        .catch(error => alert(error.code, error.message));
}

function signUpUser(e, app) {
    e.preventDefault();
    const form = document.querySelector('#formReg');
    const username = form.name.value;
    const email = form.mail.value;
    const pass = form.password1.value;
    const pass2 = form.password2.value;

    const auth = getAuth(app);

    if (pass !== '' && pass2 !== '' && pass === pass2) {
        createUserWithEmailAndPassword(auth, email, pass)
            .then(userCrentials => {
                userDate.uid = response.user.uid;
            })
            .catch(error => alert(error.code, error.message));
    } else alert('las contraseñas no coinciden');
}

export { arrayAPI }