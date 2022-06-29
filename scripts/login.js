window.addEventListener('load', loadPage);

function loadPage() {
    const divReg = document.querySelector('#divReg');
    divReg.style.display = 'None';

    document.querySelector('#buttonReg').addEventListener('click', () => {
        loadRegister();
    })
}

function loadRegister() {
    const divLog = document.querySelector('#divLog');
    divLog.style.display = 'None';

    const divReg = document.querySelector('#divReg');
    divReg.style.display = 'Flex';

    document.querySelector('#buttonRegAccount').addEventListener('click', () => {
        divReg.style.display = 'None';
        divLog.style.display = 'Flex';
    })
}