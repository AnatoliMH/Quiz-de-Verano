import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';

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

function loginUser(app) {
    const auth = getAuth(app);
    const email = document.getElementById('mail').value;
    const pass = document.getElementById('passwd').value;
    //funcion para loguearse
    signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
            //si login ha ido correctamente
            console.log('USER LOGUEADO CORRECTAMENTE')
        })
        .catch(error => alert(error.code, error.message));
}

// FUNCION CREAR USUARIO
function signUpUser(app) {
    const form = document.getElementById('signUp');
    const username = form.name.value;
    const email = form.mailSignUp.value;
    const pass = form.passwd1.value;
    const pass2 = form.passwd2.value;

    const auth = getAuth(app);

    if (pass !== '' && pass2 !== '' && pass === pass2) {
        createUserWithEmailAndPassword(auth, email, pass)
            .then(userCrentials => {
                //que hacer si el usuario se ha creado correctamente
            })
            .catch(error => alert(error.code, error.message));
    } else alert('las contraseñas no coinciden')
}

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