function initReadingButton() {
    const readingButton = document.getElementById('reading-button');
    
    if (readingButton) {
        readingButton.addEventListener('click', () => {
            window.location.href = './text.html';
        });
    }
}

initReadingButton();