// Kör funktionen när siddan laddas om
window.onload = init;


function init() {
    processTextData();
}

async function getTextInfo() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/umavanmoriel/api_test/main/texts.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

async function processTextData() {
    try {
        const result = await getTextInfo();
        console.log('Received data:', result);
        TextInfoDisplay(result);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}


function TextInfoDisplay(data) {
    const textSectionEl = document.getElementById('texts-container'); 


    // Välj en slumpmässig text från arrayen
    const randomText = data[Math.floor(Math.random() * data.length)];
    const singleTextArray = [randomText];
 
    // Loopa genom och skapa nya list element
    singleTextArray.forEach(async (text) => {

        // Rensa tidigare innehåll
        textSectionEl.innerHTML = ''; 
    

        const textHeadingEl = document.createElement('h1');
        const textNameEl = document.createTextNode(text.textnamn);
        textHeadingEl.appendChild(textNameEl);
        textSectionEl.appendChild(textHeadingEl); 

        const textParagraphEl = document.createElement('p');
        textParagraphEl.innerHTML = text.textinnehåll;
        textSectionEl.appendChild(textParagraphEl);
        
        // Skapa tabell
        const tableEl= document.getElementById("text-words-list");
        
        // Rensa tidigare innehåll i tabellen
        tableEl.innerHTML = '';
        
        const theadEl = document.createElement("thead");
        const headerRowEl = document.createElement("tr");
        headerRowEl.className = "word-list-header-row";
        
        const thEng = document.createElement("th");
        thEng.textContent = "Engelska";
        const thSwe = document.createElement("th");
        thSwe.textContent = "Svenska";
        const thUttal = document.createElement("th");
        thUttal.textContent = "Uttal";
        
        headerRowEl.appendChild(thEng);
        headerRowEl.appendChild(thSwe);
        headerRowEl.appendChild(thUttal);
        theadEl.appendChild(headerRowEl);
        tableEl.appendChild(theadEl);
        
        const tbodyEl = document.createElement("tbody");
        tbodyEl.id = "word-list-table";
    
        text.ordlista.forEach(async (ordlista) => {
            
            const newTableRowEl = document.createElement("tr");
            newTableRowEl.className = "word-list-row";

            const englishWordEl = document.createElement("td");
            const englishWordTextEl = document.createTextNode(ordlista.engelska);
            englishWordEl.appendChild(englishWordTextEl);
            newTableRowEl.appendChild(englishWordEl);

            const swedishWordEl = document.createElement("td");
            const swedishWordTextEl = document.createTextNode(ordlista.svenska);
            swedishWordEl.appendChild(swedishWordTextEl);
            newTableRowEl.appendChild(swedishWordEl);

            const pronunciationWordEl = document.createElement("td");
            const pronunciationWordTextEl = document.createTextNode(ordlista.uttal);
            pronunciationWordEl.appendChild(pronunciationWordTextEl);
            newTableRowEl.appendChild(pronunciationWordEl);

            tbodyEl.appendChild(newTableRowEl);
        });
        
        tableEl.appendChild(tbodyEl);

    });

}

document.getElementById('new-text-button').addEventListener('click', function() {
    processTextData();

});