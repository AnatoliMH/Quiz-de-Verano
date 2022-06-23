window.addEventListener("load", loadPage);

function loadPage() {
    getLocalStorage();
    resetLocalStorage();
}

function getLocalStorage() {
    const contStats = document.querySelector('#contStats');
    if (localStorage.key(0) != 'firebase:host:summerquiz-624ab-default-rtdb.firebaseio.com') {
        for (let i = 0; i < localStorage.length; i++) {
            const date = localStorage.key(i);
            const points = localStorage.getItem(date);
            const p = document.createElement('p');
            p.innerHTML = (`Date: ${date} - Points: ${points}`);
            p.className = 'paragraph';
            contStats.appendChild(p);
        }
    }
}

function resetLocalStorage() {
    const buttonReset = document.querySelector('#buttonReset');
    buttonReset.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}

function getButtonId() {
    document.querySelector('#category11').addEventListener('click', () => { return '11' });
    document.querySelector('#category12').addEventListener('click', () => { return '12' });
    document.querySelector('#category15').addEventListener('click', () => { return '15' });
    document.querySelector('#category21').addEventListener('click', () => { return '21' });
    document.querySelector('#categoryFirebase').addEventListener('click', () => { return 'firebase' });
}
