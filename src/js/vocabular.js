/**
 * Initierar och lägger till eventlyssnare på knappen
 * När användaren klickar på knappen navigeras de till new-word.html sidan
 * @returns {void}
 */
function initBeginButton() {
    const beginButton = document.getElementById('begin-button');
    
    if (beginButton) {
        beginButton.addEventListener('click', () => {
            window.location.href = './new-word.html';
        });
    }
}

initBeginButton();