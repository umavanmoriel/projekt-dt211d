function initBeginButton() {
    const beginButton = document.getElementById('begin-button');
    
    if (beginButton) {
        beginButton.addEventListener('click', () => {
            window.location.href = './new-word.html';
        });
    }
}

initBeginButton();