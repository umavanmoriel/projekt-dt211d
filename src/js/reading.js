/**
 * Initierar och lägger till eventlyssnare på läsknappen
 * När användaren klickar på knappen navigeras de till text.html sidan
 * @returns {void}
 */
function initReadingButton() {
    const readingButton = document.getElementById('reading-button');
    
    if (readingButton) {
        readingButton.addEventListener('click', () => {
            window.location.href = './text.html';
        });
    }
}

initReadingButton();