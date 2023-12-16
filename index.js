async function getDefinition() {
    let word = document.getElementById('wordInput').value;
    if (word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        var box = document.getElementById('result');
        box.style.display = 'block';
        if (data && !data.title) {
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

    // Origin
    if(data.origin) {
        htmlContent += `<p><b>Origin:</b> ${data.origin}</p>`;
    }

    // Meanings (Definitions, Examples, Part of Speech)
    data.meanings.forEach(meaning => {
        htmlContent += `<h3>${meaning.partOfSpeech}:</h3>`;
        meaning.definitions.forEach(def => {
            htmlContent += `<p><b>Definition:</b> ${def.definition}</p>`;
            if(def.example) {
                htmlContent += `<p><i>Example:</i> ${def.example}</p>`;
            }
            // Synonyms and Antonyms
            if(def.synonyms.length > 0) {
                htmlContent += `<p><b>Synonyms:</b> ${def.synonyms.join(', ')}</p>`;
            }
            if(def.antonyms.length > 0) {
                htmlContent += `<p><b>Antonyms:</b> ${def.antonyms.join(', ')}</p>`;
            }
        });
    });

    if(data.phonetics.length > 0 && data.phonetics[0].audio) {
        htmlContent += '<h3>Pronunciation:</h3>';
        htmlContent += `<audio controls><source src="${data.phonetics[0].audio}" type="audio/mpeg"></audio>`;
    }

    document.getElementById('result').innerHTML = htmlContent;
}
