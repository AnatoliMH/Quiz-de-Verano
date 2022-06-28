window.addEventListener('load', loadPage);

function loadPage() {
    const divRegister = document.querySelector('#divRegister');
    divRegister.style.display = 'None';

    document.querySelector('#login').addEventListener('click', () => {
        console.log("LogIn")
    });
    document.querySelector('#register').addEventListener('click', () => {
        loadRegister();
    });
}

function loadRegister() {
    const divLogin = document.querySelector('#divLogin');
    const divRegister = document.querySelector('#divRegister');

    divLogin.style.display = 'None'
    divRegister.style.display = 'flex';
}