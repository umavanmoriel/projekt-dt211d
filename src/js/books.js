// Kör funktionen när siddan laddas om
window.onload = init;


function init() {
    processBookData();
}

async function getBooksInfo() {
    try {
        // Begränsa antalet böcker för snabbare laddning
        const response = await fetch('https://gutendex.com/books/?languages=en&mime_type=text%2Fplain&page=1&page_size=10');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

async function processBookData() {
    const booksSectionEl = document.getElementById('books-section');
    if (booksSectionEl) {
        booksSectionEl.innerHTML = '<div class="loading-state"><div class="loading-spinner"></div><p class="loading-text">Hämtar bokrekommendationer...</p></div>';
    }
    
    try {
        const result = await getBooksInfo();
        console.log('Received data:', result);
        BookInfoDisplay(result);
    } catch (error) {
        console.error('Error processing data:', error);
        if (booksSectionEl) {
            booksSectionEl.innerHTML = '<p>Kunde inte ladda böcker. Försök igen senare.</p>';
        }
    }
}


function BookInfoDisplay(data) {
    const booksSectionEl = document.getElementById('books-section'); 

    // Hämta rätt array från API-svaret
    const booksArray = data.results; // data.results innehåller böckerna
    
    // Välj en slumpmässig bok från arrayen
    const randomBook = booksArray[Math.floor(Math.random() * booksArray.length)];
    const singleBookArray = [randomBook];


    // Loopa genom och skapa nya list element
    singleBookArray.forEach(async (book) => {

        // Rensa tidigare innehåll
        booksSectionEl.innerHTML = ''; 
    

        const bookHeadingEl = document.createElement('h1');
        const bookNameEl = document.createTextNode(book.title);
        bookHeadingEl.appendChild(bookNameEl);
        booksSectionEl.appendChild(bookHeadingEl); 

        const authorListEl = document.createElement('ul');
        book.authors.forEach((author) => {
            const authorListItemEl = document.createElement('li');
            const authorNameEl = document.createTextNode(author.name);
            authorListItemEl.appendChild(authorNameEl);
            authorListEl.appendChild(authorListItemEl);
        });
        booksSectionEl.appendChild(authorListEl);
        
        if (book.formats && book.formats['image/jpeg']) {
            const imgEl = document.createElement('img');
            imgEl.src = book.formats['image/jpeg'];
            imgEl.classList.add('book-image');
            imgEl.alt = book.title;
            imgEl.loading = 'lazy';
            booksSectionEl.appendChild(imgEl);
        }

        const bookContentEl = document.createElement('p');
        const bookParagraphEl = document.createTextNode(book.summaries);
        bookContentEl.appendChild(bookParagraphEl);
        booksSectionEl.appendChild(bookContentEl); 

    });
}