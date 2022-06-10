window.addEventListener("load", loadPage);

function loadPage() {
    getLocalStorage();
    resetLocalStorage();
}

function getLocalStorage() {
    const contStats = document.querySelector('#contStats');
    for (let i = 0; i < localStorage.length; i++) {
        const points = localStorage.key(i);
        const date = localStorage.getItem(points);
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