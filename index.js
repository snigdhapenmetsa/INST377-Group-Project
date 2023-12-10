async function getDefinition() {
    let word = document.getElementById('wordInput').value;
    if(word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if(data && !data.title) { // Check if the response contains word data
            displayResult(data[0]);
        } else {
            document.getElementById('result').innerHTML = 'No definition found.';
        }
    } else {
        document.getElementById('result').innerHTML = 'Please enter a word.';
    }
}

function displayResult(data) {
    let htmlContent = `<h2>Results for "${data.word}":</h2>`;

    // Definitions
    htmlContent += '<h3>Definitions:</h3>';
    data.meanings.forEach(meaning => {
        meaning.definitions.forEach(def => {
            htmlContent += `<p><b>${meaning.partOfSpeech}:</b> ${def.definition}</p>`;
            if(def.example) {
                htmlContent += `<p><i>Example:</i> ${def.example}</p>`;
            }
        });
    });

    // Synonyms
    if(data.meanings[0].synonyms.length > 0) {
        htmlContent += '<h3>Synonyms:</h3>';
        htmlContent += `<p>${data.meanings[0].synonyms.join(', ')}</p>`;
    }

    // Pronunciation
    if(data.phonetics.length > 0 && data.phonetics[0].audio) {
        htmlContent += '<h3>Pronunciation:</h3>';
        htmlContent += `<audio controls><source src="${data.phonetics[0].audio}" type="audio/mpeg"></audio>`;
    }

    document.getElementById('result').innerHTML = htmlContent;
}
