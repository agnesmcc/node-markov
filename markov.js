/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {}
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
  
      if (!this.chains[word]) {
        this.chains[word] = [];
      }
  
      this.chains[word].push(nextWord);
    }
  
    const lastWord = this.words[this.words.length - 1];
    if (!this.chains[lastWord]) {
      this.chains[lastWord] = [null];
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
  let text = [];

  const randomIndex = Math.floor(Math.random() * this.words.length);
  let currentWord = this.words[randomIndex];
  text.push(currentWord);

  while (text.length < numWords) {
    const nextWords = this.chains[currentWord];

    if (nextWords.length === 0) {
      break;
    }

    const randomIndex = Math.floor(Math.random() * nextWords.length);
    const nextWord = nextWords[randomIndex];

    if (nextWord === null) {
      break;
    }

    text.push(nextWord);
    currentWord = nextWord;
  }

  return text.join(' ');
}
}

module.exports = { MarkovMachine };
