/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const markov = require('./markov');

function makeTextFromFile(filename) {
    try {
        const mm = new markov.MarkovMachine(fs.readFileSync(filename, 'utf8'));
        console.log(mm.makeText());
    } catch (error) {
        console.error(error);
    }
}

async function makeTextFromURL(url) {
    try {
        const response = await axios.get(url);
        const mm = new markov.MarkovMachine(response.data);
        console.log(await mm.makeText());
    } catch (error) {
        console.error(error);
    }
}

const filenameOrURL = process.argv[3];

if (process.argv[2] === 'url') {
    makeTextFromURL(filenameOrURL);
} else {
    makeTextFromFile(filenameOrURL);
}
