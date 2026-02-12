// Kör funktionen när siddan laddas om
window.onload = init;


function init() {
    processWordsData();
}

async function getWordsInfo() {
    try {

        const randomWords = ['lighthouse', 'galaxy', 'volcano', 'telescope', 'compass', 'waterfall', 'comet', 'eclipse', 'orchestra', 'manuscript', 'turbine', 'cathedral', 'monastery'];
        const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

async function processWordsData() {
    try {
        const result = await getWordsInfo();
        console.log('Received data:', result);
        WordsInfoDisplay(result);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}


function WordsInfoDisplay(data) {
    const wordsSectionEl = document.getElementById('words-container'); 
    // Rensa tidigare innehåll
    wordsSectionEl.innerHTML = ''; 

    const firstWordOnly = data.length ? [data[0]] : [];
    // Loopa genom och skapa nya list element
    firstWordOnly.forEach(async (word) => {
        const newSectionEl = document.createElement('section');
        //Lägger till class till element
        newSectionEl.className = 'word-container';

        const newWordEl = document.createElement('h1');
        const newWordTextEl = document.createTextNode(word.word);
        newWordEl.appendChild(newWordTextEl);
        newSectionEl.appendChild(newWordEl); 

        const wordPronunciationEl = document.createElement('h2');
        const wordPronunciationTextEl = document.createTextNode(word.phonetics[0].text);
        wordPronunciationEl.appendChild(wordPronunciationTextEl);
        newSectionEl.appendChild(wordPronunciationEl);
        
        //Bild från unsplash som matchar ord
        const wordName = word.word;
        const wordQueryName = wordName.split(" ")[1] || wordName;
        const key = 'hV8TwcwxRLCeMsnZTS3IqE42Qixd1durtF-HgOyHcrA';
        const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${wordQueryName}&client_id=${key}&per_page=1`);
        const imageData = await imageResponse.json();
        const imgEl = document.createElement('img');
        imgEl.src = imageData.results[0].urls.regular;
        imgEl.classList.add('new-word-img');
        imgEl.alt = wordName;
        newSectionEl.appendChild(imgEl);

        // Ord definition
        const wordMeanListEl = document.createElement('ul');
        word.meanings.forEach((meaning) => {
            const wordMeanListItemEl = document.createElement('li');
            const wordMeanListItemTextEl = document.createTextNode(meaning.definitions[0].definition);
            wordMeanListItemEl.appendChild(wordMeanListItemTextEl);
            wordMeanListEl.appendChild(wordMeanListItemEl);
        });
        newSectionEl.appendChild(wordMeanListEl);

        // Lägg till sektionen till container
        wordsSectionEl.appendChild(newSectionEl);

        console.log(imageData);

        const wordPlayerEl = document.getElementById('word-player');

    // Funktion för att hämta ordets ljud
    function wordPlayer() {
        // Rensa tidigare innehåll i spelare 
        wordPlayerEl.innerHTML = '';
        // Skapa variabel för att hämta live sändning för kanal med spesifikt id
        const url = `https://api.dictionaryapi.dev/media/pronunciations/en/${wordName}-us.mp3`;
        // Skapa nytt <audio> element
        let audioPlayerEl = document.createElement("audio");
        // Sätt källan till attribut srs i audio element
        audioPlayerEl.setAttribute("src", url);
        // Lägg till controlls som attribut i audio element för spela och pausa kontroller
        audioPlayerEl.setAttribute("controls", "");
        // Lägg till audio-elementet i DOM
        wordPlayerEl.appendChild(audioPlayerEl);
    }
    wordPlayer();
    });
}



// Knapp som laddar om sidan för att ladda ny ord
document.getElementById('new-word-button').addEventListener('click', function() {
    processWordsData();

});