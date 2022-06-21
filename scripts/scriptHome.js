window.addEventListener("load", loadPage);

function loadPage() {
    getLocalStorage();
    resetLocalStorage();
    getButtonId();
}

function getLocalStorage() {
    const contStats = document.querySelector('#contStats');
    for (let i = 0; i < localStorage.length; i++) {
        const date = localStorage.key(i);
        const points = localStorage.getItem(date);
        const p = document.createElement('p');
        p.innerHTML = (`Date: ${date} - Points: ${points}`);
        p.className = 'paragraph';
        contStats.appendChild(p);
    };
}

function resetLocalStorage() {
    const buttonReset = document.querySelector('#buttonReset');
    buttonReset.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}

function getButtonId() {
    
}